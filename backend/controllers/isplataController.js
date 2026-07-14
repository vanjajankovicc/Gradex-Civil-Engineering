const Isplata = require('../models/Isplata');
const Project = require('../models/Project');
const { kreirajNarudzbinu, potvrdiNarudzbinu } = require('../utils/paypal');

// @desc    Sve isplate (admin vidi sve, inženjer vidi samo svoje)
// @route   GET /api/isplate
// @access  Privatno
const sveIsplate = async (req, res) => {
  const filter = req.korisnik.role === 'admin' ? {} : { korisnik: req.korisnik._id };
  const isplate = await Isplata.find(filter)
    .populate('projekat', 'naziv')
    .populate('korisnik', 'ime email')
    .sort({ createdAt: -1 });
  res.json(isplate);
};

// @desc    Kreira PayPal narudžbinu za isplatu vezanu za projekat
// @route   POST /api/isplate/paypal/kreiraj-narudzbinu
// @body    { projekatId, iznos, valuta, opis }
// @access  Privatno
const kreirajPaypalNarudzbinu = async (req, res) => {
  try {
    const { projekatId, iznos, valuta, opis } = req.body;

    if (!projekatId || !iznos || Number(iznos) <= 0) {
      return res.status(400).json({ poruka: 'Projekat i iznos (veći od 0) su obavezni.' });
    }

    const projekat = await Project.findById(projekatId);
    if (!projekat) {
      return res.status(404).json({ poruka: 'Projekat nije pronađen.' });
    }

    const paypalNarudzbina = await kreirajNarudzbinu(iznos, valuta || 'EUR', opis || `Isplata - ${projekat.naziv}`);

    // Sačuvaj isplatu u bazi kao "na čekanju" dok se plaćanje ne potvrdi
    const isplata = await Isplata.create({
      projekat: projekat._id,
      korisnik: req.korisnik._id,
      iznos,
      valuta: valuta || 'EUR',
      opis: opis || `Isplata - ${projekat.naziv}`,
      paypalOrderId: paypalNarudzbina.id,
      status: 'NA_CEKANJU',
    });

    res.status(201).json({
      paypalOrderId: paypalNarudzbina.id,
      isplataId: isplata._id,
    });
  } catch (error) {
    console.error('PayPal greška (kreiranje):', error?.response?.data || error.message);
    res.status(500).json({ poruka: 'Greška pri kreiranju PayPal narudžbine.', detalji: error.message });
  }
};

// @desc    Potvrđuje (captures) PayPal uplatu nakon odobrenja korisnika
// @route   POST /api/isplate/paypal/potvrdi-narudzbinu/:orderID
// @access  Privatno
const potvrdiPaypalNarudzbinu = async (req, res) => {
  try {
    const { orderID } = req.params;

    const rezultat = await potvrdiNarudzbinu(orderID);

    const isplata = await Isplata.findOne({ paypalOrderId: orderID });
    if (!isplata) {
      return res.status(404).json({ poruka: 'Isplata nije pronađena za dati orderID.' });
    }

    const uspesno = rezultat.status === 'COMPLETED';

    isplata.status = uspesno ? 'ZAVRSENO' : 'NEUSPESNO';
    isplata.paypalPayerId = rezultat.payer?.payer_id;
    isplata.paypalDetalji = rezultat;
    await isplata.save();

    res.json({
      poruka: uspesno ? 'Plaćanje uspešno potvrđeno.' : 'Plaćanje nije uspelo.',
      isplata,
    });
  } catch (error) {
    console.error('PayPal greška (potvrda):', error?.response?.data || error.message);
    res.status(500).json({ poruka: 'Greška pri potvrđivanju PayPal narudžbine.', detalji: error.message });
  }
};

module.exports = { sveIsplate, kreirajPaypalNarudzbinu, potvrdiPaypalNarudzbinu };
