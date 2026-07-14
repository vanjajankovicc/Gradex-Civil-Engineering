const axios = require('axios');

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

// Uzima access token od PayPal-a (Client Credentials flow)
async function dobaviAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error(
      'PayPal kredencijali nisu podešeni. Dodaj PAYPAL_CLIENT_ID i PAYPAL_CLIENT_SECRET u .env fajl.'
    );
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(
    `${PAYPAL_BASE_URL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
}

// Kreira PayPal narudžbinu (order) za dati iznos
async function kreirajNarudzbinu(iznos, valuta = 'EUR', opis = 'Gradex isplata') {
  const accessToken = await dobaviAccessToken();

  const response = await axios.post(
    `${PAYPAL_BASE_URL}/v2/checkout/orders`,
    {
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: opis,
          amount: {
            currency_code: valuta,
            value: Number(iznos).toFixed(2),
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data; // sadrži id (order id) i status
}

// Potvrđuje (kapturira) uplatu nakon što korisnik odobri plaćanje na PayPal-u
async function potvrdiNarudzbinu(orderId) {
  const accessToken = await dobaviAccessToken();

  const response = await axios.post(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

module.exports = { kreirajNarudzbinu, potvrdiNarudzbinu };
