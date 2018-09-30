const express = require('express');
const router = express.Router();

// Empresa Model
const Empresa = require('../../models/empresa');

// @route   GET api/empresas
// @desc    Get All empresas
// @access  Public
router.get('/', (req, res) => {
	Empresa.find()
    //.sort({ date: -1 })
    .then(empresas => res.json(empresas));
});

// @route   POST api/empresas
// @desc    Create a empresa
// @access  Public
router.post('/', (req, res) => {
	const newEmpresa = new Empresa({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		productos: req.body.productos,
		dueno: req.body.dueno,
		email: req.body.email,
		telefono: req.body.telefono
	});

	newEmpresa.save().then(empresa => res.json(empresa));
});

// @route   DELETE api/items/:id
// @desc    Delete A Empresa
// @access  Public
router.delete('/:id', (req, res) => {
  Empresa.findById(req.params.id)
    .then(empresa => empresa.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;