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
        .postNewUser(knexInstance, newUser)
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
    userService
      .getNameFromUsername(req.app.get("db"), req.params.user_name)
      .then(nickname => {
        res.json(nickname);
      });
  })
  .patch(keyValidator(["nickname"]), validateUserExists, (req, res, next) => {
    userService
      .changePlayerName(
        req.app.get("db"),
        req.body.nickname,
        req.params.user_name
      )
      .then(user => {
        return res.json(user);
      });
  });

usersRouter
  .route("/:user_name/teams")
  .get(validateUserExists, (req, res, next) => {
    userService.getUserId(req.app.get("db"), req.params.user_name).then(id => {
      userService.getUserTeams(req.app.get("db"), id[0].id).then(teamIds => {
        userService.getTeamInfo(req.app.get("db"), teamIds).then(result => {
          res.json(result);
        });
      });
    });
  })
  .post(
    keyValidator(["nickname", "password", "teamcode"]),
    validateDuplicateUser,
    validateTeamExists,
    (req, res, next) => {
      const { nickname, password, teamcode } = req.body;
      const newUser = {
        username: req.params.user_name,
        nickname: nickname,
        password: password
      };

      //1 validations check
      //2 post user check
      //3 get assigned user id check
      //4 using id post user/team relationship to members check
      //5 GET user teams
      //6 send team information
      userService.postNewUser(req.app.get("db"), newUser).then(user => {
        teamService
          .addToTeam(req.app.get("db"), user[0].id, teamcode, "Member")
          .then(response => {
            console.log("ran");
            res.status(200).json(response);
          });
      });
    }
  );

usersRouter.use(serverError);

function validateUserExists(req, res, next) {
  console.log(
    req.params.user_name,
    "req.params.user_name in validateUserExists"
  );
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
  console.log("username in validate duplicateuser", username);
  userService.userExists(req.app.get("db"), username).then(id => {
    //console.log(id, "id in validate duplicate");
    if (id.length) {
      //console.log("went error path");
      let err = new Error("User name already exists");
      err.status = 400;
      return next(err);
    }
    //console.log("went middle path");
    return next();
  });
}

module.exports = usersRouter;
