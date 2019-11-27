const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();

teamsRouter.route("/").get((req, res, next) => {});

module.exports = teamsRouter;
