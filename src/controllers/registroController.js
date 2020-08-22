const Registro = require('./../models/registroModel');
const AppError = require('./../utils/appError');

exports.createRegistro = async (registro, cliente, extintor) => {
  const reg = await Registro.create({
    nombreRep: registro.nombreRep,
    telefonoRep: registro.telefonoRep,
    correoRep: registro.correoRep,
    nombreContacto: registro.nombreContacto,
    telefonoContacto: registro.telefonoContacto,
    correoContacto: registro.correoContacto,
    revision: registro.revision,
    mantenimiento: registro.mantenimiento,
    recarga: registro.recarga,
    presion: registro.presion,
    cliente: cliente,
    extintor: extintor,
    extintorDebe: registro.extintorDebe,
    razones: registro.razones,
  });
  return reg;
};
