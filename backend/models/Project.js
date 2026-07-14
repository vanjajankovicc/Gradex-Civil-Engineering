const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: [true, 'Naziv projekta je obavezan'],
      trim: true,
    },
    opis: {
      type: String,
      default: '',
    },
    budzet: {
      type: Number,
      required: [true, 'Budžet je obavezan'],
      default: 0,
    },
    valuta: {
      type: String,
      default: 'EUR',
    },
    status: {
      type: String,
      enum: ['Priprema', 'U toku', 'Završeno', 'Obustavljeno'],
      default: 'Priprema',
    },
    vlasnik: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
