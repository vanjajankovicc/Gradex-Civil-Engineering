const express = require('express');
const router = express.Router();
const {
  svikorisnici,
  promeniUlogu,
  obrisiKorisnika,
  statistika,
} = require('../controllers/adminController');
const { zastita, samoAdmin } = require('../middleware/authMiddleware');

router.use(zastita, samoAdmin);

router.get('/korisnici', svikorisnici);
router.put('/korisnici/:id/uloga', promeniUlogu);
router.delete('/korisnici/:id', obrisiKorisnika);
router.get('/statistika', statistika);

module.exports = router;
