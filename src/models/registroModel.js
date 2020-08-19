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
  revision: {
    encargado: { type: String },
    normaChilena: { type: String },
    manual: { type: Boolean },
    razonRevision: {
      type: String,
      enum: ['puesta en servicio', 'segun programa', 'otra'],
      lowercase: true,
    },
    razonComentario: { type: String },
    resultados: {
      type: [
        {
          descripcion: {
            type: String,
          },
          respuesta: String,
        },
      ],
      default: undefined,
    },
    resultadoComentario: { type: String },
  },

  mantenimiento: {
    encargado: { type: String },
    normaChilena: { type: String },
    manual: { type: Boolean },
    razonMantenimiento: {
      type: String,
      enum: ['por revision', 'segun programa', 'otra'],
      lowercase: true,
    },
    razonComentario: { type: String },
    resultados: {
      type: [
        {
          descripcion: {
            type: String,
          },
          respuesta: String,
        },
      ],
      default: undefined,
    },
    resultadoComentario: { type: String },
  },
  recarga: {
    encargado: { type: String },
    normaChilena: { type: String },
    manual: { type: Boolean },
    agenteUtilizado: { type: String },
    masaExtAntes: { type: String },
    masaExtDespues: { type: String },
    verificaEstanqueidad: {
      type: String,
      enum: ['si', 'no', 'no aplica'],
      lowercase: true,
    },
    comentarios: { type: String },
  },
  presion: {
    encargado: { type: String },
    normaChilena: { type: String },
    examenPrevio: { type: Boolean },
    resultados: {
      type: [
        {
          descripcion: {
            type: String,
          },
          respuesta: String,
        },
      ],
      default: undefined,
    },
    resultadoComentario: { type: String },
  },
  cliente: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cliente',
    required: [true, 'Se necesita un cliente asociado al registro'],
  },
  extintor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Extintor',
    required: [true, 'Se necesita un extintor asociado al registro'],
  },
  extintorDebe: {
    type: String,
    enum: [
      'mantener en servicio',
      'retirar de servicio',
      'ser dado de baja',
    ],
    lowercase: true,
  },
  razones: {
    type: String,
  },
  creacion: { type: Date, default: Date.now() },
});

const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;
