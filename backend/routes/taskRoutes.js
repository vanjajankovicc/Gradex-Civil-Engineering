const express = require('express');
// mergeParams omogućava pristup :projectId iz parent rute (/api/projekti/:projectId/zadaci)
const router = express.Router({ mergeParams: true });
const {
  zadaciZaProjekat,
  kreirajZadatak,
  izmeniZadatak,
  obrisiZadatak,
} = require('../controllers/taskController');
const { zastita } = require('../middleware/authMiddleware');

router.use(zastita);

// /api/projekti/:projectId/zadaci
router.route('/').get(zadaciZaProjekat).post(kreirajZadatak);

module.exports = router;

// Poseban router za /api/zadaci/:id (izmena i brisanje pojedinačnog zadatka)
const zadaciRouter = express.Router();
zadaciRouter.use(zastita);
zadaciRouter.route('/:id').put(izmeniZadatak).delete(obrisiZadatak);
module.exports.zadaciRouter = zadaciRouter;
