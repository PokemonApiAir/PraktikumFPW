const express = require("express");
const router = express.Router();

const {
    showAllData,
    registerUser,
    loginUSer,
    getStory,
    getUserData,
    getStoryId,
    getStoryIdChara,
    detailChara,
    addChara,
    addStory,
    updateChara,
    updateThumb,
    updateJudul,
    updateProfile,
    deleteChara,
    deleteStory
} = require("../controllers/dataController");

router.get("/show-all-data", showAllData);
router.get("/get-story", getStory);
router.get("/get-story-id", getStoryId);
router.get("/get-story-id-chara", getStoryIdChara);
router.get("/detail-chara", detailChara);
router.get("/get-user", getUserData);
router.post("/login", loginUSer);
router.post("/register", registerUser);
router.post("/add-chara", addChara);
router.post("/add-story", addStory);
router.put("/update-chara", updateChara);
router.put("/update-thumb", updateThumb);
router.put("/update-judul", updateJudul);
router.put("/update-profile", updateProfile);
router.delete("/delete-chara", deleteChara);
router.delete("/delete-story", deleteStory);

module.exports = router;
