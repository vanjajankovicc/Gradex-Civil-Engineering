import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useKreirajZadatakMutation } from '../slices/tasksApiSlice';

const NewTaskScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [greska, setGreska] = useState('');

  const [kreirajZadatak, { isLoading }] = useKreirajZadatakMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    setGreska('');
    try {
      await kreirajZadatak({
        projekatId: id,
        naziv: name,
        opis: description,
        procenjeniTrosak: Number(estimatedCost),
      }).unwrap();
      navigate(`/project/${id}`);
    } catch (err) {
      setGreska(err?.data?.poruka || 'Greška pri unosu zadatka.');
    }
  };

  return (
    <Card className="shadow-sm border-0 max-width-form mx-auto mt-4" style={{ maxWidth: '600px' }}>
      <Card.Body className="p-4">
        <h3 className="mb-4"> Unos novog građevinskog zadatka</h3>
        {greska && <div className="alert alert-danger">{greska}</div>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Naziv aktivnosti/radova</Form.Label>
            <Form.Control
              type="text"
              placeholder="npr. Izlivanje betonske ploče, Armiranje stubova..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDesc">
            <Form.Label>Opis aktivnosti i stanje na terenu</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Unesite detalje o utrošenom materijalu, mehanizaciji..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="taskCost">
            <Form.Label>Procenjeni trošak (RSD)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unesite troškove ove faze radova"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? 'Snimanje...' : 'Zavedi zadatak'}
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Nazad
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewTaskScreen;
