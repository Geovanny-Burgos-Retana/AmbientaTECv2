const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SolicitudSchema = new Schema({
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
  fecha: {
    type: Date,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

module.exports = Solicitud = mongoose.model('solicitud', SolicitudSchema);