const express = require('express');
const router = express.Router();

// Tip Model
const Tip = require('../../models/tip');

// @route   GET api/Tip
// @desc    Get All Tip
// @access  Public
router.get('/', async (req, res) => {
	const tips = await Tip.find();
    res.json(tips);
});

// @route   POST api/tips
// @desc    Create a tip
// @access  Public
router.post('/', (req, res) => {
	const newTip = new Tip({
		nombre: req.body.nombre,
		foto: req.body.foto,
		descripcion: req.body.descripcion
	});

	newTip.save().then(tip => res.json(tip));
});


module.exports = router;