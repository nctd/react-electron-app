const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  numExtintor: {
    type: String,
    required: [true, 'Debe ingresar un nombre'],
  },
  marca: {
    type: String,
  },
  tipo: {
    type: String,
    enum: ['recargable', 'no recargable'],
    lowercase: true,
  },
  agenteExtincion: {
    type: String,
  },
  presionTrabajo: {
    type: String,
  },
  presionPrueba: {
    type: String,
  },
  fabricacion: {
    type: String,
  },
  fechaServicio: {
    type: Date,
  },
});
const Extintor = mongoose.model('Extintor', extintorSchema);

module.exports = Extintor;
