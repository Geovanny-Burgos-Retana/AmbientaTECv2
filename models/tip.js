const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TipSchema = new Schema({
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

module.exports = Tip = mongoose.model('tip', TipSchema);