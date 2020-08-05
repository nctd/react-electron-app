const mongoose = require('mongoose');

const mantenimientoSchema = new mongoose.Schema({
  encargado: { type: String },
  normaChilena: { type: String },
  manual: { type: Boolean },
  razonMantenimiento: {
    type: String,
    enum: ['por revision', 'segun programa', 'otra'],
    lowercase: true,
  },
  razonComentario: { type: String },
  resultados: [
    {
      descripcion: {
        type: String,
      },
      respuesta: String,
    },
  ],
  resultadoComentario: { type: String },
});

const Mantenimiento = mongoose.model('Mantenimiento', mantenimientoSchema);

module.exports = Mantenimiento;
