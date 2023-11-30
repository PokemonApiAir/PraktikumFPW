const express = require("express");
const router = express.Router();

const {
    getAll,
    getLastMatch,
    addMatch
} = require("../controllers/matchController");

router.get(`/get-all`, getAll)
router.get(`/get-last-match`, getLastMatch)
router.post(`/add-match`, addMatch)

module.exports = router;
