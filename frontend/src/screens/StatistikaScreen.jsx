import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProjektiQuery } from '../slices/projectsApiSlice';
import { useGetIsplateQuery } from '../slices/isplataApiSlice';
import { useGetAdminStatistikaQuery } from '../slices/adminApiSlice';
import './StatistikaScreen.css';

// Statistika se sada računa iz stvarnih podataka (projekti, isplate),
// a ne iz izmišljenih brojeva kao ranije.

const KarticaBroj = ({ naslov, vrednost, boja }) => (
  <div className="stat-kartica" style={{ borderLeftColor: boja }}>
    <span className="stat-naslov">{naslov}</span>
    <div className="stat-vrednost" style={{ color: boja }}>{vrednost}</div>
  </div>
);

const StatistikaScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const jeAdmin = userInfo?.role === 'admin';

  // --- Admin: globalna statistika direktno sa servera ---
  const {
    data: globalnaStat,
    isLoading: ucitavanjeGlobalne,
    error: greskaGlobalna,
  } = useGetAdminStatistikaQuery(undefined, { skip: !jeAdmin });

  // --- Svi korisnici (i admin i inženjer): njihovi projekti i isplate ---
  const { data: projekti, isLoading: ucitavanjeProjekata, error: greskaProjekti } = useGetProjektiQuery();
  const { data: isplate, isLoading: ucitavanjeIsplata } = useGetIsplateQuery();

  if (!userInfo) {
    return (
      <div className="statistika-wrap">
        <p>Morate biti prijavljeni da biste videli statistiku.</p>
        <button className="btn-nazad" onClick={() => navigate('/login')}>Idi na prijavu</button>
      </div>
    );
  }

  if (ucitavanjeProjekata || ucitavanjeIsplata || (jeAdmin && ucitavanjeGlobalne)) {
    return <div className="statistika-wrap">Učitavanje statistike...</div>;
  }

  if (greskaProjekti) {
    return <div className="statistika-wrap">Greška pri učitavanju podataka.</div>;
  }

  // Za svaki projekat izračunaj koliko je stvarno isplaćeno (status = ZAVRSENO)
  const projektiSaPotrosnjom = (projekti || []).map((p) => {
    const isplateZaProjekat = (isplate || []).filter(
      (i) => i.projekat?._id === p._id && i.status === 'ZAVRSENO'
    );
    const potroseno = isplateZaProjekat.reduce((zbir, i) => zbir + i.iznos, 0);
    const procenatPotrosnje = p.budzet > 0 ? Math.min(100, Math.round((potroseno / p.budzet) * 100)) : 0;
    return { ...p, potroseno, procenatPotrosnje };
  });

  const ukupanBudzet = projektiSaPotrosnjom.reduce((z, p) => z + p.budzet, 0);
  const brojZavrsenih = projektiSaPotrosnjom.filter((p) => p.status === 'Završeno').length;
  const brojUToku = projektiSaPotrosnjom.filter((p) => p.status === 'U toku').length;

  return (
    <div className="statistika-wrap">
      <div className="statistika-header">
        <button className="btn-nazad" onClick={() => navigate(-1)}>← Nazad</button>
        <h2>Statistika {jeAdmin ? '— svi projekti' : '— moji projekti'}</h2>
      </div>

      {jeAdmin && globalnaStat && !greskaGlobalna && (
        <>
          <h4 className="sekcija-naslov">Pregled cele platforme</h4>
          <div className="stat-grid">
            <KarticaBroj naslov="Broj korisnika" vrednost={globalnaStat.brojKorisnika} boja="#002b36" />
            <KarticaBroj naslov="Broj projekata" vrednost={globalnaStat.brojProjekata} boja="#00796b" />
            <KarticaBroj naslov="Završenih isplata" vrednost={globalnaStat.brojZavrsenihIsplata} boja="#ff9800" />
            <KarticaBroj
              naslov="Ukupno isplaćeno"
              vrednost={`${globalnaStat.ukupnoIsplaceno.toLocaleString()} EUR`}
              boja="#2e7d32"
            />
          </div>
        </>
      )}

      <h4 className="sekcija-naslov">{jeAdmin ? 'Svi projekti' : 'Moji projekti'}</h4>
      <div className="stat-grid">
        <KarticaBroj naslov="Broj projekata" vrednost={projektiSaPotrosnjom.length} boja="#002b36" />
        <KarticaBroj naslov="U toku" vrednost={brojUToku} boja="#ff9800" />
        <KarticaBroj naslov="Završeno" vrednost={brojZavrsenih} boja="#2e7d32" />
        <KarticaBroj naslov="Ukupan budžet" vrednost={`${ukupanBudzet.toLocaleString()} EUR`} boja="#00796b" />
      </div>

      {projektiSaPotrosnjom.length === 0 ? (
        <p className="prazno-stanje">
          Nema projekata za prikaz. <span onClick={() => navigate('/')} className="link">Napravite prvi projekat</span>.
        </p>
      ) : (
        <div className="projekat-lista">
          {projektiSaPotrosnjom.map((p) => (
            <div key={p._id} className="projekat-red" onClick={() => navigate(`/project/${p._id}`)}>
              <div className="projekat-red-vrh">
                <h3>{p.naziv}</h3>
                <span className={`status-oznaka status-${p.status.replace(' ', '-')}`}>{p.status}</span>
              </div>
              <div className="progres-traka">
                <div className="progres-ispuna" style={{ width: `${p.procenatPotrosnje}%` }} />
              </div>
              <div className="projekat-red-dno">
                <span>{p.potroseno.toLocaleString()} / {p.budzet.toLocaleString()} {p.valuta} potrošeno</span>
                <span>{p.procenatPotrosnje}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatistikaScreen;
