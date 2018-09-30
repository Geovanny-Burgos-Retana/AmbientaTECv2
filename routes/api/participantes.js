const express = require('express');
const router = express.Router();

// Campaña Model
const Participante = require('../../models/participante');

// @route   GET api/participantes
// @desc    Get All participantes
// @access  Public
router.get('/', async (req, res) => {
	const participantes = await Participante.find();
    //.sort({ date: -1 })
    console.log(participantes);
    res.json(participantes);
});

// @route   POST api/participantes
// @desc    Create a participantes
// @access  Public
router.post('/', (req, res) => {
	const newParticipante = new Participante({
		organizador: req.body.organizador,
		idCamp: req.body.idCamp,
	});

	newParticipante.save().then(participante => res.json(participante));
});

// @route   DELETE api/participante/:id
// @desc    Delete A participante
// @access  Public
router.delete('/:id', (req, res) => {
  Participante.findById(req.params.id)
    .then(participante => participante.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;