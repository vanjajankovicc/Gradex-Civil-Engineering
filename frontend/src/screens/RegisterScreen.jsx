import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import { useRegistracijaMutation } from '../slices/usersApiSlice';

const ZANIMANJA = [
  { value: 'konstrukcije', label: 'Konstrukcije' },
  { value: 'visokogradnja', label: 'Visokogradnja' },
  { value: 'niskogradnja', label: 'Niskogradnja' },
  { value: 'hidrogradnja', label: 'Hidrogradnja' },
  { value: 'ostalo', label: 'Ostalo' },
];

const RegisterScreen = () => {
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zanimanje, setZanimanje] = useState('konstrukcije');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registracija, { isLoading }] = useRegistracijaMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    try {
      const data = await registracija({ ime, email, lozinka: password, zanimanje }).unwrap();
      dispatch(setCredentials({ ...data.korisnik, token: data.token }));
      navigate('/');
    } catch (err) {
      setError(err?.data?.poruka || 'Greška pri registraciji.');
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <Card className="p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Gradex Registracija</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={submitHandler} autoComplete="on">
              <Form.Group className="mb-3" controlId="ime">
                <Form.Label>Ime i prezime</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Unesite ime"
                  value={ime}
                  onChange={(e) => setIme(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="Unesite email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="zanimanje">
                <Form.Label>Zanimanje / specijalnost</Form.Label>
                <Form.Select value={zanimanje} onChange={(e) => setZanimanje(e.target.value)}>
                  {ZANIMANJA.map((z) => (
                    <option key={z.value} value={z.value}>{z.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  name="new-password"
                  autoComplete="new-password"
                  placeholder="Unesite lozinku (min. 6 karaktera)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label>Potvrdite lozinku</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm-password"
                  autoComplete="new-password"
                  placeholder="Ponovite lozinku"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 py-2" disabled={isLoading}>
                {isLoading ? 'Registracija...' : 'Registruj se'}
              </Button>
            </Form>
            <div className="text-center mt-3">
              Već imate nalog? <Link to="/login">Prijavite se</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
