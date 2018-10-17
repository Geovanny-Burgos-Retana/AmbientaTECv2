const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ProductoSchema = {
  nombre: { type: String, required: true },
  aporte: { type: String, required: true },
  imagen: { type: String, required: true }
}

const EmpresaSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  horario_apertura: { type: String, required: true },
  horario_cierre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  creador: { type: String, required: true },
  productos: { type: [ProductoSchema], required: true },
  habilitada: { type: Boolean, required: true },
});

module.exports = Empresa = mongoose.model('empresa', EmpresaSchema);