import React, { useState } from 'react';

// Ranije je ovaj ekran imao formu koja je "čuvala" podatke u localStorage
// (znači nestajali bi na drugom računaru/browseru) i mešala je stvarne
// pravne pojmove sa izmišljenim finansijskim i kontakt podacima.
// Sada je ovo čist referentni pregled vrsta projektne dokumentacije.

const VRSTE_DOKUMENTACIJE = [
  {
    id: 'idr',
    naslov: 'IDEJNO REŠENJE (IDR)',
    opis: 'Prikaz planirane koncepcije objekta, sa svim podacima neophodnim za utvrđivanje lokacijskih uslova.',
    detalji: 'Izrađuje se za potrebe pribavljanja lokacijskih uslova i kao deo urbanističkog projekta, uvek kada je u pitanju gradnja novog objekta. U papirnoj formi nije potrebno.',
  },
  {
    id: 'idp',
    naslov: 'IDEJNI PROJEKAT (IDP)',
    opis: 'Skup međusobno usaglašenih projekata kojima se određuju namena, položaj, oblik, kapacitet i izgled objekta.',
    detalji: 'Radi se za potrebe pribavljanja rešenja o odobrenju za izvođenje radova iz člana 145. Zakona (rekonstrukcija, adaptacija, sanacija, pomoćni objekti). U papirnoj formi je potreban.',
  },
  {
    id: 'pgd',
    naslov: 'PROJEKAT ZA GRAĐEVINSKU DOZVOLU (PGD)',
    opis: 'Definiše položaj i kapacitet objekta na lokaciji, izbor konstrukcijskog sistema, dimenzionisanje i materijale.',
    detalji: 'Obavezne oblasti: projekat arhitekture, projekat konstrukcije, hidrotehničke instalacije, elektroenergetske i mašinske instalacije, elaborati.',
  },
  {
    id: 'pzi',
    naslov: 'PROJEKAT ZA IZVOĐENJE (PZI)',
    opis: 'Razrađuju se detalji i tehnološka rešenja određena projektom za građevinsku dozvolu.',
    detalji: 'Obavezan je za građenje svih objekata osim za objekte kategorije "A".',
  },
  {
    id: 'pio',
    naslov: 'PROJEKAT IZVEDENOG OBJEKTA (PIO)',
    opis: 'Prikaz svih detalja izgrađenog objekta, radi dobijanja upotrebne dozvole.',
    detalji: 'Ako nije bilo odstupanja od PZI, originalni PZI se overava pečatom i potpisom i preuzima ulogu PIO projekta.',
  },
];

const DokumentacijaScreen = () => {
  const [otvoreno, setOtvoreno] = useState(null);

  const toggle = (id) => setOtvoreno(otvoreno === id ? null : id);

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ borderBottom: '3px solid #00bfa5', paddingBottom: '10px', marginBottom: '25px' }}>
        <h2 style={{ color: '#002b36', margin: 0, fontWeight: 700 }}>Vrste projektne dokumentacije</h2>
        <p style={{ color: '#555', margin: '8px 0 0' }}>
          Pregled faza projektovanja objekta, prema Zakonu o planiranju i izgradnji i postupku objedinjene procedure.
        </p>
      </div>

      {VRSTE_DOKUMENTACIJE.map((dok) => (
        <div key={dok.id} style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <div
            onClick={() => toggle(dok.id)}
            style={{
              padding: '15px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
            }}
          >
            <span>{dok.naslov}</span>
            <span>{otvoreno === dok.id ? '▲' : '▼'}</span>
          </div>
          {otvoreno === dok.id && (
            <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', lineHeight: 1.6 }}>
              <p>{dok.opis}</p>
              <p style={{ color: '#555' }}>{dok.detalji}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DokumentacijaScreen;
