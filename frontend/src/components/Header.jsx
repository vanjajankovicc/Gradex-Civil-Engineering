import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderKalkulator from './HeaderKalkulator';
import './Header.css';

const Header = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="engineering-navbar">
      <div className="nav-top-layer">

        {/* LOGO I BREND */}
        <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">G</div>
          <div className="brand-texts">
            <h1 className="main-title">GRADEX</h1>
            <p className="sub-title">CIVIL ENGINEERING SYSTEM</p>
          </div>
        </div>

        {/* NAVIGACIJA */}
        <nav className="nav-links">
          <div
            className="nav-item-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="nav-link-main">PROJEKTI ▼</span>
            {dropdownOpen && (
              <div className="engineering-dropdown">
                <Link to="/" className="drop-item">SVI PROJEKTI</Link>
                <Link to="/statistika" className="drop-item">STATISTIKA</Link>
                <Link to="/kalkulator" className="drop-item">MATERIJAL KALKULATOR</Link>
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

        {/* AUTENTIFIKACIJA I KALKULATOR */}
        <div className="nav-auth">
          <button
            className="btn-kalkulator-trigger"
            onClick={() => setCalcOpen(true)}
          >
            KALKULATOR
          </button>

          {userInfo ? (
            <div className="user-section">
              <span className="user-welcome">
                {userInfo.role === 'admin' ? 'Admin' : 'Inženjer'}: {userInfo.ime}
              </span>
              <button onClick={onLogout} className="btn-pro btn-odjava">ODJAVA</button>
            </div>
          ) : (
            <Link to="/login" className="btn-pro btn-prijava">PRIJAVA</Link>
          )}
        </div>
      </div>

      <div className="nav-bottom-line"></div>

      {/* MODAL ZA KALKULATOR */}
      {calcOpen && <HeaderKalkulator onClose={() => setCalcOpen(false)} />}
    </header>
  );
};

export default Header;
