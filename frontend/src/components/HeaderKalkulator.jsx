import React, { useState, useEffect, useRef } from 'react';

const HeaderKalkulator = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Stanja za pomeranje (Drag & Drop)
  const [pozicija, setPozicija] = useState({ x: window.innerWidth - 300, y: 100 });
  const [daLiSePomera, setDaLiSePomera] = useState(false);
  const [relativniKlik, setRelativniKlik] = useState({ x: 0, y: 0 });

  const handleKlik = (vrednost) => {
    setInput((prev) => prev + vrednost);
  };

  const obrisiSve = () => {
    setInput('');
    setResult('');
  };

  const izracunaj = () => {
    try {
      const konacno = new Function(`return ${input}`)();
      setResult(konacno.toString());
    } catch (error) {
      setResult('Greška');
    }
  };

  // Logika za pomeranje mišem
  const zapocniPomeranje = (e) => {
    setDaLiSePomera(true);
    setRelativniKlik({
      x: e.clientX - pozicija.x,
      y: e.clientY - pozicija.y
    });
  };

  useEffect(() => {
    const tokomPomeranja = (e) => {
      if (!daLiSePomera) return;
      setPozicija({
        x: e.clientX - relativniKlik.x,
        y: e.clientY - relativniKlik.y
      });
    };

    const zavrsiPomeranje = () => {
      setDaLiSePomera(false);
    };

    if (daLiSePomera) {
      window.addEventListener('mousemove', tokomPomeranja);
      window.addEventListener('mouseup', zavrsiPomeranje);
    }

    return () => {
      window.removeEventListener('mousemove', tokomPomeranja);
      window.removeEventListener('mouseup', zavrsiPomeranje);
    };
  }, [daLiSePomera, relativniKlik]);

  return (
    <div style={{
      position: 'fixed', 
      top: `${pozicija.y}px`, 
      left: `${pozicija.x}px`, 
      zIndex: 1000,
      backgroundColor: '#002b36', 
      border: '2px solid #00bfa5', 
      borderRadius: '8px',
      padding: '15px', 
      width: '260px', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      fontFamily: 'monospace',
      userSelect: 'none' // Sprečava selektovanje teksta dok pomeraš prozor
    }}>
      
      {/* Gornja traka - SADA SLUŽI ZA HVATANJE I POMERANJE */}
      <div 
        onMouseDown={zapocniPomeranje}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '10px', 
          color: '#fff',
          cursor: 'move', // Menja kursor u krstić za pomeranje
          paddingBottom: '5px',
          borderBottom: '1px solid #004d40'
        }}
      >
        <span style={{ fontWeight: 'bold', color: '#00bfa5', fontSize: '12px' }}>
          📐 GRADEX DIGITRON ☰
        </span>
        {/* OnMousedown={e => e.stopPropagation()} sprečava da se gašenje protumači kao pomeranje */}
        <button 
          onClick={onClose} 
          onMouseDown={(e) => e.stopPropagation()} 
          style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          X
        </button>
      </div>

      {/* Ekran */}
      <div style={{
        backgroundColor: '#fff', padding: '10px', borderRadius: '4px',
        textAlign: 'right', minHeight: '40px', marginBottom: '15px',
        wordBreak: 'break-all'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>{input || '0'}</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#002b36', marginTop: '5px' }}>{result ? `= ${result}` : ''}</div>
      </div>

      {/* Tasteri */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        <button onClick={obrisiSve} style={btnStil('#ff4444', '#fff')}>C</button>
        <button onClick={() => handleKlik('/')} style={btnStil('#00bfa5', '#002b36')}>/</button>
        <button onClick={() => handleKlik('*')} style={btnStil('#00bfa5', '#002b36')}>*</button>
        <button onClick={() => handleKlik('-')} style={btnStil('#00bfa5', '#002b36')}>-</button>

        <button onClick={() => handleKlik('7')} style={btnBroj()}>7</button>
        <button onClick={() => handleKlik('8')} style={btnBroj()}>8</button>
        <button onClick={() => handleKlik('9')} style={btnBroj()}>9</button>
        <button onClick={() => handleKlik('+')} style={btnStil('#00bfa5', '#002b36')}>+</button>

        <button onClick={() => handleKlik('4')} style={btnBroj()}>4</button>
        <button onClick={() => handleKlik('5')} style={btnBroj()}>5</button>
        <button onClick={() => handleKlik('6')} style={btnBroj()}>6</button>
        <button onClick={izracunaj} style={{ ...btnStil('#00bfa5', '#002b36'), gridRow: 'span 2', height: '100%' }}>=</button>

        <button onClick={() => handleKlik('1')} style={btnBroj()}>1</button>
        <button onClick={() => handleKlik('2')} style={btnBroj()}>2</button>
        <button onClick={() => handleKlik('3')} style={btnBroj()}>3</button>

        <button onClick={() => handleKlik('0')} style={{ ...btnBroj(), gridColumn: 'span 2' }}>0</button>
        <button onClick={() => handleKlik('.')} style={btnBroj()}>.</button>
      </div>
    </div>
  );
};

const btnStil = (bg, boja) => ({
  backgroundColor: bg, color: boja, border: 'none', padding: '12px',
  fontSize: '16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer'
});

const btnBroj = () => ({
  backgroundColor: '#f4f4f4', color: '#002b36', border: 'none', padding: '12px',
  fontSize: '16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer'
});

export default HeaderKalkulator;