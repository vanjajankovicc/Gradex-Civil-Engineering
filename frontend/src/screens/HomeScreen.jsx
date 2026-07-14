import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import { useGetProjektiQuery, useKreirajProjekatMutation } from '../slices/projectsApiSlice';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: projekti, isLoading, error, refetch } = useGetProjektiQuery();
  const [kreirajProjekat, { isLoading: kreiranje }] = useKreirajProjekatMutation();

  const [prikaziModal, setPrikaziModal] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [budzet, setBudzet] = useState('');

  const dodajProjekat = async (e) => {
    e.preventDefault();
    try {
      await kreirajProjekat({ naziv, opis, budzet: Number(budzet) }).unwrap();
      setPrikaziModal(false);
      setNaziv('');
      setOpis('');
      setBudzet('');
      refetch();
    } catch (err) {
      alert(err?.data?.poruka || 'Greška pri kreiranju projekta.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #00bfa5', paddingBottom: '10px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>AKTUELNI PROJEKTI</h2>
        {userInfo && (
          <Button variant="dark" onClick={() => setPrikaziModal(true)}>+ Novi projekat</Button>
        )}
      </div>

      {isLoading && <p>Učitavanje projekata...</p>}
      {error && (
        <div className="alert alert-warning">
          Ne mogu da učitam projekte sa servera ({error?.data?.poruka || error?.error || 'server nedostupan'}).
          {!userInfo && ' Prijavite se da biste videli i kreirali projekte.'}
        </div>
      )}

      {!isLoading && !error && (!projekti || projekti.length === 0) && (
        <p>Trenutno nema unetih projekata. {userInfo ? 'Kliknite na "Novi projekat" da dodate prvi.' : 'Prijavite se da biste dodali projekat.'}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projekti?.map((p) => (
          <div key={p._id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '25px', border: '1px solid #ddd', borderRadius: '8px',
            backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#002b36', fontSize: '18px' }}>{p.naziv}</h5>
              <span style={{
                fontSize: '11px', background: '#e0e0e0', padding: '3px 8px',
                borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px'
              }}>
                {p.status}
              </span>
              <p style={{ margin: '0', color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                {p.opis}
              </p>
            </div>

            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 10px 0', fontSize: '16px' }}>
                {Number(p.budzet).toLocaleString('sr-RS')} {p.valuta}
              </p>
              <button
                onClick={() => navigate(`/project/${p._id}`)}
                style={{
                  padding: '10px 20px', backgroundColor: '#002b36', color: '#fff',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                }}
              >
                OTVORI DETALJE
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={prikaziModal} onHide={() => setPrikaziModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Novi projekat</Modal.Title>
        </Modal.Header>
        <Form onSubmit={dodajProjekat}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Naziv projekta</Form.Label>
              <Form.Control value={naziv} onChange={(e) => setNaziv(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Opis</Form.Label>
              <Form.Control as="textarea" rows={3} value={opis} onChange={(e) => setOpis(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budžet (EUR)</Form.Label>
              <Form.Control type="number" value={budzet} onChange={(e) => setBudzet(e.target.value)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setPrikaziModal(false)}>Otkaži</Button>
            <Button variant="primary" type="submit" disabled={kreiranje}>Sačuvaj</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default HomeScreen;
