import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#002b36',
      color: '#00bfa5',
      textAlign: 'center',
      padding: '15px 0',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '1px',
      borderTop: '2px solid #00bfa5',
      marginTop: 'auto' /* Gura footer na dno ekrana */
    }}>
      © 2026 GRADEX CIVIL ENGINEERING SYSTEM | Sva prava zadržana.
    </footer>
  );
};

export default Footer;