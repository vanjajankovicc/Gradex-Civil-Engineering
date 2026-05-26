import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';



const mockProjects = [
  {
    _id: '1',
    name: 'Stambeni Kompleks "Novi Sad A"',
    location: 'Bulevar Evrope, Novi Sad',
    status: 'U toku',
    budget: '450,000 EUR',
    description: 'Izgradnja temelja i prve faze armirano-betonske konstrukcije.'
  },
  {
    _id: '2',
    name: 'Most na kanalu DTD',
    location: 'Ruma-Novi Sad',
    status: 'Priprema',
    budget: '1,200,000 EUR',
    description: 'Pripremni zemljani radovi i dopremanje mehanizacije na gradilište.'
  },
  {
    _id: '3',
    name: 'Poslovni Centar "Liman"',
    location: 'Narodnog fronta, Novi Sad',
    status: 'U toku',
    budget: '320,000 EUR',
    description: 'Kompletno unutrašnje opremanje, gipsarski radovi i ventilacija.'
  },
  {
    _id: '4',
    name: 'Rekonstrukcija puta Petrovaradin',
    location: 'Preradovićeva, Petrovaradin',
    status: 'Završeno',
    budget: '180,000 EUR',
    description: 'Asfaltiranje, postavljanje nove signalizacije i provera drenažnih kanala.'
  }
];

const HomeScreen = () => {
  // Funkcija za automatsko bojenje bedža na osnovu statusa
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'U toku': return 'success';
      case 'Priprema': return 'warning';
      case 'Završeno': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏗️ Aktuelni Građevinski Projekti</h2>
      <Row>
        {mockProjects.map((project) => (
          <Col key={project._id} sm={12} md={6} lg={6} className="mb-4">
            <Card className="shadow-sm h-100 border-start border-primary border-4">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="text-dark fw-bold mb-0">{project.name}</Card.Title>
                  <Badge bg={getBadgeVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                
                <Card.Subtitle className="mb-3 text-muted">📍 {project.location}</Card.Subtitle>
                
                <Card.Text style={{ flexGrow: 1 }}>{project.description}</Card.Text>
                
                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <span className="text-secondary fw-semibold">Budžet: {project.budget}</span>
                  <Button variant="outline-primary" size="sm">Otvori zadatke</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
