const express = require("express");
const router = express.Router();

const {
    getAll,
    getTeamById,
    getTop3,
    addTeam,
    addPlayer,
    updateTeam,
    deletePlayer,
    deleteTeam
} = require("../controllers/teamController");

router.get(`/get-all`, getAll)
router.get(`/get-team-by-id`, getTeamById)
router.get(`/get-top-3`, getTop3)
router.post(`/add-team`, addTeam)
router.put(`/add-player`, addPlayer)
router.put(`/update-team`, updateTeam)
router.put(`/delete-player`, deletePlayer)
router.delete(`/delete-team`, deleteTeam)

module.exports = router;
