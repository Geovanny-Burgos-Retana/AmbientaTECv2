const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashtagSchema = new Schema({
    nombre: { type: String, required: true},
    contadorFb: { type: Number, required: true},
    contadorTwitter: { type: Number, required: true}
});

module.exports = mongoose.model('Hashtag', HashtagSchema);