const mongoose = require('mongoose');

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .then(() => console.log('DB Connection successful'))
  .catch((err) => console.log(err));

const Cliente = require('./models/clienteModel');
const Extintor = require('./models/extintorModel');
const Registro = require('./models/registroModel');
// const Revision = require('./models/revisionModel');
// const Mantenimiento = require('./models/mantenimientoModel');
// const Recarga = require('./models/recargaModel');
// const Presion = require('./models/presionModel');

const deleteData = async () => {
  try {
    await Cliente.deleteMany();
    await Extintor.deleteMany();
    await Registro.deleteMany();
    // await Revision.deleteMany();
    // await Mantenimiento.deleteMany();
    // await Recarga.deleteMany();
    // await Presion.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--delete') {
  deleteData();
}
