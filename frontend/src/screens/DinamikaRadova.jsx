import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DinamikaRadova.css';

const DinamikaRadova = () => {
  const navigate = useNavigate();
  
  // State za kalkulator
  const [duzina, setDuzina] = useState('');
  const [sirina, setSirina] = useState('');
  const [debljina, setDebljina] = useState('');
  const [rezultat, setRezultat] = useState(null);

  const izracunajBeton = () => {
    if(duzina && sirina && debljina) {
      const kubikaza = parseFloat(duzina) * parseFloat(sirina) * parseFloat(debljina);
      setRezultat(kubikaza.toFixed(2));
    }
  };

  return (
    <div className="engineering-screen">
      
      {/* GORNJI DEO SA DUGMETOM NAZAD */}
      <div className="screen-control-header">
        <button onClick={() => navigate(-1)} className="btn-back-nav">← NAZAD NA PROJEKTE</button>
        <h2 className="screen-title-text"> TEHNIČKA DINAMIKA RADOVA & UNOS</h2>
      </div>

      {/* EXCEL TABELA FORMIRANJA ROKOVA */}
      <div className="panel-box">
        <h3 className="panel-title">OPERATIVNI GRAFIK RADOVA (TABELARNI UNOS)</h3>
        <div className="table-wrapper">
          <table className="excel-grid">
            <thead>
              <tr>
                <th>KOD FAZE</th>
                <th>NAZIV ZADATKA / POZICIJE</th>
                <th>PLANIRANI POČETAK</th>
                <th>KRAJ RADNIH OPERACIJA</th>
                <th>ANGAŽOVANI RESURSI</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.01</strong></td>
                <td>Glavni mašinski iskop i odvoz zemlje</td>
                <td><input type="date" defaultValue="2026-06-01" className="excel-input-date" /></td>
                <td><input type="date" defaultValue="2026-06-10" className="excel-input-date" /></td>
                <td>Bager guseničar, 3 kamiona</td>
                <td><span className="badge-status s-done">ZAVRŠENO</span></td>
              </tr>
              <tr>
                <td><strong>1.02</strong></td>
                <td>Postavljanje armaturne mreže temelja</td>
                <td><input type="date" defaultValue="2026-06-11" className="excel-input-date" /></td>
                <td><input type="date" defaultValue="2026-06-18" className="excel-input-date" /></td>
                <td>Armirači (Tim B), dizalica</td>
                <td><span className="badge-status s-progress">U TOKU</span></td>
              </tr>
              <tr>
                <td><strong>1.03</strong></td>
                <td>Izlivanje betona klase C25/30</td>
                <td><input type="date" defaultValue="2026-06-19" className="excel-input-date" /></td>
                <td><input type="date" defaultValue="2026-06-22" className="excel-input-date" /></td>
                <td>3 miksera, pumpa za beton</td>
                <td><span className="badge-status s-pending">ČEKANJE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INŽENJERSKI KALKULATOR MATERIJALA */}
      <div className="panel-box calc-box">
        <h3 className="panel-title"> KALKULATOR MATERIJALA: PRORAČUN KUBIKAŽE BETONA</h3>
        <p className="calc-desc">Unesite dimenzije oplate u metrima da biste dobili tačnu potrebnu količinu u kubnim metrima ($m^3$).</p>
        
        <div className="calculator-form">
          <div className="input-group-calc">
            <label>Dužina (m)</label>
            <input type="number" value={duzina} onChange={(e) => setDuzina(e.target.value)} placeholder="npr. 12.5" />
          </div>
          <div className="input-group-calc">
            <label>Širina (m)</label>
            <input type="number" value={sirina} onChange={(e) => setSirina(e.target.value)} placeholder="npr. 6.0" />
          </div>
          <div className="input-group-calc">
            <label>Debljina / Visina (m)</label>
            <input type="number" value={debljina} onChange={(e) => setDebljina(e.target.value)} placeholder="npr. 0.20" />
          </div>
          <button onClick={izracunajBeton} className="btn-execute-calc">IZRAČUNAJ POTREBNU ZAPREMINU</button>
        </div>

        {rezultat !== null && (
          <div className="calc-result-display">
            Potrebna količina betona: <strong>{rezultat} $m^3$</strong>
          </div>
        )}
      </div>

    </div>
  );
};

export default DinamikaRadova;