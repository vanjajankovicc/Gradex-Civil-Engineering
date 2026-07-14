const mongoose = require('mongoose');

const isplataSchema = new mongoose.Schema(
  {
    projekat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    korisnik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    iznos: {
      type: Number,
      required: true,
    },
    valuta: {
      type: String,
      default: 'EUR',
    },
    opis: {
      type: String,
      default: '',
    },
    nacinPlacanja: {
      type: String,
      enum: ['paypal'],
      default: 'paypal',
    },
    status: {
      type: String,
      enum: ['NA_CEKANJU', 'ZAVRSENO', 'NEUSPESNO'],
      default: 'NA_CEKANJU',
    },
    paypalOrderId: {
      type: String,
    },
    paypalPayerId: {
      type: String,
    },
    paypalDetalji: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Isplata', isplataSchema);
