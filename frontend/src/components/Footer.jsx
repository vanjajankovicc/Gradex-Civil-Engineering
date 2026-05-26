import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light border-top mt-5">
      <Container>
        <Row>
          <Col className="text-center py-3 text-muted">
            Gradex &copy; {new Date().getFullYear()} — Sistem za upravljanje građevinskim projektima
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;