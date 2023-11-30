const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    record: {
        win: {
            type: Number,
            required: true
        },
        draw: {
            type: Number,
            required: true
        },
        lose: {
            type: Number,
            required: true
        }
    }
}, { versionKey: false });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
