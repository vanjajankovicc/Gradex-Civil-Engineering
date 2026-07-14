import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KalkulatorMaterijala.css';


const KalkulatorMaterijala = () => {
  const navigate = useNavigate();
  
  // Proračun betona
  const [dimenzije, setDimenzije] = useState({ duzina: '', sirina: '', debljina: '' });
  const [rezultatBetona, setRezultatBetona] = useState(null);

  // Proračun armature
  const [armatura, setArmatura] = useState({ povrsina: '', gustina: '85' }); // 85kg po m3 je prosek
  const [rezultatArmature, setRezultatArmature] = useState(null);

  const izracunajBeton = (e) => {
    e.preventDefault();
    const { duzina, sirina, debljina } = dimenzije;
    if (duzina && sirina && debljina) {
      const kubika = parseFloat(duzina) * parseFloat(sirina) * parseFloat(debljina);
      const kamioni = Math.ceil(kubika / 9); // Prosečan mikser vozi 9 kubika betona
      setRezultatBetona({
        kubici: kubika.toFixed(2),
        kamiona: kamioni
      });
    }
  };

  const izracunajArmaturu = (e) => {
    e.preventDefault();
    if (armatura.povrsina) {
      const ukupnoKg = parseFloat(armatura.povrsina) * parseFloat(armatura.gustina);
      setRezultatArmature({
        kg: ukupnoKg.toFixed(0),
        tona: (ukupnoKg / 1000).toFixed(2)
      });
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #00bfa5', paddingBottom: '15px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 18px', cursor: 'pointer', background: '#002b36', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>← NAZAD</button>
        <h2 style={{ margin: 0, color: '#002b36' }}>INŽENJERSKI PRORAČUN MATERIJALA</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
        
        {/* PANEL: BETON */}
        <div style={{ background: 'white', border: '1px solid #d0d7de', borderRadius: '6px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#002b36', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🧱 Proračun Zapremine Betona</h3>
          <form onSubmit={izracunajBeton} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#555' }}>Dužina oplate (m)</label>
              <input type="number" step="0.01" required value={dimenzije.duzina} onChange={e => setDimenzije({...dimenzije, duzina: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="npr. 12.5" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#555' }}>Širina oplate (m)</label>
              <input type="number" step="0.01" required value={dimenzije.sirina} onChange={e => setDimenzije({...dimenzije, sirina: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="npr. 8.0" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#555' }}>Debljina / Visina sloja (m)</label>
              <input type="number" step="0.01" required value={dimenzije.debljina} onChange={e => setDimenzije({...dimenzije, debljina: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="npr. 0.20" />
            </div>
            <button type="submit" style={{ background: '#002b36', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Izračunaj Kubikažu</button>
          </form>

          {rezultatBetona && (
            <div style={{ marginTop: '20px', background: '#e0f2f1', borderLeft: '5px solid #00bfa5', padding: '15px', borderRadius: '4px' }}>
              <div style={{ fontSize: '15px', color: '#004d40' }}>Potrebna kubikaža: <strong style={{ fontSize: '18px' }}>{rezultatBetona.kubici} m³</strong></div>
              <div style={{ fontSize: '13px', color: '#00796b', marginTop: '5px' }}>Okvirni broj miksera (9m³ kapacitet): <strong>{rezultatBetona.kamiona} kamiona</strong></div>
            </div>
          )}
        </div>

        {/* PANEL: ARMATURA */}
        <div style={{ background: 'white', border: '1px solid #d0d7de', borderRadius: '6px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#002b36', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🏗️ Procena Armaturnog Čelika</h3>
          <form onSubmit={izracunajArmaturu} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#555' }}>Površina armaturnog polja (m²)</label>
              <input type="number" step="0.1" required value={armatura.povrsina} onChange={e => setArmatura({...armatura, povrsina: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="npr. 100" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#555' }}>Procenjena gustina gvožđa (kg/m²)</label>
              <select value={armatura.gustina} onChange={e => setArmatura({...armatura, gustina: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
                <option value="35">Laka armaturna mreža (35 kg/m²)</option>
                <option value="85">Standardna međuspratna ploča (85 kg/m²)</option>
                <option value="130">Teška konstrukcija / Temelji (130 kg/m²)</option>
              </select>
            </div>
            <button type="submit" style={{ background: '#00bfa5', color: '#002b36', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '43px' }}>Izračunaj Težinu Čelika</button>
          </form>

          {rezultatArmature && (
            <div style={{ marginTop: '20px', background: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '15px', borderRadius: '4px' }}>
              <div style={{ fontSize: '15px', color: '#e65100' }}>Ukupna težina armature: <strong style={{ fontSize: '18px' }}>{rezultatArmature.kg} kg</strong></div>
              <div style={{ fontSize: '13px', color: '#f57c00', marginTop: '5px' }}>Izraženo u tonama: <strong>{rezultatArmature.tona} t</strong> građevinske armature.</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default KalkulatorMaterijala;