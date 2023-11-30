const Team = require('../model/team')

const getAll = async(req, res) => {
    try {
        const result = await Team.find();

        if (!result) {
            return res.status(400).send("Error");
        }

        const result_array = [];

        for (let i = 0; i < result.length; i++) {
            const point = calculatePoints(result[i].record);
            const data = {
                point: point,
                ...result[i]._doc
            }

            result_array.push(data);
        }

        return res.status(200).send(result_array);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getTeamById = async (req, res) => {
    const { id } = req.query;
    const result = await Team.findOne({
        _id: id
    });
    
    if (!result){
        return res.status(404).send("not_found")
    }

    return res.status(200).send(result);
}

const getTop3 = async(req, res) => {
    try {
        const teams = await Team.find();
        
        teams.forEach((team) => {
            team.points = calculatePoints(team.record);
        });
        
        const sortedTeams = teams.sort((a, b) => b.points - a.points);

        const teamsWithPoints = sortedTeams.map(team => {
            return {
                _id: team._id,
                name: team.name,
                coach: team.coach,
                players: team.players,
                record: team.record,
                points: team.points
            };
        });

        return res.status(200).send(teamsWithPoints.slice(0, 3));
    } catch (error) {
        return res.status(400).send(error)
    }
}

const addTeam = async(req, res) => {
    const { name, coach } = req.body;

    try {
        const result = await Team.create({
            name: name,
            coach: coach,
            players: [],
            record: {
                win: 0,
                draw: 0,
                lose: 0,
            }
        })

        return res.status(201).send({
            message: "created",
            result: result
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

const addPlayer = async(req, res) => {
    const { id, id_player } = req.body;

    try {
        const result = await Team.updateOne(
            {
                _id: id
            },
            {
                $push: {
                    players: id_player
                }
            }
        )

        return res.status(200).send({
            message: "inserted",
            ...result
        });
    } catch (error) {
        
    }
}

const updateTeam = async(req, res) => {
    const { id, name, coach } = req.body;

    try {
        const result = await Team.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    name: name,
                    coach: coach
                }
            }
        )

        return res.status(200).send({
            message: "updated",
            ...result
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

const deletePlayer = async(req, res) => {
    const { id, id_player } = req.body;

    try {
        const result = await Team.updateMany(
            {
                _id: id
            },
            {
                $pull: {
                    players: id_player
                }
            }
        )

        return res.status(200).send({
            message: "deleted",
            ...result
        })
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteTeam = async(req, res) => {
    const { id } = req.query;

    try {
        const result = await Team.deleteOne({
            _id: id
        })

        return res.status(200).send({
            message: "deleted",
            ...result
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

function calculatePoints(record) {
    return record.win * 5 + record.draw * 2;
}
  

module.exports = {
    getAll,
    getTeamById,
    getTop3,
    addTeam,
    addPlayer,
    updateTeam,
    deletePlayer,
    deleteTeam
}