const express = require('express');
const router = express.Router();
const {
  svaProjekti,
  jedanProjekat,
  kreirajProjekat,
  izmeniProjekat,
  obrisiProjekat,
} = require('../controllers/projectController');
const { zastita } = require('../middleware/authMiddleware');

router.use(zastita);

router.route('/').get(svaProjekti).post(kreirajProjekat);
router.route('/:id').get(jedanProjekat).put(izmeniProjekat).delete(obrisiProjekat);

module.exports = router;
