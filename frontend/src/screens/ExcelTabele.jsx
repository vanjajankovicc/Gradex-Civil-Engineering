import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExcelTabele.css';

const ExcelTabele = () => {
  const navigate = useNavigate();

  // Držanje stanja tabele (Građevinski dnevnik otpada)
  const [redovi, setRedovi] = useState([
    { id: 1, datum: '27.05.2026.', dobavljac: 'Karin Komerc', materijal: 'Pesak 0-4mm', kolicina: '24', jedinica: 'm³', kontrolisao: 'Inž. V. Nikolić' },
    { id: 2, datum: '27.05.2026.', dobavljac: 'Lafarge BFC', materijal: 'Cement Portland', kolicina: '15', jedinica: 't', kontrolisao: 'Inž. V. Nikolić' }
  ]);

  // Stanje za novi unos
  const [noviMaterijal, setNoviMaterijal] = useState({ datum: '27.05.2026.', dobavljac: '', materijal: '', kolicina: '', jedinica: 'm³', kontrolisao: 'Inž. V. Nikolić' });

  // Dodavanje novog reda u inženjersku tabelu
  const dodajRed = (e) => {
    e.preventDefault();
    if(noviMaterijal.dobavljac && noviMaterijal.materijal && noviMaterijal.kolicina) {
      setRedovi([...redovi, { ...noviMaterijal, id: Date.now() }]);
      setNoviMaterijal({ datum: '27.05.2026.', dobavljac: '', materijal: '', kolicina: '', jedinica: 'm³', kontrolisao: 'Inž. V. Nikolić' });
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #00bfa5', paddingBottom: '15px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 18px', cursor: 'pointer', background: '#002b36', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>← NAZAD</button>
        <h2 style={{ margin: 0, color: '#002b36' }}> GRAĐEVINSKI DNEVNIK I TABLICE UNOSA</h2>
      </div>

      {/* Forma za brzi unos iznad tabele */}
      <div style={{ background: '#f8f9fa', border: '1px solid #d0d7de', padding: '20px', borderRadius: '6px', marginBottom: '25px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#002b36' }}> Evidentiraj novu otpremnicu na gradilištu</h4>
        <form onSubmit={dodajRed} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}>Dobavljač</span>
            <input type="text" required value={noviMaterijal.dobavljac} onChange={e => setNoviMaterijal({...noviMaterijal, dobavljac: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '4px' }} placeholder="npr. Karin Komerc" />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}>Materijal</span>
            <input type="text" required value={noviMaterijal.materijal} onChange={e => setNoviMaterijal({...noviMaterijal, materijal: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '4px' }} placeholder="npr. Šljunak" />
          </div>
          <div style={{ width: '100px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}>Količina</span>
            <input type="number" required value={noviMaterijal.kolicina} onChange={e => setNoviMaterijal({...noviMaterijal, kolicina: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '4px' }} placeholder="0" />
          </div>
          <div style={{ width: '90px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}>Jedinica</span>
            <select value={noviMaterijal.jedinica} onChange={e => setNoviMaterijal({...noviMaterijal, jedinica: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '4px', background: 'white' }}>
              <option value="m³">m³</option>
              <option value="t">t</option>
              <option value="kom">kom</option>
            </select>
          </div>
          <button type="submit" style={{ background: '#00bfa5', color: '#002b36', border: 'none', padding: '9px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Zavedi u dnevnik</button>
        </form>
      </div>

      {/* Čista Excel Tabela */}
      <div style={{ background: 'white', border: '1px solid #d0d7de', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.01)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#002b36', color: 'white' }}>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>DATUM</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>DOBAVLJAČ</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>VRSTA MATERIJALA</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>KOLIČINA</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>JEDINICA MERE</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #002b36' }}>KONTROLISAO INŽENJER</th>
            </tr>
          </thead>
          <tbody>
            {redovi.map((red, index) => (
              <tr key={red.id} style={{ background: index % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #eef1f4' }}>
                <td style={{ padding: '12px 15px', color: '#666', fontWeight: '600' }}>{red.datum}</td>
                <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#111' }}>{red.dobavljac}</td>
                <td style={{ padding: '12px 15px', color: '#00796b', fontWeight: '600' }}>{red.materijal}</td>
                <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{red.kolicina}</td>
                <td style={{ padding: '12px 15px' }}><span style={{ background: '#e0f2f1', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#004d40' }}>{red.jedinica}</span></td>
                <td style={{ padding: '12px 15px', color: '#555', fontStyle: 'italic' }}>{red.kontrolisao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ExcelTabele;