const express = require("express");
const joinsRouter = express.Router();
const joinsPractice = require("./joins-practice");

joinsRouter.route("/members/:team_id").get((req, res, next) => {
  joinsPractice
    .membersOfTeam(req.app.get("db"), req.params.team_id)
    .then(result => {
      res.json(result);
    });
});

joinsRouter.route("/teams/:player_id").get((req, res, next) => {
  joinsPractice
    .teamsOfPlayer(req.app.get("db"), req.params.player_id)
    .then(result => {
      res.json(result);
    });
});

joinsRouter.route("/names").get((req, res, next) => {
  joinsPractice.names(req.app.get("db")).then(names => res.json(names));
});

module.exports = joinsRouter;
