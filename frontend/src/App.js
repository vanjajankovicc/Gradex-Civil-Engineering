import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // 1. Pravimo stanje (state) za korisnika. Na početku je "Lazar" ulogovan.
  const [user, setUser] = useState("Lazar"); 

  // 2. Funkcija za odjavu koja pita za potvrdu
  const handleLogout = () => {
    const provera = window.confirm("Da li ste sigurni da želite da se odjavite sa GradEx sistema?");
    
    if (provera) {
      // Postavljamo user na null (prazno), što automatski menja izgled u Header-u
      setUser(null); 
      alert("Uspješno ste se odjavili.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 3. Prosleđujemo trenutno stanje korisnika (user) u Header */}
      <Header username={user} onLogout={handleLogout} />
      
      <main style={{ flex: '1', backgroundColor: '#fcfcfc', paddingBottom: '40px' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;