const express = require('express');
const router = express.Router();
const Logro = require('../../models/logro');



router.get('/', async (req, res) => {
	const logros = await Logro.find();
    res.json(logros);
});

router.post('/', async (req, res) => {
    const newLogro = new Logro({
        nombre: req.body.nombre,
        score: req.body.score,
        img: req.body.img
    });
     await newLogro.save().then(logro => res.json(logro));
});

module.exports = router;