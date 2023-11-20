const express = require("express");
const apiRouter = express.Router();

const dataRouter = require("./dataRouter");

apiRouter.use("/data", dataRouter);

module.exports = apiRouter