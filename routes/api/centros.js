const express = require('express');
const router = express.Router();

// Campaña Model
const Centro = require('../../models/centro');

// @route   GET api/centros
// @desc    Get All centros
// @access  Public
router.get('/', async (req, res) => {
	const centros = await Centro.find({'habilitada': true});
    //.sort({ date: -1 })
    res.json(centros);
});

router.post('/', (req, res) => {
	const newcentro = new Centro({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		organizador: req.body.organizador,
		fechaDescripcion: req.body.fechaDescripcion,
		telefono: req.body.telefono,
		email: req.body.email,
		descripcion: req.body.descripcion,
		habilitada: req.body.habilitada,
		basura: req.body.basura,
		lat: req.body.lat,
		long: req.body.long
	});

	newcentro.save().then(centro => res.json(centro));
});

// @route   DELETE api/centros/:id
// @desc    Delete A centro
// @access  Public
router.delete('/:id', (req, res) => {
  centro.findById(req.params.id)
    .then(centro => centro.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;