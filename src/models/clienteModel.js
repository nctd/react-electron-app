const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un nombre'],
  },
  direccion: {
    type: String,
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
});
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
