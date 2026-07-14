const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const DOZVOLJENA_ZANIMANJA = ['konstrukcije', 'visokogradnja', 'niskogradnja', 'hidrogradnja', 'ostalo'];

// @desc    Registracija novog korisnika
// @route   POST /api/auth/registracija
// @access  Javno
const registracija = async (req, res) => {
  try {
    const { ime, email, lozinka, zanimanje } = req.body;

    if (!ime || !email || !lozinka) {
      return res.status(400).json({ poruka: 'Sva polja su obavezna.' });
    }

    if (zanimanje && !DOZVOLJENA_ZANIMANJA.includes(zanimanje)) {
      return res.status(400).json({ poruka: 'Nevažeće zanimanje.' });
    }

    const postojiKorisnik = await User.findOne({ email });
    if (postojiKorisnik) {
      return res.status(400).json({ poruka: 'Korisnik sa ovim emailom već postoji.' });
    }

    if (lozinka.length < 6) {
      return res.status(400).json({ poruka: 'Lozinka mora imati najmanje 6 karaktera.' });
    }

    const korisnik = await User.create({ ime, email, lozinka, zanimanje });

    const token = generateToken(korisnik._id);

    res.status(201).json({
      korisnik: {
        _id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        role: korisnik.role,
        zanimanje: korisnik.zanimanje,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ poruka: error.message });
  }
};

// @desc    Prijava korisnika
// @route   POST /api/auth/prijava
// @access  Javno
const prijava = async (req, res) => {
  try {
    const { email, lozinka } = req.body;

    if (!email || !lozinka) {
      return res.status(400).json({ poruka: 'Email i lozinka su obavezni.' });
    }

    const korisnik = await User.findOne({ email });

    if (!korisnik || !(await korisnik.uporediLozinku(lozinka))) {
      return res.status(401).json({ poruka: 'Pogrešan email ili lozinka.' });
    }

    const token = generateToken(korisnik._id);

    res.json({
      korisnik: {
        _id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        role: korisnik.role,
        zanimanje: korisnik.zanimanje,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ poruka: error.message });
  }
};

// @desc    Profil ulogovanog korisnika
// @route   GET /api/auth/profil
// @access  Privatno
const profil = async (req, res) => {
  const korisnik = req.korisnik;
  res.json({
    _id: korisnik._id,
    ime: korisnik.ime,
    email: korisnik.email,
    role: korisnik.role,
    zanimanje: korisnik.zanimanje,
  });
};

module.exports = { registracija, prijava, profil };
