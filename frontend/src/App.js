import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


const App = () => {
  return (
    <>
      {}
      <Header />
      
        {}
      <main className="py-3" style={{ minHeight: '80vh' }}>
        <Container>
          {/* Ovde React Router ubacuje trenutni ekran (HomeScreen, LoginScreen...) */}
          <Outlet />
        </Container>
      </main>
      
      {}
      <Footer />
      
      {}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;