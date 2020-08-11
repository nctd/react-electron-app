const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un nombre'],
  },
  direccion: {
    type: String,
    required: [true, 'Debe ingresar una direccion'],
  },
  comuna: {
    type: String,
  },
  telefono: {
    type: String,
  },
  correo: {
    type: String,
    lowercase: true,
  },
  creacion: { type: Date, default: Date.now() },
});
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
