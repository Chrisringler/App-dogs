const { Router } = require("express");
const temperamentRouter = Router();
const {getTemperaments} = require("../handlers/temperamentsHandler")

temperamentRouter.get("/", getTemperaments)

module.exports = temperamentRouter;