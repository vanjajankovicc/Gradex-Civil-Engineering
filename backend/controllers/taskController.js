const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Svi zadaci za dati projekat
// @route   GET /api/projekti/:projectId/zadaci
// @access  Privatno
const zadaciZaProjekat = async (req, res) => {
  const zadaci = await Task.find({ projekat: req.params.projectId }).sort({ createdAt: -1 });
  res.json(zadaci);
};

// @desc    Kreiraj novi zadatak za projekat
// @route   POST /api/projekti/:projectId/zadaci
// @access  Privatno
const kreirajZadatak = async (req, res) => {
  const projekat = await Project.findById(req.params.projectId);
  if (!projekat) {
    return res.status(404).json({ poruka: 'Projekat nije pronađen.' });
  }

  const { naziv, opis, procenjeniTrosak, status } = req.body;
  if (!naziv || !opis || procenjeniTrosak === undefined) {
    return res.status(400).json({ poruka: 'Naziv, opis i procenjeni trošak su obavezni.' });
  }

  const zadatak = await Task.create({
    projekat: projekat._id,
    naziv,
    opis,
    procenjeniTrosak,
    status,
    kreirao: req.korisnik._id,
  });

  res.status(201).json(zadatak);
};

// @desc    Izmeni zadatak
// @route   PUT /api/zadaci/:id
// @access  Privatno
const izmeniZadatak = async (req, res) => {
  const zadatak = await Task.findById(req.params.id);
  if (!zadatak) {
    return res.status(404).json({ poruka: 'Zadatak nije pronađen.' });
  }
  const { naziv, opis, procenjeniTrosak, status } = req.body;
  zadatak.naziv = naziv ?? zadatak.naziv;
  zadatak.opis = opis ?? zadatak.opis;
  zadatak.procenjeniTrosak = procenjeniTrosak ?? zadatak.procenjeniTrosak;
  zadatak.status = status ?? zadatak.status;

  const azuriran = await zadatak.save();
  res.json(azuriran);
};

// @desc    Obriši zadatak
// @route   DELETE /api/zadaci/:id
// @access  Privatno
const obrisiZadatak = async (req, res) => {
  const zadatak = await Task.findById(req.params.id);
  if (!zadatak) {
    return res.status(404).json({ poruka: 'Zadatak nije pronađen.' });
  }
  await zadatak.deleteOne();
  res.json({ poruka: 'Zadatak obrisan.' });
};

module.exports = { zadaciZaProjekat, kreirajZadatak, izmeniZadatak, obrisiZadatak };
