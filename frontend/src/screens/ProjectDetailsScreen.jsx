import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Badge, ListGroup } from 'react-bootstrap';
import { useGetProjekatQuery } from '../slices/projectsApiSlice';
import { useGetZadaciQuery, useObrisiZadatakMutation } from '../slices/tasksApiSlice';
import PayPalButton from '../components/PayPalButton';

const ProjectDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: projekat, isLoading, error } = useGetProjekatQuery(id);
  const { data: zadaci, isLoading: ucitavanjeZadataka, refetch: refetchZadaci } = useGetZadaciQuery(id);
  const [obrisiZadatak] = useObrisiZadatakMutation();

  const [prikaziPlacanje, setPrikaziPlacanje] = useState(false);
  const [iznosZaUplatu, setIznosZaUplatu] = useState('');

  const ukloniZadatak = async (zadatakId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj zadatak?')) {
      await obrisiZadatak(zadatakId);
      refetchZadaci();
    }
  };

  if (isLoading) return <p className="p-4">Učitavanje projekta...</p>;
  if (error) return <div className="alert alert-danger m-4">Projekat nije pronađen.</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <Button variant="link" className="ps-0 mb-3" onClick={() => navigate('/')}>← Nazad na projekte</Button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ color: '#002b36' }}>{projekat.naziv}</h2>
          <Badge bg="secondary" className="mb-3">{projekat.status}</Badge>
          <p style={{ color: '#666', maxWidth: '600px' }}>{projekat.opis}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h4>{Number(projekat.budzet).toLocaleString('sr-RS')} {projekat.valuta}</h4>
          <small className="text-muted">Vlasnik: {projekat.vlasnik?.ime}</small>
        </div>
      </div>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Zadaci / faze radova</h4>
        {userInfo && (
          <Link to={`/project/${id}/new-task`}>
            <Button variant="dark">+ Novi zadatak</Button>
          </Link>
        )}
      </div>

      {ucitavanjeZadataka && <p>Učitavanje zadataka...</p>}
      {!ucitavanjeZadataka && (!zadaci || zadaci.length === 0) && (
        <p className="text-muted">Nema unetih zadataka za ovaj projekat.</p>
      )}

      <ListGroup className="mb-4">
        {zadaci?.map((z) => (
          <ListGroup.Item key={z._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{z.naziv}</strong> <Badge bg="info" className="ms-2">{z.status}</Badge>
              <div className="text-muted" style={{ fontSize: '14px' }}>{z.opis}</div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span>{Number(z.procenjeniTrosak).toLocaleString('sr-RS')} RSD</span>
              {userInfo && (
                <Button size="sm" variant="outline-danger" onClick={() => ukloniZadatak(z._id)}>Obriši</Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />

      {userInfo?.role === 'admin' && (
        <div>
          <h4>Isplata / plaćanje</h4>
          {!prikaziPlacanje && (
            <Button variant="success" onClick={() => setPrikaziPlacanje(true)}>
              Plati preko PayPal-a
            </Button>
          )}
          {prikaziPlacanje && (
            <div className="mt-3" style={{ maxWidth: '400px' }}>
              <div className="mb-3">
                <label className="form-label">Iznos ({projekat.valuta})</label>
                <input
                  type="number"
                  className="form-control"
                  value={iznosZaUplatu}
                  onChange={(e) => setIznosZaUplatu(e.target.value)}
                  min="1"
                  step="0.01"
                  placeholder="npr. 500"
                />
              </div>
              {Number(iznosZaUplatu) > 0 && (
                <PayPalButton
                  projekatId={id}
                  iznos={Number(iznosZaUplatu)}
                  valuta={projekat.valuta}
                  opis={`Isplata za projekat: ${projekat.naziv}`}
                  onUspesnaUplata={() => setPrikaziPlacanje(false)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {userInfo?.role !== 'admin' && userInfo && (
        <p className="text-muted">Isplate za projekat vrši administrator.</p>
      )}
    </div>
  );
};

export default ProjectDetailsScreen;
