const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: [true, 'Ime je obavezno'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email je obavezan'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    lozinka: {
      type: String,
      required: [true, 'Lozinka je obavezna'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['inzenjer', 'admin'],
      default: 'inzenjer',
    },
    zanimanje: {
      type: String,
      enum: ['konstrukcije', 'visokogradnja', 'niskogradnja', 'hidrogradnja', 'ostalo'],
      default: 'ostalo',
    },
  },
  { timestamps: true }
);

// Pre-save hook: hešuj lozinku samo ako je izmenjena
userSchema.pre('save', async function (next) {
  if (!this.isModified('lozinka')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.lozinka = await bcrypt.hash(this.lozinka, salt);
  next();
});

userSchema.methods.uporediLozinku = async function (unetaLozinka) {
  return await bcrypt.compare(unetaLozinka, this.lozinka);
};

module.exports = mongoose.model('User', userSchema);
