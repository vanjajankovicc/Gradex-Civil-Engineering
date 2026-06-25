import React, { useState, useEffect } from 'react';

const DokumentacijaScreen = () => {
  const [activeTab, setActiveTab] = useState('projekti');
  const [otvoreniDokument, setOtvoreniDokument] = useState(null);
  const [prikaziFormu, setPrikaziFormu] = useState(false);

  // --- STANJA ZA UNOS (FORMA) ---
  const [noviNaziv, setNoviNaziv] = useState('');
  const [noviOpis, setNoviOpis] = useState('');
  const [dodatniOpis, setDodatniOpis] = useState(''); // Za projekte i podstavke
  const [tipFinansija, setTipFinansija] = useState('prihod'); // NOVO: 'prihod' ili 'rashod'

  // --- POČETNI PODACI (Ako je localStorage prazan) ---
  const pocetniProjekti = [
    { id: 'idr', naslov: '🔹 IDEJNO REŠENJE (IDR)', opis: 'Idejno rešenje je prikaz planirane koncepcije objekta, sa prikazom i navođenjem svih podataka neophodnih za utvrđivanje lokacijskih uslova.', detalji: 'Izrađuje se za potrebe pribavljanja lokacijskih uslova i kao deo urbanističkog projekta. Ovu vrstu projekata radimo uvek kada je u pitanju gradnja novog objekta. IDR u papirnoj formi nije potrebno.' },
    { id: 'idp', naslov: '🔹 IDEJNI PROJEKAT (IDP)', opis: 'Skup međusobno usaglašenih projekata kojima se određuju: namena, položaj, oblik, kapacitet, tehničko-tehnološke i funkcionalne karakteristike i izgled objekta.', detalji: 'Radi se za potrebe pribavljanja rešenja o odobrenju za izvođenje radova iz člana 145. Zakona (rekonstrukcija, adaptacija, sanacija, pomoćni objekti kao što su garaže, septičke jame, bazeni, staje). U papirnoj formi je potreban.' },
    { id: 'pgd', naslov: '🔹 PROJEKAT ZA GRAĐEVINSKU DOZVOLU (PGD)', opis: 'Definiše položaj i kapacitet objekta na lokaciji, izbor konstrukcijskog sistema, dimenzionisanje i materijale.', detalji: 'Obavezne oblasti: Projekat arhitekture, Projekat konstrukcije, Hidrotehničke instalacije, Elektroenergetske i mašinske instalacije, Elaborati.' },
    { id: 'pzi', naslov: '🔹 PROJEKAT ZA IZVOĐENJE (PZI)', opis: 'Razrađuju se detalji i tehnološka rešenja koji su određeni projektom za građevinsku dozvolu.', detalji: 'Obavezan je za građenje svih objekata osim za objekte kategorije "A".' },
    { id: 'pio', naslov: '🔹 PROJEKAT IZVEDENOG OBJEKTA (PIO)', opis: 'Predstavlja prikaz svih detalja izgrađenog objekta radi dobijanja upotrebne dozvole.', detalji: 'Ako nije bilo odstupanja od PZI, originalni PZI se overava pečatom i potpisom i preuzima ulogu PIO projekta.' }
  ];

  const pocetneFinansije = [
    { id: 'f1', naslov: 'Plate i Isplate Radnicima', opis: 'Mesečni obračun zarada na gradilištima, dnevnice, prekovremeni rad i terenski dodaci za građevinsku operativu.', tip: 'prihod', stavke: ['Isplate inženjerima (fiksni deo + bonusi po projektu)', 'Isplate majstorima i podizvođačima (po učinku / m²)'] },
    { id: 'f2', naslov: 'Prihodi i Rashodi Preduzeća', opis: 'Evidencija uplata investitora po fazama situacija (avansne, privremene i okončane situacije).', tip: 'rashod', stavke: ['Rashodi za građevinski materijal (beton, čelik, opeka)', 'Troškovi mehanizacije i podizvođačkih faza'] }
  ];

  const pocetniSektori = [
    { id: 's1', naslov: 'Projektovanje objekata i energetska efikasnost', kontakt: '+381 (0)64 249 44 88' },
    { id: 's2', naslov: 'Dizajn enterijera i 3D modelovanje', kontakt: '+381 (0)64 366 33 63' },
    { id: 's3', naslov: 'Sudska veštačenja i procene vrednosti', kontakt: '+381 (0)64 131 02 44' },
    { id: 's4', naslov: 'Sanacije objekata i procena stanja', kontakt: '+381 (0)60 603 54 47' }
  ];

  // --- UČITAVANJE IZ LOCALSTORAGE ---
  const [projekti, setProjekti] = useState(() => JSON.parse(localStorage.getItem('g_projekti')) || pocetniProjekti);
  const [finansije, setFinansije] = useState(() => JSON.parse(localStorage.getItem('g_finansije')) || pocetneFinansije);
  const [sektori, setSektori] = useState(() => JSON.parse(localStorage.getItem('g_sektori')) || pocetniSektori);

  // --- SINKRONIZACIJA SA MEMORIJOM ---
  useEffect(() => { localStorage.setItem('g_projekti', JSON.stringify(projekti)); }, [projekti]);
  useEffect(() => { localStorage.setItem('g_finansije', JSON.stringify(finansije)); }, [finansije]);
  useEffect(() => { localStorage.setItem('g_sektori', JSON.stringify(sektori)); }, [sektori]);

  const toggleDokument = (id) => {
    setOtvoreniDokument(otvoreniDokument === id ? null : id);
  };

  // --- FUNKCIJA ZA STVARNO DODAVANJE ---
  const handleDodajNovuStavku = (e) => {
    e.preventDefault();
    if (!noviNaziv.trim() || !noviOpis.trim()) return alert('Molimo popunite osnovna polja.');

    const jedinstveniId = 'custom_' + Date.now();

    if (activeTab === 'projekti') {
      const noviObjekat = { id: jedinstveniId, naslov: `🔹 ${noviNaziv.toUpperCase()}`, opis: noviOpis, detalji: dodatniOpis || 'Nema dodatnih detalja.' };
      setProjekti([...projekti, noviObjekat]);
    } 
    else if (activeTab === 'finansije') {
      const noviObjekat = { 
        id: jedinstveniId, 
        naslov: noviNaziv, 
        opis: noviOpis, 
        tip: tipFinansija, // NOVO: Ovde se pamti da li je prihod ili rashod
        stavke: dodatniOpis ? dodatniOpis.split(',').map(s => s.trim()) : [] 
      };
      setFinansije([...finansije, noviObjekat]);
    } 
    else if (activeTab === 'kontakt') {
      const noviObjekat = { id: jedinstveniId, naslov: noviNaziv, kontakt: noviOpis };
      setSektori([...sektori, noviObjekat]);
    }

    // Resetovanje formi i zatvaranje panela
    setNoviNaziv('');
    setNoviOpis('');
    setDodatniOpis('');
    setTipFinansija('prihod');
    setPrikaziFormu(false);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Glavni Naslov i dugme za dodavanje */}
      <div style={{ borderBottom: '3px solid #00bfa5', paddingBottom: '10px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#002b36', margin: 0, fontWeight: '700', letterSpacing: '1px' }}>
            📂 CENTRALNA GRAĐEVINSKA DOKUMENTACIJA I PRAVILNICI
          </h2>
          <p style={{ color: '#555', margin: '5px 0 0 0' }}>Sistemski pregled zakonskih akata, faza projektovanja i internih inženjerskih podataka.</p>
        </div>
        
        <button 
          onClick={() => setPrikaziFormu(!prikaziFormu)}
          style={{
            backgroundColor: prikaziFormu ? '#dc3545' : '#00bfa5', color: '#fff',
            border: 'none', padding: '12px 20px', borderRadius: '5px', fontSize: '15px',
            fontWeight: '600', cursor: 'pointer', transition: '0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
          {prikaziFormu ? 'Zatvori formu' : ' Dodaj u ovaj folder'}
        </button>
      </div>

      {/* --- DINAMIČKA FORMA ZA DODAVANJE --- */}
      {prikaziFormu && (
        <form onSubmit={handleDodajNovuStavku} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #00bfa5', marginBottom: '30px' }}>
          <h3 style={{ color: '#002b36', marginTop: 0 }}>
            Dodaj stavku u sekciju: <span style={{ color: '#00bfa5' }}>{activeTab.toUpperCase()}</span>
          </h3>
          
          {/* NOVO: SELECT POLJE ZA SELEKCIJU PRIHOD / RASHOD (Prikazuje se samo na tabu Finansije) */}
          {activeTab === 'finansije' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>Tip finansijske stavke:</label>
              <select 
                value={tipFinansija} 
                onChange={(e) => setTipFinansija(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px', fontWeight: '600' }}
              >
                <option value="prihod">📈 Prihod / Plate (Zelena kartica)</option>
                <option value="rashod">📉 Rashod / Troškovi mehanizacije (Crvena kartica)</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
              {activeTab === 'kontakt' ? 'Naziv sektora / Funkcija:' : 'Naziv stavke / Dokumenta:'}
            </label>
            <input type="text" value={noviNaziv} onChange={(e) => setNoviNaziv(e.target.value)} placeholder="Unesite naziv..." style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
              {activeTab === 'kontakt' ? 'Kontakt telefon / Detalji:' : 'Kratak opis / Definicija:'}
            </label>
            <textarea value={noviOpis} onChange={(e) => setNoviOpis(e.target.value)} placeholder="Unesite primarne informacije..." rows="3" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
          </div>

          {activeTab !== 'kontakt' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                {activeTab === 'projekti' ? 'Dodatni detalji i napomene (kad se otvori):' : 'Ključne podstavke (odvojite zarezom):'}
              </label>
              <textarea value={dodatniOpis} onChange={(e) => setDodatniOpis(e.target.value)} placeholder={activeTab === 'projekti' ? "Zakonske osnove, papirni oblik..." : "Stavka 1, Stavka 2, Stavka 3"} rows="3" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
            </div>
          )}

          <button type="submit" style={{ backgroundColor: '#002b36', color: '#00bfa5', border: 'none', padding: '10px 25px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
             Sačuvaj i unesi podatke
          </button>
        </form>
      )}

      {/* Veliki Inženjerski Folderi (Tabovi) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #ccc' }}>
        <button onClick={() => { setActiveTab('projekti'); setOtvoreniDokument(null); }} style={{ padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', backgroundColor: activeTab === 'projekti' ? '#002b36' : '#e0e0e0', color: activeTab === 'projekti' ? '#00bfa5' : '#333', border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s' }}>
          Vrste Projekata & CEOP
        </button>
        <button onClick={() => { setActiveTab('finansije'); setOtvoreniDokument(null); }} style={{ padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', backgroundColor: activeTab === 'finansije' ? '#002b36' : '#e0e0e0', color: activeTab === 'finansije' ? '#00bfa5' : '#333', border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s' }}>
           Plate, Prihodi & Rashodi
        </button>
        <button onClick={() => { setActiveTab('kontakt'); setOtvoreniDokument(null); }} style={{ padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', backgroundColor: activeTab === 'kontakt' ? '#002b36' : '#e0e0e0', color: activeTab === 'kontakt' ? '#00bfa5' : '#333', border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s' }}>
           Sektori & Kontakt Podaci
        </button>
      </div>

      {/* SADRŽAJ FOLDERA 1: VRSTE PROJEKATA */}
      {activeTab === 'projekti' && (
        <div>
          <div style={{ backgroundColor: '#f0f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px', borderLeft: '5px solid #00bfa5' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#333' }}>
              Prema važećem <strong>PRAVILNIKU O POSTUPKU SPROVOĐENJA OBJEDINJENE PROCEDURE</strong> i komunikacije sa CEOP-om (Centralna evidencija objedinjenih procedura pri APR-u), sve vrste projekata se obavezno rade u elektronskoj formi, a za potrebe investitora i u papirnoj formi. Skice klijenata su nam dragocene kao prvi korak ka definisanju idejnog rešenja.
            </p>
          </div>

          <h4 style={{ color: '#002b36', marginBottom: '15px' }}>Izaberite dokument za pregled detalja:</h4>
          
          {projekti.map((dok) => (
            <div key={dok.id} style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <div onClick={() => toggleDokument(dok.id)} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                <span>{dok.naslov}</span>
                <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === dok.id ? '▲ Zatvori' : '▼ Otvori'}</span>
              </div>
              {otvoreniDokument === dok.id && (
                <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                  <p>{dok.opis}</p>
                  <p style={{ whiteSpace: 'pre-line' }}>{dok.detalji}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SADRŽAJ FOLDERA 2: FINANSIJE (Unapređeno sa razvrstavanjem) */}
      {activeTab === 'finansije' && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#002b36', borderBottom: '2px solid #00bfa5', paddingBottom: '5px' }}>📊 Interna Finansijska Evidencija</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            
            {/* LEVA KOLONA: SVI PRIHODI */}
            <div>
              <h4 style={{ color: '#28a745', textAlign: 'center', marginBottom: '15px' }}>📈 PRIHODI / ISPLATE</h4>
              {finansije.filter(f => f.tip === 'prihod').map((fin) => (
                <div key={fin.id} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', borderTop: '4px solid #28a745', marginBottom: '15px' }}>
                  <h5 style={{ color: '#28a745', margin: '0 0 10px 0', fontSize: '16px' }}>{fin.naslov}</h5>
                  <p style={{ fontSize: '14px', color: '#444' }}>{fin.opis}</p>
                  {fin.stavke && fin.stavke.length > 0 && (
                    <ul style={{ marginTop: '5px', paddingLeft: '20px', fontSize: '13px' }}>
                      {fin.stavke.map((stavka, i) => <li key={i}>{stavka}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* DESNA KOLONA: SVI RASHODI */}
            <div>
              <h4 style={{ color: '#dc3545', textAlign: 'center', marginBottom: '15px' }}>📉 RASHODI / TROŠKOVI</h4>
              {finansije.filter(f => f.tip === 'rashod').map((fin) => (
                <div key={fin.id} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', borderTop: '4px solid #dc3545', marginBottom: '15px' }}>
                  <h5 style={{ color: '#dc3545', margin: '0 0 10px 0', fontSize: '16px' }}>{fin.naslov}</h5>
                  <p style={{ fontSize: '14px', color: '#444' }}>{fin.opis}</p>
                  {fin.stavke && fin.stavke.length > 0 && (
                    <ul style={{ marginTop: '5px', paddingLeft: '20px', fontSize: '13px' }}>
                      {fin.stavke.map((stavka, i) => <li key={i}>{stavka}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* SADRŽAJ FOLDERA 3: KONTAKT I SEKTORI */}
      {activeTab === 'kontakt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', border: '1px solid #ddd' }}>
            <h3 style={{ color: '#002b36', margin: '0 0 10px 0' }}>🏢 LIMIS d.o.o. Ruma</h3>
            <p style={{ margin: '5px 0' }}><strong>Adresa:</strong> Veljka Dugoševića 89, 22400 Ruma, Srbija</p>
            <p style={{ margin: '5px 0' }}><strong>Telefon:</strong> +381 22 210 13 22 | <strong>Email:</strong> office@limis.rs</p>
            <p style={{ margin: '5px 0' }}><strong>PIB:</strong> 104326503 | <strong>Matični broj:</strong> 20145447</p>
          </div>

          <h3 style={{ color: '#002b36', margin: '10px 0 0 0' }}> Unutrašnji Sektori i Rukovodioci</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {sektori.map((sek) => (
              <div key={sek.id} style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '5px', borderLeft: '4px solid #002b36', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <strong>{sek.naslov}</strong>
                <div style={{ color: '#555', marginTop: '5px' }}>Kontakt mob: {sek.kontakt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DokumentacijaScreen;