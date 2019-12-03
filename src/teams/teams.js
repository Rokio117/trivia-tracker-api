const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();
const jsonBodyParser = express.json();
const usersService = require("../users/users-service");
teamsRouter
  .route("/")
  .get((req, res, next) => {
    res.json(teamsService.getAllTeams());
  })
  .post(jsonBodyParser, (req, res, next) => {
    const {
      name,
      teamCode,
      members,
      wins,
      firstPlace,
      secondPlace,
      thirdPlace,
      winnings,
      history
    } = req.body;
    const newTeam = {
      name: name,
      teamCode: teamCode,
      members: members,
      wins: wins,
      firstPlace: firstPlace,
      secondPlace: secondPlace,
      thirdPlace: thirdPlace,
      winnings: winnings,
      history: history
    };
    console.log(newTeam, "newTeam in post /");
    for (const [key, value] of Object.entries(newTeam))
      if (value == (null || "" || undefined))
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    if (teamsService.doesExist(teamCode)) {
      return res.status(400).json({
        error: "teamCode is taken"
      });
    }
    teamsService.postNewTeam(newTeam);
    res.json(teamsService.getTeam(teamCode));
  });

teamsRouter
  .route("/:team_code/team")
  .get((req, res, next) => {
    if (!teamsService.doesExist(req.params.team_code)) {
      return res.status(404).json({
        error: "Team Does Not Exist"
      });
    } else {
      res.json(teamsService.getTeam(req.params.team_code));
    }
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const teamCode = req.params.team_code;
    const newName = req.body.newName;
    if (newName === "" || undefined) {
      return res.status(400).json({ error: "no name submitted" });
    }
    if (!teamsService.doesExist(teamCode)) {
      return res.status(400).json({ errror: "Team doesn't exist" });
    }
    teamsService.changeTeamName(newName, teamCode);
    return res.json(teamsService.getTeam(teamCode));
  });

teamsRouter
  .route("/:team_code/members")
  .get((req, res, next) => {
    if (!teamsService.doesExist(req.params.team_code)) {
      return res.status(404).json({
        error: "Team Does Not Exist"
      });
    } else {
      res.json(teamsService.getTeamMembers(req.params.team_code));
    }
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { newMember, role } = req.body;
    if (!teamsService.doesExist(req.params.team_code)) {
      return res.status(404).json({
        error: "Team Does Not Exist"
      });
    }
    if (!teamsService.userExists(newMember)) {
      return res.status(400).json({
        error: "user does not exist"
      });
    }
    const allowedRoles = ["Guest", "Member", "Reporter", "Captain"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        error: "Role must be one of Guest, Captain, Reporter, or Member"
      });
    }
    teamsService.addToTeam(newMember, req.params.team_code, role);
    res.json(teamsService.getTeamMembers(req.params.team_code));
  });

teamsRouter
  .route("/:team_code/:user_name/role")
  .get((req, res, next) => {
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
  })
  .patch(jsonBodyParser, (req, res, next) => {
    console.log(req.params);
    const teamCode = req.params.team_code;
    const userName = req.params.user_name;
    const role = req.body.role;
    if (!teamsService.doesExist(teamCode)) {
      return res.status(404).json({
        error: "Team does not exist"
      });
    }
    if (!usersService.userExists(userName)) {
      return res.status(404).json({
        error: "user does not exist"
      });
    }
    const allowedRoles = ["Guest", "Member", "Reporter", "Captain"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        error: "Role must be one of Guest, Captain, Reporter, or Member"
      });
    }
    teamsService.changeRole(userName, role, teamCode);
    res.json(teamsService.getRoleOfMember(userName, teamCode));
  });

teamsRouter.route("/:team_code/names").get((req, res, next) => {
  const members = teamsService.getTeamMembers(req.params.team_code);
  if (!teamsService.doesExist(req.params.team_code)) {
    return res.status(404).json({
      error: "Team Does Not Exist"
    });
  } else {
    res.json(teamsService.getNamedMembersOfTeam(members));
  }
});

teamsRouter
  .route("/:team_code/winnings")
  .patch(jsonBodyParser, (req, res, next) => {
    console.log(req.body);
    console.log(typeof req.body.winnings);
    if (!teamsService.doesExist(req.params.team_code)) {
      return res.status(404).json({
        error: "Team Does Not Exist"
      });
    }
    if (req.body === (null || undefined)) {
      return res.status(400).json({
        error: "Missing key 'winnings' in request body"
      });
    }
    const winnings = req.body.winnings;
    if (typeof winnings !== "number") {
      return res.status(400).json({
        error: "winnings must be a number"
      });
    }
    teamsService.changeWinnings(winnings, req.params.team_code);
    res.json(teamsService.getTeam(req.params.team_code));
  });

teamsRouter
  .route("/:team_code/event")
  .post(jsonBodyParser, (req, res, next) => {
    const { date, location, outcome, roster, position, winnings } = req.body;

    const newEvent = {
      date: date,
      location: location,
      outcome: outcome,
      roster: roster,
      position: position,
      winnings: winnings
    };
    for (const [key, value] of Object.entries(newEvent))
      if (value == (null || "" || undefined))
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
  });

module.exports = teamsRouter;
