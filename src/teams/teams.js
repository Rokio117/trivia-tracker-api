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
const joinsPractice = require("./joins-practice");
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
    teamsService.getTeam(req.app.get("db"), req.params.team_code).then(team => {
      res.json(team);
    });
  })
  .patch(
    validateTeamExists,

    keyValidator(["newname"]),
    (req, res, next) => {
      const teamcode = req.params.team_code;
      const newname = req.body.newname;
      teamsService
        .changeTeamName(req.app.get("db"), newname, teamcode)
        .then(team => {
          console.log("team after helper function", team);
          res.json(team);
        });
    }
  );

teamsRouter
  .route("/:team_code/members")
  .get(validateTeamExists, (req, res, next) => {
    teamsService
      .getTeamMembers(req.app.get("db"), req.params.team_code)
      .then(members => {
        res.json(members);
      });
  })
  .post(
    validateTeamExists,
    validateUserExists,

    keyValidator(["username", "role"]),
    validateRole,
    (req, res, next) => {
      const { username, role } = req.body;
      usersService.getUserId(req.app.get("db"), username).then(userid => {
        teamsService
          .addToTeam(
            req.app.get("db"),
            userid[0].id,
            req.params.team_code,
            role
          )
          .then(members => {
            console.log(members);
            res.json(members);
          });
      });
    }
  );

teamsRouter
  .route("/:team_code/:user_name/role")
  .get(validateTeamExists, validateUserExists, (req, res, next) => {
    usersService
      .getUserId(req.app.get("db"), req.params.user_name)
      .then(userId => {
        teamsService
          .getRoleOfMember(
            req.app.get("db"),
            userId[0].id,
            req.params.team_code
          )
          .then(role => {
            console.log(role, "role before res.json");
            res.json(role);
          });
      });
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
      usersService.getUserId(req.app.get("db"), username).then(username => {
        teamsService
          .changeRole(req.app.get("db"), username[0].id, role, teamcode)
          .then(result => {
            res.json(result);
          });
      });
    }
  );

teamsRouter
  .route("/:team_code/names")
  .get(validateTeamExists, (req, res, next) => {
    teamsService
      .getTeamMembers(req.app.get("db"), req.params.team_code)
      .then(usernames => {
        teamsService
          .getNamedMembersOfTeam(req.app.get("db"), usernames)
          .then(nicknames => {
            const nicknameList = nicknames.map(nickname => nickname.nickname);
            res.json(nicknameList);
          });
      });

    //res.json(teamsService.getNamedMembersOfTeam(members));
  });

teamsRouter.route("/:team_code/winnings").patch(
  validateTeamExists,

  keyValidator(["winnings"]),
  (req, res, next) => {
    const winnings = req.body.winnings;
    teamsService
      .changeWinnings(req.app.get("db"), winnings, req.params.team_code)
      .then(team => {
        console.log(team);
        res.json(team);
      });
  }
);

teamsRouter
  .route("/:team_code/event")
  .post(
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
      teamsService.getLocations(req.app.get("db")).then(locations => {
        let locationNames = locations.map(
          locationObject => locationObject.locationname
        );
        let teamId;
        if (locationNames.includes(newEvent.location)) {
          teamsService.getLocationId(req.app.get("db"), locations).then(id => {
            let teamId = id;
            return teamId;
          });
        } else
          return teamsService
            .postNewLocation(req.app.get("db"), newEvent.location)
            .then(id => {
              let teamId = id[0].id;
              return teamId;
            });
        console.log(teamId);
        res.json(teamId);
      });
    }
  );

teamsRouter.route("/locations").get((req, res, next) => {
  teamsService.getLocations(req.app.get("db")).then(locations => {
    const locationNames = locations.map(location => location.locationname);
    res.json(locationNames);
  });
});

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
