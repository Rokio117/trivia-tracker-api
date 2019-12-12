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

usersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    //res.json(userService.getAllusers());
    userService.getAllusers(knexInstance).then(users => {
      console.log("res.json users ran");
      res.json(users);
    });
  })
  .post(
    keyValidator(["username", "nickname", "password"]),
    validateDuplicateUser,
    (req, res, next) => {
      const knexInstance = req.app.get("db");
      const { username, nickname, password } = req.body;
      const newUser = {
        username: username,
        nickname: nickname,
        password: password
      };
      userService
        .postNewUserNoTeam(knexInstance, newUser)
        .then(response => res.json(response));
      //res.json(userService.getAllusers(knexInstance));
    }
  );

usersRouter
  .route("/:user_name")
  .get(validateUserExists, (req, res, next) => {
    //res.json(userService.getUser(req.app.get("db"), req.params.user_name));
    userService
      .getUser(req.app.get("db"), req.params.user_name)
      .then(result => {
        res.json(result);
      });
  })
  .patch(
    keyValidator(["newusername"]),
    validateUserExists,
    (req, res, next) => {
      const newusername = req.body.newusername;
      userService
        .changeUsername(req.app.get("db"), req.params.user_name, newusername)
        .then(response => {
          res.json(response);
        });
    }
  );

usersRouter
  .route("/:user_name/name")
  .get(validateUserExists, (req, res, next) => {
    res.json(userService.getNameFromUsername(req.params.user_name));
  })
  .patch(keyValidator(["nickname"]), validateUserExists, (req, res, next) => {
    userService.changePlayerName(req.body.name, req.params.user_name);
    res.json(userService.getUser(req.params.user_name));
  });

usersRouter
  .route("/:user_name/teams")
  .get(validateUserExists, (req, res, next) => {
    userService
      .getUserTeams(req.app.get("db"), req.params.user_name)
      .then(response => {
        console.log(response);
        res.json(response);
      });
  })
  .post(
    keyValidator(["name", "password", "teamCode"]),
    validateDuplicateUser,
    validateTeamExists,
    (req, res, next) => {
      const { name, password, teamCode } = req.body;
      const newUser = {
        username: req.params.user_name,
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

usersRouter.use(serverError);

function validateUserExists(req, res, next) {
  userService.userExists(req.app.get("db"), req.params.user_name).then(id => {
    console.log(id, "id in validateUserExists");
    if (!id.length) {
      let err = new Error("User does not exist");
      err.status = 404;
      return next(err);
    }
    next();
  });
}

function validateDuplicateUser(req, res, next) {
  console.log("validateDuplicateUser ran");
  //req.user = userService.userExists(req.app.get("db"), req.params.user_name);

  const username = req.params.user_name
    ? req.params.user_name
    : req.body.username;
  userService.userExists(req.app.get("db"), username).then(id => {
    if (id.length) {
      let err = new Error("User name already exists");
      err.status = 400;
      return next(err);
    }
  });

  next();
}

module.exports = usersRouter;
