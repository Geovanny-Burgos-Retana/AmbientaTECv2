const express = require('express');
const router = express.Router();

// Challenge Model
const Challenge = require('../../models/challenge');

// @route   GET api/challenges
// @desc    Get All challenges
// @access  Public
router.get('/', async (req, res) => {
	const challenges = await Challenge.find();
    res.json(challenges);
});

router.get('/:id', async (req, res) => {
  await Challenge.findById(req.params.id)
    .then(challenge => res.json(challenge))
    .catch(err => res.status(404).json({ success: false }));
});

// aumentar contador de twitter de un reto
router.put('/twitter/:id', function(req, res, next) {
    Challenge.findByIdAndUpdate(req.params.id,
    {$inc: {contadorTwitter: 1}},
    {safe: true, upsert: true})
    .then(challenge => res.json(challenge))
    .catch(err => res.status(404).json({ success: false }));
});

// aumentar contador de facebook de un reto
router.put('/facebook/:id', function(req, res, next) {
    Challenge.findByIdAndUpdate(req.params.id,
    {$inc: {contadorFb: 1}},
    {safe: true, upsert: true})
    .then(challenge => res.json(challenge))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/challenges
// @desc    Create a challenge
// @access  Public
router.post('/', (req, res) => {
	const newChallenge = new Challenge({
		challengeName: req.body.challengeName,
		points: req.body.points,
		endDate: req.body.endDate,
		time: req.body.time,
		description: req.body.description,
		hashtag: req.body.hashtag,
		contadorFb: req.body.contadorFb,
		contadorTwitter: req.body.contadorTwitter
	});

	newChallenge.save().then(challenge => res.json(challenge));
});


module.exports = router;