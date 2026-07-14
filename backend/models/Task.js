const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    projekat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    naziv: {
      type: String,
      required: [true, 'Naziv aktivnosti je obavezan'],
      trim: true,
    },
    opis: {
      type: String,
      default: '',
    },
    procenjeniTrosak: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Na čekanju', 'U toku', 'Završeno'],
      default: 'Na čekanju',
    },
    kreirao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
