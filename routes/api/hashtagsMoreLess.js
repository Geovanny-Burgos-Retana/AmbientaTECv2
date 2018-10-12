const express = require('express');
const router = express.Router();
const HashtagMoreLess = require('../../models/hashtagMoreLess');

router.get('/', async (req, res) => {
	const hashtags = await HashtagMoreLess.find();
    console.log(hashtags);
    res.json(hashtags);
});

router.post('/', async (req, res) => {
    const newHash = new HashtagMoreLess({
        word: req.body.word,
        position: req.body.position
    });
    console.log("Nuevo usuario: " + newHash);
     await newHash.save().then(hash => res.json(hash));
});

module.exports = router;