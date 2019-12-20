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
const { checkForDuplicateEvent } = require("./teams-validators");
const { requireAuth } = require("../basic-auth");
teamsRouter.use(jsonBodyParser);
teamsRouter.use(validateBodyTypes);
//teamsRouter.use(requireAuth)

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
      .then(usernamesAndNicknames => {
        const usernamesOnly = usernamesAndNicknames.map(memberobject => {
          return memberobject.username;
        });
        teamsService
          .getNamedMembersOfTeam(req.app.get("db"), usernamesOnly)
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
    checkForDuplicateEvent,
    (req, res, next) => {
      const { date, location, outcome, roster, position, winnings } = req.body;

      teamsService.getLocationId(req.app.get("db"), location).then(id => {
        const event = { eventdate: date, eventlocation: id };
        teamsService
          .findOrInsertEvent(req.app.get("db"), event)
          .then(eventId => {
            const newResult = {
              event_id: eventId,
              winnings: winnings,
              outcome: outcome,
              position: position
            };
            teamsService
              .postResult(req.app.get("db"), newResult, req.params.team_code)
              .then(resultId => {
                usersService
                  .getUsersIds(req.app.get("db"), roster)
                  .then(ids => {
                    teamsService
                      .postAttendees(
                        req.app.get("db"),
                        ids,
                        req.params.team_code,
                        eventId
                      )
                      .then(attendeeIds => {
                        const eventIds = { eventId, resultId, attendeeIds };
                        //change numbers for wins,firstplace,secondplace,thirdplace,and winnings
                        teamsService
                          .getTeam(req.app.get("db"), req.params.team_code)
                          .then(teamArray => {
                            const teamObject = teamArray[0];
                            console.log(
                              teamObject,
                              "teamobject at begining of function"
                            );
                            let {
                              wins,
                              firstplace,
                              secondplace,
                              thirdplace,
                              winnings
                            } = teamObject;

                            if (req.body.position === "1st") {
                              firstplace++;
                            }
                            if (req.body.position === "2nd") {
                              secondplace++;
                            }
                            if (req.body.position === "3rd") {
                              thirdplace++;
                            }

                            winnings = winnings + req.body.winnings;
                            if (req.body.outcome === "Win") {
                              wins++;
                            }
                            const newStandings = {
                              wins: wins,
                              firstplace: firstplace,
                              secondplace: secondplace,
                              thirdplace: thirdplace,
                              winnings: winnings
                            };
                            console.log(
                              newStandings,
                              "newstandings at the end of the function"
                            );
                            teamsService
                              .patchTeamStandings(
                                req.app.get("db"),
                                newStandings,
                                req.params.team_code
                              )
                              .then(updatedTeam => {
                                console.log(updatedTeam);
                                const formattedTeam = updatedTeam[0];
                                const response = {
                                  ...formattedTeam,
                                  eventId: eventId,
                                  resultId: resultId,
                                  attendeeIds: attendeeIds
                                };
                                //make function that can construct a team
                                //in the format it appears in in store
                                //then return it
                                res.json(response);
                              });
                          });
                      });
                  });
              });
          });
      });
    }
  );

teamsRouter
  .route("/:team_code/info")
  .get(validateTeamExists, (req, res, next) => {
    teamsService
      .getFullTeamInfo(req.app.get("db"), req.params.team_code)
      .then(result => res.json(result));
  });

teamsRouter.route("/locations").get((req, res, next) => {
  teamsService.getLocations(req.app.get("db")).then(locations => {
    const locationNames = locations.map(location => location.locationname);
    res.json(locationNames);
  });
});

teamsRouter.route("/locations/:name").get((req, res, next) => {
  teamsService
    .getLocationId(req.app.get("db"), req.params.name)
    .then(result => {
      const id = result[0].id;
      res.json(id);
    });
});

teamsRouter.route("/locations").post((req, res, next) => {
  teamsService
    .postNewLocation(req.app.get("db"), req.body.location)
    .then(result => {
      console.log(result);
      res.json(result[0]);
    });
});
teamsRouter.route("/ids").get((req, res, next) => {
  usersService.getUsersIds(req.app.get("db"), req.body.roster).then(result => {
    res.json(result);
  });
});
teamsRouter.route("/:team_code/events/test").get((req, res, next) => {
  teamsService
    .getAllEventsForTeam(req.app.get("db"), req.params.team_code)
    .then(eventList => {
      res.json(eventList);
    });
});
teamsRouter.route("/members/test").get((req, res, next) => {
  teamsService.getMembersAndRoles(req.app.get("db"), 4).then(result => {
    res.json(result);
  });
});
teamsRouter.route("/history/test").get((req, res, next) => {
  teamsService
    .getHistory(req.app.get("db"), 1)
    .then(result => res.json(result));
});
teamsRouter.route("/attendees/test").get((req, res, next) => {
  teamsService
    .getAttendees(req.app.get("db"), [1, 2])
    .then(result => res.json(result));
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
