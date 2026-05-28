import React, { useState } from 'react';

const DokumentacijaScreen = () => {
  const [activeTab, setActiveTab] = useState('projekti');
  const [otvoreniDokument, setOtvoreniDokument] = useState(null);

  const toggleDokument = (id) => {
    if (otvoreniDokument === id) {
      setOtvoreniDokument(null);
    } else {
      setOtvoreniDokument(id);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Glavni Naslov */}
      <div style={{ borderBottom: '3px solid #00bfa5', paddingBottom: '10px', marginBottom: '30px' }}>
        <h2 style={{ color: '#002b36', margin: 0, fontWeight: '700', letterSpacing: '1px' }}>
          📂 CENTRALNA GRAĐEVINSKA DOKUMENTACIJA I PRAVILNICI
        </h2>
        <p style={{ color: '#555', margin: '5px 0 0 0' }}>Sistemski pregled zakonskih akata, faza projektovanja i internih inženjerskih podataka.</p>
      </div>

      {/* Veliki Inženjerski Folderi (Tabovi) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #ccc' }}>
        <button 
          onClick={() => { setActiveTab('projekti'); setOtvoreniDokument(null); }}
          style={{
            padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            backgroundColor: activeTab === 'projekti' ? '#002b36' : '#e0e0e0',
            color: activeTab === 'projekti' ? '#00bfa5' : '#333',
            border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s'
          }}>
          Vrste Projekata & CEOP
        </button>
        
        <button 
          onClick={() => { setActiveTab('finansije'); setOtvoreniDokument(null); }}
          style={{
            padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            backgroundColor: activeTab === 'finansije' ? '#002b36' : '#e0e0e0',
            color: activeTab === 'finansije' ? '#00bfa5' : '#333',
            border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s'
          }}>
           Plate, Prihodi & Rashodi
        </button>

        <button 
          onClick={() => { setActiveTab('kontakt'); setOtvoreniDokument(null); }}
          style={{
            padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            backgroundColor: activeTab === 'kontakt' ? '#002b36' : '#e0e0e0',
            color: activeTab === 'kontakt' ? '#00bfa5' : '#333',
            border: 'none', borderRadius: '5px 5px 0 0', transition: '0.3s'
          }}>
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
          
          {/* Dokument 1 */}
          <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div onClick={() => toggleDokument('idr')} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'between', fontWeight: '600' }}>
              <span>🔹 IDEJNO REŠENJE (IDR)</span>
              <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === 'idr' ? '▲ Zatvori' : '▼ Otvori'}</span>
            </div>
            {otvoreniDokument === 'idr' && (
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                <p>Idejno rešenje je prikaz planirane koncepcije objekta, sa prikazom i navođenjem svih podataka neophodnih za utvrđivanje lokacijskih uslova.</p>
                <p>Izrađuje se za potrebe pribavljanja lokacijskih uslova i kao deo urbanističkog projekta. Ovu vrstu projekata radimo uvek kada je u pitanju gradnja novog objekta. IDR u papirnoj formi nije potrebno.</p>
              </div>
            )}
          </div>

          {/* Dokument 2 */}
          <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div onClick={() => toggleDokument('idp')} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'between', fontWeight: '600' }}>
              <span>🔹 IDEJNI PROJEKAT (IDP)</span>
              <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === 'idp' ? '▲ Zatvori' : '▼ Otvori'}</span>
            </div>
            {otvoreniDokument === 'idp' && (
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                <p>Skup međusobno usaglašenih projekata kojima se određuju: namena, položaj, oblik, kapacitet, tehničko-tehnološke i funkcionalne karakteristike i izgled objekta.</p>
                <p>Radi se za potrebe pribavljanja rešenja o odobrenju za izvođenje radova iz <strong>člana 145. Zakona</strong> (rekonstrukcija, adaptacija, sanacija, pomoćni objekti kao što su garaže, septičke jame, bazeni, staje). U papirnoj formi je potreban.</p>
              </div>
            )}
          </div>

          {/* Dokument 3 */}
          <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div onClick={() => toggleDokument('pgd')} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'between', fontWeight: '600' }}>
              <span>🔹 PROJEKAT ZA GRAĐEVINSKU DOZVOLU (PGD)</span>
              <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === 'pgd' ? '▲ Zatvori' : '▼ Otvori'}</span>
            </div>
            {otvoreniDokument === 'pgd' && (
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                <p>Definiše položaj i kapacitet objekta na lokaciji, izbor konstrukcijskog sistema, dimenzionisanje i materijale.</p>
                <strong style={{ color: '#002b36' }}>Obavezne oblasti i sveske unutar PGD:</strong>
                <ul style={{ marginTop: '5px' }}>
                  <li>Projekat arhitekture (tehnički opis, predračun radova, pregled površina)</li>
                  <li>Projekat konstrukcije (statički proračun, pozicioni planovi, armature)</li>
                  <li>Hidrotehničke instalacije (vodovod i kanalizacija)</li>
                  <li>Elektroenergetske, telekomunikacione i mašinske instalacije</li>
                  <li>Elaborati (Zaštita od požara, Geomehanika, Energetska efikasnost)</li>
                </ul>
                <p><em>*Za objekte kategorije "A" (stambeni do 400 m²), PGD čine samo projekat arhitekture i elaborat energetske efikasnosti.</em></p>
              </div>
            )}
          </div>

          {/* Dokument 4 */}
          <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div onClick={() => toggleDokument('pzi')} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'between', fontWeight: '600' }}>
              <span>🔹 PROJEKAT ZA IZVOĐENJE (PZI)</span>
              <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === 'pzi' ? '▲ Zatvori' : '▼ Otvori'}</span>
            </div>
            {otvoreniDokument === 'pzi' && (
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                <p>Razrađuju se detalji i tehnološka rešenja koji su određeni projektom za građevinsku dozvolu. Obavezan je za građenje svih objekata osim za objekte kategorije "A".</p>
              </div>
            )}
          </div>

          {/* Dokument 5 */}
          <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div onClick={() => toggleDokument('pio')} style={{ padding: '15px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'between', fontWeight: '600' }}>
              <span>🔹 PROJEKAT IZVEDENOG OBJEKTA (PIO)</span>
              <span style={{ marginLeft: 'auto' }}>{otvoreniDokument === 'pio' ? '▲ Zatvori' : '▼ Otvori'}</span>
            </div>
            {otvoreniDokument === 'pio' && (
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: '1.6' }}>
                <p>Predstavlja prikaz svih detalja izgrađenog objekta radi dobijanja upotrebne dozvole. Ako nije bilo odstupanja od PZI, originalni PZI se overava pečatom i potpisom i preuzima ulogu PIO projekta.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SADRŽAJ FOLDERA 2: FINANSIJE I PLATE */}
      {activeTab === 'finansije' && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#002b36', borderBottom: '2px solid #00bfa5', paddingBottom: '5px' }}>📊 Interna Finansijska Evidencija</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', borderTop: '4px solid #28a745' }}>
              <h5 style={{ color: '#28a745' }}>Plate i Isplate Radnicima</h5>
              <p>Mesečni obračun zarada na gradilištima, dnevnice, prekovremeni rad i terenski dodaci za građevinsku operativu.</p>
              <ul>
                <li>Isplate inženjerima (fiksni deo + bonusi po projektu)</li>
                <li>Isplate majstorima i podizvođačima (po učinku / m²)</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', borderTop: '4px solid #dc3545' }}>
              <h5 style={{ color: '#dc3545' }}>Prihodi i Rashodi Preduzeća</h5>
              <p>Evidencija uplata investitora po fazama situacija (avansne, privremene i okončane situacije).</p>
              <ul>
                <li>Rashodi za građevinski materijal (beton, čelik, opeka)</li>
                <li>Troškovi mehanizacije i podizvođačkih faza</li>
              </ul>
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
            <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '5px', borderLeft: '4px solid #002b36', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <strong> Projektovanje objekata i energetska efikasnost</strong>
              <div style={{ color: '#555', marginTop: '5px' }}>Kontakt mob: +381 (0)64 249 44 88</div>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '5px', borderLeft: '4px solid #002b36', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <strong> Dizajn enterijera i 3D modelovanje</strong>
              <div style={{ color: '#555', marginTop: '5px' }}>Kontakt mob: +381 (0)64 366 33 63</div>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '5px', borderLeft: '4px solid #002b36', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <strong>Sudska veštačenja i procene vrednosti</strong>
              <div style={{ color: '#555', marginTop: '5px' }}>Kontakt mob: +381 (0)64 131 02 44</div>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '5px', borderLeft: '4px solid #002b36', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <strong> Sanacije objekata i procena stanja</strong>
              <div style={{ color: '#555', marginTop: '5px' }}>Kontakt mob: +381 (0)60 603 54 47</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DokumentacijaScreen;