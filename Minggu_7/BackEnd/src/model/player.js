const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const Player = mongoose.model('Player', playerSchema);

module.exports= Player;