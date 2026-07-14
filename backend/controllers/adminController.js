const User = require('../models/User');
const Project = require('../models/Project');
const Isplata = require('../models/Isplata');

// @desc    Lista svih korisnika
// @route   GET /api/admin/korisnici
// @access  Admin
const svikorisnici = async (req, res) => {
  const korisnici = await User.find({}).select('-lozinka');
  res.json(korisnici);
};

// @desc    Promeni ulogu korisnika (inzenjer <-> admin)
// @route   PUT /api/admin/korisnici/:id/uloga
// @access  Admin
const promeniUlogu = async (req, res) => {
  const { role } = req.body;
  if (!['inzenjer', 'admin'].includes(role)) {
    return res.status(400).json({ poruka: 'Nevažeća uloga.' });
  }
  const korisnik = await User.findById(req.params.id);
  if (!korisnik) {
    return res.status(404).json({ poruka: 'Korisnik nije pronađen.' });
  }
  korisnik.role = role;
  await korisnik.save();
  res.json({ poruka: 'Uloga ažurirana.', korisnik: { _id: korisnik._id, ime: korisnik.ime, role: korisnik.role } });
};

// @desc    Obriši korisnika
// @route   DELETE /api/admin/korisnici/:id
// @access  Admin
const obrisiKorisnika = async (req, res) => {
  const korisnik = await User.findById(req.params.id);
  if (!korisnik) {
    return res.status(404).json({ poruka: 'Korisnik nije pronađen.' });
  }
  await korisnik.deleteOne();
  res.json({ poruka: 'Korisnik obrisan.' });
};

// @desc    Osnovna statistika za admin panel
// @route   GET /api/admin/statistika
// @access  Admin
const statistika = async (req, res) => {
  const brojKorisnika = await User.countDocuments();
  const brojProjekata = await Project.countDocuments();
  const isplate = await Isplata.find({ status: 'ZAVRSENO' });
  const ukupnoIsplaceno = isplate.reduce((zbir, i) => zbir + i.iznos, 0);

  res.json({
    brojKorisnika,
    brojProjekata,
    brojZavrsenihIsplata: isplate.length,
    ukupnoIsplaceno,
  });
};

module.exports = { svikorisnici, promeniUlogu, obrisiKorisnika, statistika };
