import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  useKreirajPaypalNarudzbinuMutation,
  usePotvrdiPaypalNarudzbinuMutation,
} from '../slices/isplataApiSlice';

// Dugme za plaćanje preko PayPal-a, vezano za konkretan projekat.
// Kada korisnik odobri plaćanje, backend potvrđuje (capture) uplatu.
const PayPalButton = ({ projekatId, iznos, valuta = 'EUR', opis, onUspesnaUplata }) => {
  const [poruka, setPoruka] = useState('');
  const [greska, setGreska] = useState('');

  const [kreirajNarudzbinu] = useKreirajPaypalNarudzbinuMutation();
  const [potvrdiNarudzbinu] = usePotvrdiPaypalNarudzbinuMutation();

  const kreirajOrder = async () => {
    setGreska('');
    try {
      const rezultat = await kreirajNarudzbinu({
        projekatId,
        iznos,
        valuta,
        opis,
      }).unwrap();
      return rezultat.paypalOrderId;
    } catch (err) {
      setGreska(err?.data?.poruka || 'Greška pri kreiranju PayPal narudžbine.');
      throw err;
    }
  };

  const odobriPlacanje = async (data) => {
    try {
      const rezultat = await potvrdiNarudzbinu(data.orderID).unwrap();
      setPoruka('✅ Plaćanje uspešno! Hvala.');
      if (onUspesnaUplata) onUspesnaUplata(rezultat.isplata);
    } catch (err) {
      setGreska(err?.data?.poruka || 'Greška pri potvrđivanju plaćanja.');
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      {greska && <div className="alert alert-danger py-2">{greska}</div>}
      {poruka && <div className="alert alert-success py-2">{poruka}</div>}
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
        createOrder={kreirajOrder}
        onApprove={odobriPlacanje}
        onError={() => setGreska('Došlo je do greške sa PayPal-om. Pokušajte ponovo.')}
      />
    </div>
  );
};

export default PayPalButton;
