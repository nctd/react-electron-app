const Extintor = require('./../models/extintorModel');

exports.createExtintor = async (extintor) => {
  const ext = await Extintor.create(extintor);
  return ext;
};
