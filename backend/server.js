const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const isplataRoutes = require('./routes/isplataRoutes');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Osnovna ruta za proveru da server radi
app.get('/', (req, res) => {
  res.json({ poruka: 'Gradex API radi ✅' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projekti', projectRoutes);
// Ugnježdene rute za zadatke: /api/projekti/:projectId/zadaci
app.use('/api/projekti/:projectId/zadaci', taskRoutes);
// Samostalne rute za pojedinačan zadatak: /api/zadaci/:id
app.use('/api/zadaci', taskRoutes.zadaciRouter);
app.use('/api/isplate', isplataRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // sačekaj bazu PRE nego što server počne da sluša
  app.listen(PORT, () => {
    console.log(`🚀 Gradex backend server radi na portu ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
};

startServer();
