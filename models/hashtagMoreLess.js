const mongoose = require('mongoose');
const { Schema } = mongoose;

const HashtagMoreLessSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    word: { type: String, required: true},
    position: { type: Boolean, required: true}
});

module.exports = mongoose.model('HashtagMoreLess', HashtagMoreLessSchema);