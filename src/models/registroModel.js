const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  nombreRep: {
    type: String,
    trim: true,
  },
  telefonoRep: {
    type: String,
  },
  correoRep: {
    type: String,
  },
  nombreContacto: {
    type: String,
    trim: true,
  },
  telefonoContacto: {
    type: String,
  },
  correoContacto: {
    type: String,
  },
  servicios: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Revision',
    },
  ],
});

const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;
