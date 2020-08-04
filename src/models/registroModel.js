const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  servicios: [
    {
      type: String,
    },
  ],
});
