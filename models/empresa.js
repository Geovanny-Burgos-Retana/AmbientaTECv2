const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmpresaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  productos: {
    type: String,
    required: true
  },
  dueno: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  }
});

module.exports = Empresa = mongoose.model('empresa', EmpresaSchema);