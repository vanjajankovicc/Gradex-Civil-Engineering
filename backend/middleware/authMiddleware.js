const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Proverava da li postoji validan JWT token u Authorization headeru
const zastita = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.korisnik = await User.findById(decoded.userId).select('-lozinka');

      if (!req.korisnik) {
        return res.status(401).json({ poruka: 'Korisnik nije pronađen, token nevažeći.' });
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ poruka: 'Nije autorizovano, token nevažeći.' });
    }
  }

  return res.status(401).json({ poruka: 'Nije autorizovano, nedostaje token.' });
};

// Dozvoljava pristup samo korisnicima sa role: 'admin'
const samoAdmin = (req, res, next) => {
  if (req.korisnik && req.korisnik.role === 'admin') {
    return next();
  }
  return res.status(403).json({ poruka: 'Pristup dozvoljen samo administratorima.' });
};

module.exports = { zastita, samoAdmin };
