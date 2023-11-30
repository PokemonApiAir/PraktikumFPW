const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    team_home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team_away: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    score_home: {
        type: Number,
        required: true
    },
    score_away: {
        type: Number,
        required: true
    },
    logs: [
        {
            event: {
                type: String,
                required: true
            },
            team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
                required: true
            },
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
                required: true
            }
        }
    ],
    matchTime: {
        type: Date,
        required: true
    },
    round: {
        type: String,
        required: true
    }
}, { versionKey: false });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
