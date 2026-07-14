import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const provera = window.confirm("Da li ste sigurni da želite da se odjavite?");
    if (provera) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onLogout={handleLogout} />
      <main style={{ flex: '1', backgroundColor: '#fcfcfc', paddingBottom: '40px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;