const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();

teamsRouter
  .route("/")
  .get((req, res, next) => {
    console.log("get /api/teams ran");
    teamsService.getAllTeams();
  })
  .then(teams => res.status(200).json(teams));

teamsRouter
  .route("/:team_code")
  .get((req, res, next) => {
    console.log(req.params);
    teamsService.getTeam(req.params.team_code);
  })
  .then(team => {
    res.json(team);
  })
  .catch(next);

module.exports = teamsRouter;
