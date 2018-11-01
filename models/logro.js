const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogroSchema = new Schema({
    nombre: { type: String, required: true},
    score: { type: Number, required: true},
    img: { type: String, required: true}
});

module.exports = mongoose.model('logro', LogroSchema);