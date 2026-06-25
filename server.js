import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Provera konekcije
app.get('/', (req, res) => {
  res.send('Gradex API je aktivan!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gradexDB')
  .then(() => {
    app.listen(PORT, () => console.log(`Server radi na portu ${PORT} i baza je povezana.`));
  })
  .catch((err) => console.log('Greška pri povezivanju sa bazom:', err));