import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcenaStatistika.css';

const ProcenaStatistika = () => {
  const navigate = useNavigate();

  // Inicijalni podaci o gradilištima
  const [projekti, setProjekti] = useState([
    { id: 1, name: 'Stambeni Kompleks "Novi Sad A"', procenat: 65, budzet: 450000, trosak: 292500, status: 'U roku' },
    { id: 2, name: 'Most na kanalu DTD', procenat: 12, budzet: 1200000, trosak: 380000, status: 'Kašnjenje' },
    { id: 3, name: 'Poslovni Centar "Liman"', procenat: 88, budzet: 320000, trosak: 281600, status: 'U roku' }
  ]);

  // Brzi proračuni za globalnu inženjersku statistiku
  const ukupniBudzet = projekti.reduce((acc, p) => acc + p.budzet, 0);
  const ukupniTrosak = projekti.reduce((acc, p) => acc + p.trosak, 0);
  const prosecanProgres = Math.round(projekti.reduce((acc, p) => acc + p.procenat, 0) / projekti.length);

  // Funkcija za brzo ažuriranje progresa direktno sa ekrana
  const promeniProgres = (id, novaVrednost) => {
    const vrednost = Math.min(100, Math.max(0, Number(novaVrednost) || 0));
    setProjekti(projekti.map(p => p.id === id ? { ...p, procenat: vrednost } : p));
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Zaglavlje ekrana */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #00bfa5', paddingBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ padding: '10px 18px', cursor: 'pointer', background: '#002b36', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', transition: '0.2s' }}>← NAZAD</button>
          <h2 style={{ margin: 0, color: '#002b36', letterSpacing: '0.5px' }}>PROCENTUALNA PROCENA REALIZACIJE</h2>
        </div>
        <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Inženjerski Dashboard v2.6</span>
      </div>

      {/* Traka sa sumarnim podacima */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#f4f6f8', padding: '20px', borderLeft: '5px solid #002b36', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#666', uppercase: 'true', fontWeight: 'bold' }}>PROSEČNA REALIZACIJA</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#002b36', marginTop: '5px' }}>{prosecanProgres}%</div>
        </div>
        <div style={{ background: '#f4f6f8', padding: '20px', borderLeft: '5px solid #00bfa5', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#666', uppercase: 'true', fontWeight: 'bold' }}>UKUPNO ALOCIRANI BUDŽET</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#00796b', marginTop: '5px' }}>{ukupniBudzet.toLocaleString()} EUR</div>
        </div>
        <div style={{ background: '#f4f6f8', padding: '20px', borderLeft: '5px solid #ff9800', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#666', uppercase: 'true', fontWeight: 'bold' }}>TOTALNI REALIZOVANI TROŠAK</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#e65100', marginTop: '5px' }}>{ukupniTrosak.toLocaleString()} EUR</div>
        </div>
      </div>

      {/* Lista gradilišta sa naprednim Progress Bar-ovima */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {projekti.map(proj => (
          <div key={proj.id} style={{ background: 'white', padding: '25px', border: '1px solid #d0d7de', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '19px', color: '#002b36', fontWeight: '700' }}>{proj.name}</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#555' }}>Brzo ažuriraj %:</span>
                <input 
                  type="number" 
                  value={proj.procenat} 
                  onChange={(e) => promeniProgres(proj.id, e.target.value)}
                  style={{ width: '60px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}
                />
                <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', background: proj.status === 'U roku' ? '#e8f5e9' : '#ffebee', color: proj.status === 'U roku' ? '#2e7d32' : '#c62828' }}>
                  {proj.status}
                </span>
              </div>
            </div>

            {/* Inženjerski progres bar */}
            <div style={{ background: '#e9ecef', height: '28px', borderRadius: '6px', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ width: `${proj.procenat}%`, background: 'linear-gradient(90deg, #00796b, #00bfa5)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                {proj.procenat > 7 && (
                  <span style={{ color: 'white', paddingRight: '12px', fontSize: '13px', fontWeight: '800' }}>{proj.procenat}%</span>
                )}
              </div>
              {proj.procenat <= 7 && (
                <span style={{ position: 'absolute', left: '10px', top: '4px', color: '#333', fontSize: '13px', fontWeight: '800' }}>{proj.procenat}%</span>
              )}
            </div>

            {/* Finansijski detalji po gradilištu */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '14px', color: '#555', background: '#fcfcfc', padding: '10px', borderRadius: '4px' }}>
              <div>Predviđen budžet: <strong style={{ color: '#111' }}>{proj.budzet.toLocaleString()} EUR</strong></div>
              <div>Trenutni troškovi: <strong style={{ color: '#c62828' }}>{proj.trosak.toLocaleString()} EUR</strong></div>
              <div>Preostalo: <strong style={{ color: '#2e7d32' }}>{(proj.budzet - proj.trosak).toLocaleString()} EUR</strong></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcenaStatistika;