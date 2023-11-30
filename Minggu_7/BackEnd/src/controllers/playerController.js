const Player = require('../model/player')
const Match = require('../model/match')
const Team = require('../model/team')

const getAll = async (req, res) => {
    const result = await Player.find();
    
    if (!result){
        return res.status(400).send("Error")
    }

    return res.status(200).send(result);
}

const getTop3 = async (req, res) => {
    try {
        const result = await Match.aggregate([
            {
                $unwind: '$logs'
            },
            {
                $group: {
                    _id: '$logs.player',
                    goals: { $sum: { $cond: { if: { $eq: ['$logs.event', 'goal'] }, then: 1, else: 0 } } }
                }
            },
            {
                $sort: { goals: -1 }
            },
            {
                $limit: 3
            }
        ]);

        const topScorerIds = result.map(item => item._id);

        const topScorers = await Player.find({ _id: { $in: topScorerIds } });

        const topScorersWithTotalGoal = topScorers.map(player => {
            const playerGoals = result.find(item => item._id.equals(player._id));
            return {
                _id: player._id,
                nationality: player.nationality,
                number: player.number,
                name: player.name,
                totalGoal: playerGoals ? playerGoals.goals : 0
            };
        });

        return res.status(200).send(topScorersWithTotalGoal);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const getPlayerById = async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Player.findOne({
            _id: id
        })
    
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getUnassignedPlayers = async (req, res) => {
    try {
        const allPlayers = await Player.find();
    
        const teamsWithPlayers = await Team.find().populate('players', 'name');
    
        const assignedPlayerIds = teamsWithPlayers.reduce((acc, team) => {
            team.players.forEach(player => acc.add(player._id.toString()));
            return acc;
        }, new Set());
  
        const unassignedPlayers = allPlayers.filter(player => !assignedPlayerIds.has(player._id.toString()));
  
        return res.status(200).send(unassignedPlayers);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const addPlayer = async (req, res) => {
    const { name, age, position, nationality, number } = req.body;

    try {
        const result = await Player.create({
            name: name,
            age: age,
            position: position,
            nationality: nationality,
            number: number
        })

        return res.status(201).send({
            message: "created",
            result: result
        })
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updatePlayer = async (req, res) => {
    const { id, name, age, position, nationality, number } = req.body;

    try {
        const result = await Player.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    name: name,
                    age: age,
                    position: position,
                    nationality: nationality,
                    number: number
                }
            }
        )
    
        return res.status(200).send({
            message: "updated",
            ...result
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deletePlayer = async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Player.deleteOne(
            {
                _id: id
            }
        )
    
        return res.status(200).send({
            message: "deleted",
            ...result
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    getAll,
    getTop3,
    getPlayerById,
    getUnassignedPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer
}