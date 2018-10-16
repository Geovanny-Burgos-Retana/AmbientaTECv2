const express = require('express');
const router = express.Router();
const Hashtag = require('../../models/hashtag');

router.get('/', async (req, res) => {
	const hashtags = await Hashtag.find();
    console.log(hashtags);
    res.json(hashtags);
});

router.post('/', async (req, res) => {
    const newHash = new Hashtag({
        nombre: req.body.nombre,
        contadorFb: 0,
        contadorTwitter: 0
    });
     await newHash.save().then(hash => res.json(hash));
});

module.exports = router;