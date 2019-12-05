const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();
const jsonBodyParser = express.json();
const usersService = require("../users/users-service");
const { validatePatchTeamCodeTeam } = require("./teams-validators");

const { validatePostSlash } = require("./teams-validators");
const { validateBodyTypes } = require("../middleware");
const { validatePostTeamCodeMembers } = require("./teams-validators");
const { validatePatchTeamCodeUserNameRole } = require("./teams-validators");
const { validatePatchTeamCodeWinnings } = require("./teams-validators");
const { validatePostTeamCodeEvent } = require("./teams-validators");
const { keyValidator } = require("./teams-validators");
teamsRouter.use(jsonBodyParser);
teamsRouter.use(validateBodyTypes);
//teamsRouter.route("/*").all(validateBodyTypes);
teamsRouter
  .route("/")
  .get((req, res, next) => {
    res.json(teamsService.getAllTeams());
  })
  .post(
    validatePostSlash,
    validateTeamNoExists,
    keyValidator,
    (req, res, next) => {
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
      teamsService.postNewTeam(newTeam);
      res.json(teamsService.getTeam(teamCode));
    }
  );
//teamsRouter.route("/:team_code/*").get(validateTeamCode);
//teamsRouter.route("/:team_code/*").all(validateTeamCode);
teamsRouter
  .route("/:team_code/team")
  .get(validateTeamExists, (req, res, next) => {
    res.json(teamsService.getTeam(req.params.team_code));
  })
  .patch(
    validateTeamExists,
    validatePatchTeamCodeTeam,
    keyValidator,
    (req, res, next) => {
      const teamCode = req.params.team_code;
      const newName = req.body.newName;
      teamsService.changeTeamName(newName, teamCode);
      return res.json(teamsService.getTeam(teamCode));
    }
  );

teamsRouter
  .route("/:team_code/members")
  .get(validateTeamExists, (req, res, next) => {
    res.json(teamsService.getTeamMembers(req.params.team_code));
  })
  .post(
    validateTeamExists,
    validateUserExists,
    validatePostTeamCodeMembers,
    keyValidator,
    validateRole,
    (req, res, next) => {
      const { newMember, role } = req.body;
      teamsService.addToTeam(newMember, req.params.team_code, role);
      res.json(teamsService.getTeamMembers(req.params.team_code));
    }
  );

teamsRouter
  .route("/:team_code/:user_name/role")
  .get(validateTeamExists, validateUserExists, (req, res, next) => {
    res.json(
      teamsService.getRoleOfMember(req.params.user_name, req.params.team_code)
    );
  })
  .patch(
    validateTeamExists,
    validateUserExists,
    validatePatchTeamCodeUserNameRole,
    keyValidator,
    validateRole,
    (req, res, next) => {
      const teamCode = req.params.team_code;
      const userName = req.params.user_name;
      const role = req.body.role;
      teamsService.changeRole(userName, role, teamCode);
      res.json(teamsService.getRoleOfMember(userName, teamCode));
    }
  );

teamsRouter
  .route("/:team_code/names")
  .get(validateTeamExists, (req, res, next) => {
    const members = teamsService.getTeamMembers(req.params.team_code);

    res.json(teamsService.getNamedMembersOfTeam(members));
  });

teamsRouter
  .route("/:team_code/winnings")
  .patch(
    validateTeamExists,
    validatePatchTeamCodeWinnings,
    keyValidator,
    (req, res, next) => {
      const winnings = req.body.winnings;
      teamsService.changeWinnings(winnings, req.params.team_code);
      res.json(teamsService.getTeam(req.params.team_code));
    }
  );

teamsRouter
  .route("/:team_code/event")
  .post(
    validateTeamExists,
    validatePostTeamCodeEvent,
    keyValidator,
    (req, res, next) => {
      const { date, location, outcome, roster, position, winnings } = req.body;
      const newEvent = {
        date: date,
        location: location,
        outcome: outcome,
        roster: roster,
        position: position,
        winnings: winnings
      };
      teamsService.addEvent(newEvent, req.params.team_code);
      res.json(teamsService.getTeam(req.params.team_code).history);
    }
  );

function validateTeamExists(req, res, next) {
  req.team = teamsService.getTeam(req.params.team_code);
  if (!req.team) {
    let err = new Error("Team Does Not Exist");
    err.status = 404;
    next(err);
  }

  next();
}
function validateTeamNoExists(req, res, next) {
  const exists = teamsService.doesExist(req.body.teamCode);
  if (exists) {
    let err = new Error("Team code is taken");
    err.status = 400;
    next(err);
  }
  next();
}

function teamError(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Unknown server error";
  return res.status(status).json({
    error: message
  });
}
function validateUserExists(req, res, next) {
  if (req.params.user_name) {
    if (!usersService.userExists(req.params.user_name)) {
      let err = new Error("User does not exist");
      err.status = 404;
      next(err);
    }
  }

  if (req.body.newMember) {
    if (!usersService.userExists(req.body.newMember)) {
      let err = new Error("User does not exist");
      err.status = 404;
      next(err);
    }
  }
  next();
}
function validateRole(req, res, next) {
  const role = req.body.role;
  const allowedRoles = ["Guest", "Member", "Reporter", "Captain"];
  if (!allowedRoles.includes(role)) {
    let err = new Error(
      "Role must be one of Guest, Captain, Reporter, or Member"
    );
    err.status = 400;
    next(err);
  }
  next();
}

teamsRouter.use(teamError);
module.exports = teamsRouter;
