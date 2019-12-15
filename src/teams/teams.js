const express = require("express");
const teamsService = require("./teams-service");
const teamsRouter = express.Router();
const jsonBodyParser = express.json();
const usersService = require("../users/users-service");

const { validateBodyTypes } = require("../middleware");

const { keyValidator } = require("../middleware");
const { validateUserExists } = require("../middleware");
const { validateTeamExists } = require("../middleware");
const { serverError } = require("../middleware");
const { validateEvent } = require("./teams-validators");
teamsRouter.use(jsonBodyParser);
teamsRouter.use(validateBodyTypes);

teamsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    //res.json(teamsService.getAllTeams());
    teamsService.getAllTeams(knexInstance).then(teams => {
      res.json(teams);
    });
  })
  .post(
    validateTeamNoExists,
    keyValidator([
      "teamname",
      "teamcode",
      "wins",
      "firstplace",
      "secondplace",
      "thirdplace",
      "winnings"
    ]),
    (req, res, next) => {
      const {
        teamname,
        teamcode,
        wins,
        firstplace,
        secondplace,
        thirdplace,
        winnings
      } = req.body;
      const newteam = {
        teamname: teamname,
        teamcode: teamcode,
        wins: wins,
        firstplace: firstplace,
        secondplace: secondplace,
        thirdplace: thirdplace,
        winnings: winnings
      };
      teamsService.postNewTeam(req.app.get("db"), newteam).then(team => {
        res.json(team);
      });
    }
  );
//teamsRouter.route("/:team_code/*").get(validateTeamcode);
//teamsRouter.route("/:team_code/*").all(validateTeamcode);
teamsRouter
  .route("/:team_code/team")
  .get(validateTeamExists, (req, res, next) => {
    res.json(teamsService.getTeam(req.params.team_code));
  })
  .patch(
    validateTeamExists,

    keyValidator(["newname"]),
    (req, res, next) => {
      const teamcode = req.params.team_code;
      const newname = req.body.newname;
      teamsService.changeTeamName(newname, teamcode);
      return res.json(teamsService.getTeam(teamcode));
    }
  );

teamsRouter
  .route("/:team_code/members")
  .get(validateTeamExists, () => (req, res, next) => {
    res.json(teamsService.getTeamMembers(req.params.team_code));
  })
  .post(
    validateTeamExists,
    validateUserExists,

    keyValidator(["newMember", "role"]),
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

    keyValidator(["role"]),
    validateRole,
    (req, res, next) => {
      const teamcode = req.params.team_code;
      const username = req.params.user_name;
      const role = req.body.role;
      teamsService.changeRole(username, role, teamcode);
      res.json(teamsService.getRoleOfMember(username, teamcode));
    }
  );

teamsRouter
  .route("/:team_code/names")
  .get(validateTeamExists, (req, res, next) => {
    const members = teamsService.getTeamMembers(req.params.team_code);

    res.json(teamsService.getNamedMembersOfTeam(members));
  });

teamsRouter.route("/:team_code/winnings").patch(
  validateTeamExists,

  keyValidator(["winnings"]),
  (req, res, next) => {
    const winnings = req.body.winnings;
    teamsService.changeWinnings(winnings, req.params.team_code);
    res.json(teamsService.getTeam(req.params.team_code));
  }
);

teamsRouter.route("/:team_code/event").post(
  validateTeamExists,

  keyValidator([
    "date",
    "location",
    "outcome",
    "roster",
    "position",
    "winnings"
  ]),
  validateEvent,
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

function validateTeamNoExists(req, res, next) {
  teamsService.doesExist(req.app.get("db"), req.body.teamcode).then(team => {
    console.log("team after doesExist", team);
    if (team.length) {
      let err = new Error("Team code is taken");
      err.status = 400;
      return next(err);
    }
    return next();
  });
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

teamsRouter.use(serverError);
module.exports = teamsRouter;
