const teamsService = require("../src/teams/teams-service");
const userService = require("./users/users-service");

function validateBodyTypes(req, res, next) {
  const possibleStringKeys = [
    "name",
    "teamcode",
    "newname",
    "newmember",
    "username",
    "role",
    "location",
    "outcome",
    "password",
    "newusername",
    "position",
    "date",
    "nickname",
    "nickname",
    "teamname"
  ];
  const possibleNumberKeys = [
    "wins",
    "firstplace",
    "secondplace",
    "thirdplace",
    "winnings",
    "id"
  ];
  const possibleArrayKeys = ["history", "roster", "members"];
  const allPossibleKeys = [
    ...possibleStringKeys,
    ...possibleNumberKeys,
    ...possibleArrayKeys
  ];
  if (req.body && req.body !== {}) {
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if (allPossibleKeys.includes(key)) {
        if (possibleStringKeys.includes(key)) {
          if (typeof req.body[key] !== "string") {
            let err = new Error(`${key} must be a string`);
            err.status = 400;
            return next(err);
          }
        }
        if (possibleArrayKeys.includes(key)) {
          if (!Array.isArray(req.body[key])) {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            return next(err);
          }
        }
        if (possibleNumberKeys.includes(key)) {
          if (typeof req.body[key] !== "number") {
            let err = new Error(`${key} must be a number`);
            err.status = 400;
            return next(err);
          }
        }
      } else {
        let err = new Error(`Unexpected key: '${key}' in body`);
        err.status = 400;
        return next(err);
      }
    });
    return next();
  }
  next();
}

function keyValidator(requiredKeys = []) {
  return function(req, res, next) {
    //requiredKeys = req.requiredKeys;
    const keys = Object.keys(req.body) ? Object.keys(req.body) : [];
    requiredKeys.forEach(key => {
      if (!keys.includes(key)) {
        let err = new Error(`Missing key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
    });
    keys.forEach(key => {
      if (req.body[key] === "" || undefined) {
        let err = new Error(`Empty key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
      
      if (!requiredKeys.includes(key)) {
        let err = new Error(`Unnecessary key '${key}' in request body`);
        err.status = 400;
        next(err);
      }
    });
    next();
  };
}

function validateUserExists(req, res, next) {
  const userName = req.params.user_name
    ? req.params.user_name
    : req.body.username;

  userService.userExists(req.app.get("db"), userName).then(id => {
    if (!id.length) {
      let err = new Error("User does not exist");
      err.status = 404;
      return next(err);
    }
  });
  next();
}
function validateTeamExists(req, res, next) {
  const team = req.params.team_code ? req.params.team_code : req.body.teamcode;

  const knexinstance = req.app.get("db");
  teamsService.doesExist(knexinstance, team).then(id => {
    if (!id.length) {
      let err = new Error("Team Does Not Exist");
      err.status = 404;
      return next(err);
    }

    return next();
  });
}

function serverError(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Unknown server error";
  return res.status(status).json({
    error: message
  });
}

function validateDuplicateTeammate(req, res, next) {
  const user = req.body.username;
  teamsService
    .getTeamMembers(req.app.get("db"), req.params.team_code)
    .then(members => {
      const memberUserNames = members.map(member => member.username);
      if (memberUserNames.includes(user)) {
        let err = new Error("Player is already on team");
        err.status = 406;
        return next(err);
      }
      next();
    });
}
module.exports = {
  validateBodyTypes,
  keyValidator,
  validateUserExists,
  validateTeamExists,
  serverError,
  validateDuplicateTeammate
};
