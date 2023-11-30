const Match = require('../model/match')
const Team = require('../model/team')

const getAll = async(req, res) => {
    try {
        const result = await Match.find();
    
        if (!result){
            return res.status(400).send("Error")
        }

        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getLastMatch = async (req, res) => {
    try {
        const lastMatch = await Match.findOne().sort({ matchTime: -1 });

        if (!lastMatch) {
            return res.status(400).send({message: "not_found"});
        }

        return res.status(200).send(lastMatch);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const addMatch = async(req, res) => {
    const { team_home, team_away, score_home, score_away, logs, matchTime, round } = req.body;
    console.log(req.body);
    // try {
    //     const result = await Match.create({
    //         team_home: team_home,
    //         team_away: team_away,
    //         score_home: score_home,
    //         score_away: score_away,
    //         logs: logs,
    //         matchTime: new Date(matchTime),
    //         round: round
    //     })

    //     return res.status(201).send({
    //         message: "created",
    //         result: result
    //     })
    // } catch (error) {
    //     return res.status(400).send(error);
    // }
}

module.exports = {
    getAll,
    getLastMatch,
    addMatch
}