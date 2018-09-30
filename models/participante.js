const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ParticipanteSchema = new Schema({
  organizador: {
    type: String,
    required: true
  },
  idCamp: {
    type: String,
    required: true
  }
});

module.exports = Participante = mongoose.model('participante', ParticipanteSchema);