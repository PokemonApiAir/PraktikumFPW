const express = require("express");
const router = express.Router();

const {
    getAll,
    getTop3,
    getPlayerById,
    getUnassignedPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer
} = require("../controllers/playerController");

router.get(`/get-all`, getAll)
router.get(`/get-top-3`, getTop3)
router.get(`/get-player-by-id`, getPlayerById)
router.get(`/get-unassigned-player`, getUnassignedPlayers)
router.post(`/add-player`, addPlayer)
router.put(`/update-player`, updatePlayer)
router.delete(`/delete-player`, deletePlayer)

module.exports = router;
