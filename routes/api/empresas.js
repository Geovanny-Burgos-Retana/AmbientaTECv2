const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Empresa Model
const Empresa = require('../../models/empresa');

// Obtener datos de las empresas
router.get('/', async (req, res) => {
	const empresas = await Empresa.find({ 'habilitada': true }, { _id: 1, nombre: 1, direccion: 1, horario_apertura: 1, horario_cierre: 1, telefono: 1, email: 1, creador: 1 });
	res.json(empresas);
});

// Actualizar empresa
router.put('/:id', async (req, res) => {	
	const { nombre, direccion, horario_apertura, horario_cierre, telefono, email, creador, habilitada, productos } = req.body;
	const updateBusiness = { nombre, direccion, horario_apertura, horario_cierre, telefono, email, creador, habilitada, productos };
	console.log(updateBusiness);
	await Empresa.findByIdAndUpdate(req.params.id, updateBusiness);
	res.json({ status: "Empresa actualizada" });
});

// Obtener productos de una empresa
router.get('/productos/:_id', async (req, res) => {
	const productos = await Empresa.findOne({ _id: mongoose.Types.ObjectId(req.params._id) }, { _id: 0, productos: 1 });
	res.json(productos.productos);
});

// Crear una empresa
router.post('/', async (req, res) => {
	const nueva_empresa = new Empresa({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		horario_apertura: req.body.horario_apertura,
		horario_cierre: req.body.horario_cierre,
		telefono: req.body.telefono,
		email: req.body.email,
		creador: req.body.creador,
		habilitada: req.body.habilitada,
		productos: req.body.productos
	});
	await nueva_empresa.save().then(empresa => res.json(empresa));
});

// Eliminar empresa
router.delete('/', async (req, res) => {
	await Empresa.deleteOne({ _id: mongoose.Types.ObjectId(req.body._id), creador: req.body.creador });
	const empresa = await Empresa.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, { _id: 1 });
	if (req.body._id) {
		res.json({ status: "Empresa no eliminada porque no el creador" });
	} else {
		res.json({ status: "Empresa eliminada" });
	}

});

module.exports = router;