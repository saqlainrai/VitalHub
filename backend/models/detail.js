
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather Not Say'],
        required: true
    },
    goal: {
        type: String,
        enum: ['lose', 'gain', 'maintain'],
        required: true
    },
    calories: Number,
});

const Detail = mongoose.model('detail', detailSchema);
module.exports = Detail;