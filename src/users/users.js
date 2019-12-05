const express = require("express");
const userService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const teamService = require("../teams/teams-service");

//usersRouter.use(validateParamTypes);
usersRouter.use(jsonBodyParser);
usersRouter.use(validateBodyTypes);
usersRouter.use(usersError);
usersRouter
  .route("/")
  .get((req, res, next) => {
    res.json(userService.getAllusers());
  })
  .post(validateDuplicateUser, (req, res, next) => {
    console.log(req.body);
    const { userName, name, password } = req.body;
    const newUser = {
      userName: userName,
      name: name,
      password: password
    };

    for (const [key, value] of Object.entries(newUser))
      if (value == (null || ""))
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    userService.postNewUserNoTeam(newUser);
    return res.json(userService.getAllusers());
  });

usersRouter
  .route("/:user_name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUser(req.params.user_name));
  })
  .patch(validateUserExists, (req, res, next) => {
    const { newUserName } = req.body;
    const newUser = {
      userName: newUserName
    };

    for (const [key, value] of Object.entries(newUser))
      if (value == null || "")
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    userService.changeUserName(newUser.userName, req.params.user_name);
    return res.json(userService.getAllusers());
  });

usersRouter
  .route("/:user_name/name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getNameFromUserName(req.params.user_name));
  })
  .patch(jsonBodyParser, validateUserExists, (req, res, next) => {
    if (!req.body.name || req.body.name === "") {
      res.status(404).json({ error: "Missing name in request body" });
    }
    userService.changePlayerName(req.body.name, req.params.user_name);
    res.json(userService.getUser(req.params.user_name));
  });

usersRouter
  .route("/:user_name/teams")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUserTeams(req.params.user_name));
  })
  .post(validateDuplicateUser, (req, res, next) => {
    const { name, password, teamCode } = req.body;
    console.log(name, password, teamCode, req.params.user_name);
    const newUser = {
      userName: req.params.user_name,
      name: name.name,
      password: password.password
    };

    for (const [key, value] of Object.entries(newUser))
      if (value == (null || ""))
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    if (!teamCode || teamCode === "") {
      return res.status(400).json({
        error: "Missing teamCode in request body"
      });
    } else if (!teamService.doesExist(teamCode)) {
      return res.status(400).json({ error: "Team does not exist" });
    }
    userService.postUserWithTeam(newUser, teamCode);
    res.json(userService.getUserTeams(req.params.user_name));
  });

usersRouter
  .route("/:user_name/profile")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUserProfile(req.params.user_name));
  });

function validateUserExists(req, res, next) {
  req.user = userService.userExists(req.params.user_name);
  if (!req.user) {
    let err = new Error("User does not exist");
    err.status = 404;
    next(err);
  }
  next();
}

function validateDuplicateUser(req, res, next) {
  req.user = userService.userExists(req.params.user_name);
  if (req.user) {
    let err = new Error("User name already exists");
    err.status = 400;
    next(err);
  }
  next();
}

function validateParamTypes(req, res, next) {
  const keys = Object.keys(req.params);
  keys.forEach(key => {
    if (key === "team_code" || "user_name") {
      if (typeof req.params[key] !== "string") {
        let err = new Error(` ${key} must be a string`);
        err.status = 400;
        next(err);
      }
      next();
    }
  });
}

function usersError(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Unknown server error";
  return res.status(status).json({
    error: message
  });
}

function validateBodyTypes(req, res, next) {
  const possibleStringKeys = [
    "name",
    "teamCode",
    "newName",
    "newMember",
    "userName",
    "role",
    "location",
    "outcome",
    "password",
    "newUserName",
    "position",
    "date"
  ];
  const possibleNumberKeys = [
    "wins",
    "firstPlace",
    "secondPlace",
    "thirdPlace",
    "winnings"
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
            next(err);
          }
        }
        if (possibleArrayKeys.includes(key)) {
          if (typeof req.body[key] !== "array") {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            next(err);
          }
        }
        if (possibleNumberKeys.includes(key)) {
          if (typeof req.body[key] !== "number") {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            next(err);
          }
        }
      } else {
        let err = new Error(`Incorrect key: ${key} in body`);
        err.status = 400;
        next(err);
      }
    });
    next();
  }
  next();
}
module.exports = usersRouter;
