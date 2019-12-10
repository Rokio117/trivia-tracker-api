const express = require("express");
const userService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const teamService = require("../teams/teams-service");
const { validateBodyTypes } = require("../middleware");
const { keyValidator } = require("../middleware");
const { serverError } = require("../middleware");
const { validateTeamExists } = require("../middleware");
//usersRouter.use(validateParamTypes);
usersRouter.use(jsonBodyParser);
usersRouter.use(validateBodyTypes);
usersRouter.use(serverError);

const knexInstance = req.app.get("db");
usersRouter
  .route("/")
  .get((req, res, next) => {
    //res.json(userService.getAllusers());
    userService.getAllusers(knexInstance).then(users => {
      res.json(users);
    });
  })
  .post(
    keyValidator(["userName", "name", "password"]),
    validateDuplicateUser,
    (req, res, next) => {
      console.log(req.body);
      const { userName, name, password } = req.body;
      const newUser = {
        userName: userName,
        name: name,
        password: password
      };
      userService.postNewUserNoTeam(newUser);
      res.json(userService.getAllusers());
    }
  );

usersRouter
  .route("/:user_name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUser(req.params.user_name));
  })
  .patch(
    keyValidator(["newUserName"]),
    validateUserExists,
    (req, res, next) => {
      const { newUserName } = req.body;
      userService.changeUserName(newUserName, req.params.user_name);
      res.json(userService.getAllusers());
    }
  );

usersRouter
  .route("/:user_name/name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getNameFromUserName(req.params.user_name));
  })
  .patch(keyValidator(["name"]), validateUserExists, (req, res, next) => {
    userService.changePlayerName(req.body.name, req.params.user_name);
    res.json(userService.getUser(req.params.user_name));
  });

usersRouter
  .route("/:user_name/teams")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getUserTeams(req.params.user_name));
  })
  .post(
    keyValidator(["name", "password", "teamCode"]),
    validateDuplicateUser,
    validateTeamExists,
    (req, res, next) => {
      const { name, password, teamCode } = req.body;
      const newUser = {
        userName: req.params.user_name,
        name: name.name,
        password: password.password
      };

      //validate team exists
      userService.postUserWithTeam(newUser, teamCode);
      res.json(userService.getUserTeams(req.params.user_name));
    }
  );

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

module.exports = usersRouter;
