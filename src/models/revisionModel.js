const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  encargado: { type: String },
  normaChilena: { type: String },
  manual: { type: Boolean },
  razonRevision: {
    type: String,
    enum: ['puesta en servicio', 'segun programa', 'otra'],
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

const Revision = mongoose.model('Revision', revisionSchema);

module.exports = Revision;
