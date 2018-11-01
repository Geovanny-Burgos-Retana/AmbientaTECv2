const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampanaSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  organizador: { type: String, required: true },
  fecha: { type: Date, required: true },
  telefono: { type: Number, required: true },
  email: { type: String, required: true },
  descripcion: { type: String, required: true },
  habilitada: { type: Boolean, required: true },
  hashtag: { type: String, required: true },
  contadorFb: {    type: Number,     required: true  },
  contadorTwitter: {     type: Number,     required: true  },
  lat: {    type: Number,    required: false  },
  long: {    type: Number,    required: false  }
});

module.exports = Campana = mongoose.model('campana', CampanaSchema);