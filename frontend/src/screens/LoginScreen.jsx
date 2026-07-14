import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import { usePrijavaMutation } from '../slices/usersApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prijava, { isLoading }] = usePrijavaMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await prijava({ email, lozinka: password }).unwrap();
      dispatch(setCredentials({ ...data.korisnik, token: data.token }));
      navigate('/');
    } catch (err) {
      setError(err?.data?.poruka || 'Server nije dostupan. Pokrenite backend.');
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <Card className="p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Gradex Prijava</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={submitHandler} autoComplete="on">
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
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Unesite lozinku"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 py-2" disabled={isLoading}>
                {isLoading ? 'Prijava...' : 'Prijavi se'}
              </Button>
            </Form>
            <div className="text-center mt-3">
              Nemate nalog? <Link to="/registracija">Registrujte se</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
