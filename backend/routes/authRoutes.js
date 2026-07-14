const express = require('express');
const router = express.Router();
const { registracija, prijava, profil } = require('../controllers/authController');
const { zastita } = require('../middleware/authMiddleware');

router.post('/registracija', registracija);
router.post('/prijava', prijava);
router.get('/profil', zastita, profil);

module.exports = router;
