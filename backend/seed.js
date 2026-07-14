// Pokreni sa: npm run seed
// Kreira prvog admin korisnika da bi mogao da se uloguješ i testiraš aplikaciju.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const ADMIN_EMAIL = 'admin@gradex.rs';
const ADMIN_LOZINKA = 'admin123';

const pokreniSeed = async () => {
  await connectDB();

  const postoji = await User.findOne({ email: ADMIN_EMAIL });
  if (postoji) {
    console.log('ℹ️  Admin nalog već postoji:', ADMIN_EMAIL);
  } else {
    await User.create({
      ime: 'Glavni Admin',
      email: ADMIN_EMAIL,
      lozinka: ADMIN_LOZINKA,
      role: 'admin',
    });
    console.log('✅ Kreiran admin nalog:');
    console.log('   Email:   ', ADMIN_EMAIL);
    console.log('   Lozinka: ', ADMIN_LOZINKA);
  }

  await mongoose.connection.close();
  process.exit(0);
};

pokreniSeed().catch((err) => {
  console.error('❌ Greška u seed skripti:', err.message);
  process.exit(1);
});
