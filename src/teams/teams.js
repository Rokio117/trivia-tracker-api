const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();

// teamsRouter.route("/").get((req, res, next) => {
//   res.json(teamsService.getAllTeams());
// });

teamsRouter.route("/:team_code/team").get((req, res, next) => {
  if (!teamsService.doesExist(req.params.team_code)) {
    return res.status(404).json({
      error: "Team Does Not Exist"
    });
  } else {
    res.json(teamsService.getTeam(req.params.team_code));
  }
});

teamsRouter.route("/:team_code/members").get((req, res, next) => {
  if (!teamsService.doesExist(req.params.team_code)) {
    return res.status(404).json({
      error: "Team Does Not Exist"
    });
  } else {
    res.json(teamsService.getTeamMembers(req.params.team_code));
  }
});

teamsRouter.route("/:team_code/:user_name/role").get((req, res, next) => {
  console.log(req.params);
  const teamExists = teamsService.doesExist(req.params.team_code);
  const userExists = teamsService.userExists(req.params.user_name);
  if (!teamExists) {
    return res.status(404).json({
      error: "Team does not exist"
    });
  }
  if (!userExists) {
    return res.status(404).json({
      error: "User does not exist"
    });
  }
  if (teamExists && userExists) {
    res.json(
      teamsService.getRoleOfMember(req.params.user_name, req.params.team_code)
    );
  }
});

module.exports = teamsRouter;
