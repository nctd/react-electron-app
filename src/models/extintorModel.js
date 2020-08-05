const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  num_extintor: {
    type: String,
    required: [true, 'Debe ingresar un nombre'],
  },
  marca: {
    type: String,
  },
  tipo: {
    type: String,
    enum: ['Recargable', 'No recargable'],
  },
  agente_extincion: {
    type: String,
  },
  presion_trabajo: {
    type: String,
  },
  presion_prueba: {
    type: String,
  },
  fabricacion: {
    type: String,
  },
  fecha_servicio: {
    type: Date,
  },
});
const Extintor = mongoose.model('Extintor', extintorSchema);

module.exports = Extintor;
