const express = require("express");
const apiRouter = express.Router();

const matchRouter = require("./matchRouter");
const playerRouter = require("./playerRouter");
const teamRouter = require("./teamRouter");

apiRouter.use("/match", matchRouter);
apiRouter.use("/player", playerRouter);
apiRouter.use("/team", teamRouter);

module.exports = apiRouter