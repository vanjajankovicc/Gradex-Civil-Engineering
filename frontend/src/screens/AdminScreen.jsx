import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  useGetSviKorisniciQuery,
  usePromeniUloguMutation,
  useObrisiKorisnikaMutation,
} from '../slices/adminApiSlice';
import './AdminScreen.css';

// Ranije je "ADMIN PANEL" link u meniju vodio na stranicu koja ne postoji.
// Backend je već imao gotove rute za upravljanje korisnicima — ovaj ekran ih konačno koristi.

const AdminScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: korisnici, isLoading, error, refetch } = useGetSviKorisniciQuery();
  const [promeniUlogu] = usePromeniUloguMutation();
  const [obrisiKorisnika] = useObrisiKorisnikaMutation();

  if (!userInfo || userInfo.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const izmeniUlogu = async (id, trenutnaUloga) => {
    const novaUloga = trenutnaUloga === 'admin' ? 'inzenjer' : 'admin';
    try {
      await promeniUlogu({ id, role: novaUloga }).unwrap();
      refetch();
    } catch (err) {
      alert(err?.data?.poruka || 'Greška pri promeni uloge.');
    }
  };

  const obrisi = async (id, ime) => {
    if (!window.confirm(`Obrisati korisnika "${ime}"? Ova akcija je trajna.`)) return;
    try {
      await obrisiKorisnika(id).unwrap();
      refetch();
    } catch (err) {
      alert(err?.data?.poruka || 'Greška pri brisanju korisnika.');
    }
  };

  return (
    <div className="admin-wrap">
      <h2>Admin panel — korisnici</h2>

      {isLoading && <p>Učitavanje korisnika...</p>}
      {error && <p>Greška pri učitavanju korisnika.</p>}

      {korisnici && (
        <table className="admin-tabela">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Zanimanje</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map((k) => (
              <tr key={k._id}>
                <td>{k.ime}</td>
                <td>{k.email}</td>
                <td>{k.zanimanje}</td>
                <td>
                  <span className={`uloga-oznaka uloga-${k.role}`}>{k.role}</span>
                </td>
                <td className="admin-akcije">
                  <button onClick={() => izmeniUlogu(k._id, k.role)}>
                    {k.role === 'admin' ? 'Ukloni admin ulogu' : 'Postavi za admina'}
                  </button>
                  {k._id !== userInfo._id && (
                    <button className="btn-obrisi" onClick={() => obrisi(k._id, k.ime)}>
                      Obriši
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminScreen;
