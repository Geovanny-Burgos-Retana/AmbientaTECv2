const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CentroSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  organizador: {
    type: String,
    required: true
  },
  fechaDescripcion: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  habilitada: {
    type: Boolean,
    required: true
  },
  basura: {
    type:String,
    required: false,
  },
  lat: {
    type: Number,
    required: false
  },
  long: {
    type: Number,
    required: false
  },

});

module.exports = Centro = mongoose.model('centro', CentroSchema);