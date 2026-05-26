import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    
    // FORMAT PRIJAVE: Simuliramo podatke koje bismo inače dobili iz MongoDB baze
    const mockUserData = {
      _id: 'iz-baze-123',
      name: 'Vanja (Inženjer)',
      email: email,
      isAdmin: true,
    };

    // Upisujemo korisnika u Redux stanje i LocalStorage da ga aplikacija zapamti
    dispatch(setCredentials({ ...mockUserData }));
    
    // Vodimo korisnika na početnu stranicu jer je sada uspešno ulogovan!
    navigate('/');
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <Card className="p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Gradex Prijava</h2>
            <Form onSubmit={submitHandler}>
              
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Unesite email (npr. vanja@gradex.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite lozinku"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 py-2" style={{ borderRadius: '8px' }}>
                Prijavi se
              </Button>
              
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;