const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  encargado: { type: String },
  norma_chilena: { type: String },
  manual: { type: Boolean },
  razon_revision: {
    type: String,
    enum: ['puesta en servicio', 'segun programa', 'otra'],
  },
  razon_comentario: { type: String },
  resultado: [
    {
      type: {
        type: String,
      },
      descripcion: String,
    },
  ],
  resultado_comentario: { type: String },
});

const Revision = mongoose.model('Revision', revisionSchema);

module.exports = Revision;
