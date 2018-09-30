const express = require('express');
const router = express.Router();

// Recomendacion Model
const Recomendacion = require('../../models/recomendacion');

// @route   GET api/Recomendacion
// @desc    Get All Recomendacion
// @access  Public
router.get('/', async (req, res) => {
	const recomendaciones = await Recomendacion.find();
    res.json(recomendaciones);
});

// @route   POST api/recomendaciones
// @desc    Create a Recomendacion
// @access  Public
router.post('/', (req, res) => {
	const newRecomendacion = new Recomendacion({
		nombre: req.body.nombre,
		foto: req.body.foto,
		descripcion: req.body.descripcion
	});

	newRecomendacion.save().then(recomendacion => res.json(recomendacion));
});


module.exports = router;