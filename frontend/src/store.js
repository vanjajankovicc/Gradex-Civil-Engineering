import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Ako je HeaderKalkulator u src/components folderu:
import HeaderKalkulator from './components/HeaderKalkulator';
const Header = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="engineering-navbar">
      <div className="nav-top-layer">
        <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">G</div>
          <div className="brand-texts">
            <h1 className="main-title">GRADEX</h1>
            <p className="sub-title">CIVIL ENGINEERING SYSTEM</p>
          </div>
        </div>

        <nav className="nav-links">
          <div 
            className="nav-item-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="nav-link-main">PROJEKTI ▼</span>
            {dropdownOpen && (
              <div className="engineering-dropdown">
                <Link to="/dinamika" className="drop-item">EVIDENCIJA RADOVA</Link>
                <Link to="/procentualna-procena" className="drop-item">PROCENA I STATISTIKA</Link>
                <Link to="/kalkulator" className="drop-item">MATERIJAL KALKULATOR</Link>
                <Link to="/tabele" className="drop-item">EXCEL TABELE UNOSA</Link>
              </div>
            )}
          </div>
          
          <Link to="/dokumentacija" className="nav-link-main">DOKUMENTACIJA</Link>

          {userInfo && userInfo.role === 'admin' && (
            <Link to="/admin" className="nav-link-main" style={{ color: '#ffcc00', fontWeight: 'bold' }}>
              ADMIN PANEL
            </Link>
          )}
        </nav>

        <div className="nav-auth">
          <button className="btn-kalkulator-trigger" onClick={() => setCalcOpen(true)}>
            KALKULATOR
          </button>

          {userInfo ? (
            <div className="user-section">
              <span className="user-welcome">
                {userInfo.role === 'admin' ? 'Admin' : 'Inženjer'}: {userInfo.name}
              </span>
              <button onClick={onLogout} className="btn-pro btn-odjava">ODJAVA</button>
            </div>
          ) : (
            <Link to="/login" className="btn-pro btn-prijava">PRIJAVA</Link>
          )}
        </div>
      </div>
      
      <div className="nav-bottom-line"></div>
      {calcOpen && <HeaderKalkulator onClose={() => setCalcOpen(false)} />}
    </header>
  );
};

export default Header;