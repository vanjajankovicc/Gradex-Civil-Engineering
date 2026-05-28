import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  
  const projekti = [
    { 
      id: 1, 
      naziv: 'STAMBENI KOMPLEKS "NOVI SAD A"', 
      budzet: '450.000 EUR', 
      status: 'U toku', 
      opis: 'Izgradnja temelja i prve faze armirano-betonske konstrukcije.' 
    },
    { 
      id: 2, 
      naziv: 'MOST NA KANALU DTD', 
      budzet: '1.200.000 EUR', 
      status: 'Priprema', 
      opis: 'Pripremni zemljani radovi i dopremanje mehanizacije na gradilište.' 
    },
    { 
      id: 3, 
      naziv: 'POSLOVNI CENTAR "LIMAN"', 
      budzet: '320.000 EUR', 
      status: 'U toku', 
      opis: 'Radovi na fasadi, izolaciji i unutrašnjim instalacijama.' 
    }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', borderBottom: '2px solid #00bfa5', paddingBottom: '10px' }}>AKTUELNI PROJEKTI</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projekti.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '25px', border: '1px solid #ddd', borderRadius: '8px',
            backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {/* LEVI DEO: Naslov, Status i Opis */}
            <div style={{ flex: 1, marginRight: '20px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#002b36', fontSize: '18px' }}>{p.naziv}</h5>
              <span style={{ 
                fontSize: '11px', background: '#e0e0e0', padding: '3px 8px', 
                borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' 
              }}>
                {p.status}
              </span>
              <p style={{ margin: '0', color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                {p.opis}
              </p>
            </div>

            {/* DESNI DEO: Budžet i dugme */}
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 10px 0', fontSize: '16px' }}>{p.budzet}</p>
              <button 
                onClick={() => navigate(`/dokumentacija`)} 
                style={{ 
                  padding: '10px 20px', backgroundColor: '#002b36', color: '#fff', 
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' 
                }}
              >
                OTVORI DETALJE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;