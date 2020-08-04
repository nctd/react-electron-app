const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre_cliente: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un nombre'],
  },
  direccion_cliente: {
    type: String,
  },
  comuna_cliente: {
    type: String,
  },
  telefono_cliente: {
    type: String,
  },
  correo_cliente: {
    type: String,
    lowercase: true,
  },
  //   nombre_rep: {
  //     type: String,
  //   },
  //   telefono_rep: {
  //     type: String,
  //   },
  //   correo_rep: {
  //     type: String,
  //     lowercase: true,
  //   },
  //   nombre_contacto: {
  //     type: String,
  //   },
  //   telefono_contacto: {
  //     type: String,
  //   },
});
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
