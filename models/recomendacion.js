const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecomendacionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

module.exports = Recomendacion = mongoose.model('recomendacion', RecomendacionSchema);