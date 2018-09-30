const express = require('express');
const router = express.Router();

// Campaña Model
const Campana = require('../../models/campana');

// @route   GET api/campanas
// @desc    Get All campanas
// @access  Public
router.get('/', async (req, res) => {
	const campanas = await Campana.find({'habilitada': true});
    //.sort({ date: -1 })
    res.json(campanas);
});

// @route   POST api/campanas
// @desc    Create a campana
// @access  Public
router.post('/', (req, res) => {
	const newCampana = new Campana({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		organizador: req.body.organizador,
		fecha: req.body.fecha,
		telefono: req.body.telefono,
		email: req.body.email,
		descripcion: req.body.descripcion,
		habilitada: req.body.habilitada,
		hashtag: req.body.hashtag
	});

	newCampana.save().then(campana => res.json(campana));
});

// @route   DELETE api/campanas/:id
// @desc    Delete A campana
// @access  Public
router.delete('/:id', (req, res) => {
  Campana.findById(req.params.id)
    .then(campana => campana.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;