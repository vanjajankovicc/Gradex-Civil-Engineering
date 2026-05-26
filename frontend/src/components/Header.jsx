import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stanje koje kontroliše da li je prozorčić (Modal) otvoren ili zatvoren
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Otvori prozorčić kada korisnik klikne na crveno dugme Odjava
  const handleShow = () => setShowLogoutModal(true);
  
  // Zatvori prozorčić ako korisnik odustane
  const handleClose = () => setShowLogoutModal(false);

  // Ako korisnik potvrdi da želi da se odjavi
  const logoutHandler = () => {
    handleClose(); // Zatvaramo prozor
    dispatch(logout()); // Čistimo stanje u Reduxu
    navigate('/login'); // Vraćamo ga na login
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>🏗️ Gradex</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Projekti</Nav.Link>
              </LinkContainer>
            </Nav>
            
            <Nav className="ms-auto align-items-center">
              {userInfo && (
                <span className="text-light me-3" style={{ fontSize: '0.9rem' }}>
                  👤 {userInfo.name}
                </span>
              )}

              <LinkContainer to="/login" className="me-2">
                <Nav.Link>Prijava</Nav.Link>
              </LinkContainer>

              {/* Klik na ovo dugme sada samo otvara prozorčić, ne odjavljuje odmah */}
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={handleShow}
                style={{ borderRadius: '5px' }}
              >
                Odjava
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Tvoj mali prozorčić (Modal) za potvrdu odjave */}
      <Modal show={showLogoutModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Odjava sa sistema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Da li ste sigurni da želite da se odjavite sa Gradex sistema?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Odustani
          </Button>
          <Button variant="danger" onClick={logoutHandler}>
            Da, odjavi me
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;