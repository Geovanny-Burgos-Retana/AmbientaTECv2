const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChallengeSchema = new Schema({
  challengeName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hashtag: {
    type: String,
    required: true
  },
  contadorFb: { 
    type: Number, 
    required: true
  },
  contadorTwitter: { 
    type: Number, 
    required: true
  }
});

module.exports = Challenge = mongoose.model('challenge', ChallengeSchema);