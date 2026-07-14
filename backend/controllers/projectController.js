const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Projekti - inženjer vidi SAMO svoje, admin vidi sve
// @route   GET /api/projekti
// @access  Privatno
const svaProjekti = async (req, res) => {
  const filter = req.korisnik.role === 'admin' ? {} : { vlasnik: req.korisnik._id };
  const projekti = await Project.find(filter).populate('vlasnik', 'ime email').sort({ createdAt: -1 });
  res.json(projekti);
};

// @desc    Jedan projekat po ID-u (samo vlasnik ili admin)
// @route   GET /api/projekti/:id
// @access  Privatno
const jedanProjekat = async (req, res) => {
  const projekat = await Project.findById(req.params.id).populate('vlasnik', 'ime email');
  if (!projekat) {
    return res.status(404).json({ poruka: 'Projekat nije pronađen.' });
  }
  const jeVlasnik = projekat.vlasnik._id.toString() === req.korisnik._id.toString();
  if (!jeVlasnik && req.korisnik.role !== 'admin') {
    return res.status(403).json({ poruka: 'Nemate pristup ovom projektu.' });
  }
  res.json(projekat);
};

// @desc    Kreiraj novi projekat
// @route   POST /api/projekti
// @access  Privatno
const kreirajProjekat = async (req, res) => {
  const { naziv, opis, budzet, valuta, status } = req.body;

  if (!naziv || budzet === undefined) {
    return res.status(400).json({ poruka: 'Naziv i budžet su obavezni.' });
  }

  const projekat = await Project.create({
    naziv,
    opis,
    budzet,
    valuta,
    status,
    vlasnik: req.korisnik._id,
  });

  res.status(201).json(projekat);
};

// @desc    Izmeni projekat
// @route   PUT /api/projekti/:id
// @access  Privatno
const izmeniProjekat = async (req, res) => {
  const projekat = await Project.findById(req.params.id);
  if (!projekat) {
    return res.status(404).json({ poruka: 'Projekat nije pronađen.' });
  }
  const jeVlasnik = projekat.vlasnik.toString() === req.korisnik._id.toString();
  if (!jeVlasnik && req.korisnik.role !== 'admin') {
    return res.status(403).json({ poruka: 'Nemate dozvolu da menjate ovaj projekat.' });
  }

  const { naziv, opis, budzet, valuta, status } = req.body;
  projekat.naziv = naziv ?? projekat.naziv;
  projekat.opis = opis ?? projekat.opis;
  projekat.budzet = budzet ?? projekat.budzet;
  projekat.valuta = valuta ?? projekat.valuta;
  projekat.status = status ?? projekat.status;

  const azuriran = await projekat.save();
  res.json(azuriran);
};

// @desc    Obriši projekat (i sve njegove zadatke)
// @route   DELETE /api/projekti/:id
// @access  Privatno
const obrisiProjekat = async (req, res) => {
  const projekat = await Project.findById(req.params.id);
  if (!projekat) {
    return res.status(404).json({ poruka: 'Projekat nije pronađen.' });
  }
  const jeVlasnik = projekat.vlasnik.toString() === req.korisnik._id.toString();
  if (!jeVlasnik && req.korisnik.role !== 'admin') {
    return res.status(403).json({ poruka: 'Nemate dozvolu da obrišete ovaj projekat.' });
  }
  await Task.deleteMany({ projekat: projekat._id });
  await projekat.deleteOne();
  res.json({ poruka: 'Projekat i pripadajući zadaci su obrisani.' });
};

module.exports = { svaProjekti, jedanProjekat, kreirajProjekat, izmeniProjekat, obrisiProjekat };
