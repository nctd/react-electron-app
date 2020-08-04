const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  num_id: {
    type: String,
    required: [true, 'Debe ingresar un nombre'],
  },
  marca: {
    type: String,
    enum: ['Recargable', 'No recargable'],
  },
  tipo: {
    type: String,
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
    type: Date,
  },
  fecha_servicio: {
    type: Date,
  },
});
