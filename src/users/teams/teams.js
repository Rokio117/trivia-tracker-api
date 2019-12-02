const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();

// teamsRouter.route("/").get((req, res, next) => {
//   res.json(teamsService.getAllTeams());
// });

teamsRouter.route("/:team_code").get((req, res, next) => {
  console.log(req.params, "req.params");
  const exists = teamsService.doesExist(req.params.team_code);
  console.log(exists);
  if (!exists) {
    return res.status(404).json({
      error: "Team Does Not Exist"
    });
  } else {
    res.json(teamsService.getTeam(req.params.team_code));
  }
});

module.exports = teamsRouter;
