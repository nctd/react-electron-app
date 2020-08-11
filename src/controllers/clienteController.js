const Cliente = require('./../models/clienteModel');
const AppError = require('./../utils/appError');

exports.createCliente = async (cliente) => {
  const cli = await Cliente.create(cliente);
  return cli;
};
