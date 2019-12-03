const express = require("express");
const userService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const teamService = require("../teams/teams-service");
usersRouter
  .route("/")
  .get((req, res, next) => {
    res.json(userService.getAllusers());
  })
  .post(jsonBodyParser, (req, res, next) => {
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
    if (userService.userExists(userName)) {
      return res.status(400).json({ error: "User already exists" });
    }

    userService.postNewUserNoTeam(newUser);
    return res.json(userService.getAllusers());
  });

usersRouter
  .route("/:user_name")
  .get((req, res, next) => {
    if (!userService.userExists(req.params.user_name)) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      res.json(userService.getUser(req.params.user_name));
    }
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { newUserName } = req.body;
    const newUser = {
      userName: newUserName
    };
    if (!userService.userExists(req.params.user_name)) {
      return res.status(404).json({ error: "User does not exist" });
    }
    for (const [key, value] of Object.entries(newUser))
      if (value == (null || ""))
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    userService.changeUserName(newUser.userName, req.params.user_name);
    return res.json(userService.getAllusers());
  });

usersRouter
  .route("/:user_name/name")
  .get((req, res, next) => {
    if (!userService.userExists(req.params.user_name)) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      res.json(userService.getNameFromUserName(req.params.user_name));
    }
  })
  .patch(jsonBodyParser, (req, res, next) => {
    if (!userService.userExists(req.params.user_name)) {
      return res.status(404).json({
        error: "User does not exist"
      });
    }
    if (!req.body.name || req.body.name === "") {
      res.status(404).json({ error: "Missing name in request body" });
    }
    userService.changePlayerName(req.body.name, req.params.user_name);
    res.json(userService.getUser(req.params.user_name));
  });

usersRouter
  .route("/:user_name/teams")
  .get((req, res, next) => {
    if (!userService.userExists(req.params.user_name)) {
      res.status(404).json({ error: "User does not exist" });
    } else {
      res.json(userService.getUserTeams(req.params.user_name));
    }
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { name, password, teamCode } = req.body;
    console.log(name, password, teamCode, req.params.user_name);
    const newUser = {
      userName: req.params.user_name,
      name: name.name,
      password: password.password
    };

    if (userService.userExists(req.params.user_name)) {
      res.status(404).json({ error: "UserName is taken" });
    }
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

usersRouter.route("/:user_name/profile").get((req, res, next) => {
  if (!userService.userExists(req.params.user_name)) {
    res.status(404).json({ error: "User does not exist" });
  } else {
    res.json(userService.getUserProfile(req.params.user_name));
  }
});

module.exports = usersRouter;
