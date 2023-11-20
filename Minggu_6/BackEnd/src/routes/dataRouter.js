const express = require("express");
const router = express.Router();

const {
    showAllData,
    registerUser,
    loginUSer,
    getStory
} = require("../controllers/dataController");

router.get("/show-all-data", showAllData);
router.get("/get-story", getStory);
router.post("/register", registerUser);
router.post("/login", loginUSer);

module.exports = router;
