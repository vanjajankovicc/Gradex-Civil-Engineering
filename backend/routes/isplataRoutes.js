const express = require('express');
const router = express.Router();
const {
  sveIsplate,
  kreirajPaypalNarudzbinu,
  potvrdiPaypalNarudzbinu,
} = require('../controllers/isplataController');
const { zastita, samoAdmin } = require('../middleware/authMiddleware');

router.use(zastita);

router.get('/', sveIsplate);
// Plaćanje mogu da pokrenu i potvrde SAMO administratori
router.post('/paypal/kreiraj-narudzbinu', samoAdmin, kreirajPaypalNarudzbinu);
router.post('/paypal/potvrdi-narudzbinu/:orderID', samoAdmin, potvrdiPaypalNarudzbinu);

module.exports = router;
