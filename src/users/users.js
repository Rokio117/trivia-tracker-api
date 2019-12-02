const express = require("express");
const userService = require("./users-service");
const usersRouter = express.Router();

usersRouter.route("/").get((req, res, next) => {
  res.json(userService.getAllusers());
});

usersRouter.route("/:user_name").get((req, res, next) => {
  if (!userService.userExists(req.params.user_name)) {
    res.status(404).json({ error: "User does not exist" });
  } else {
    res.json(userService.getUser(req.params.user_name));
  }
});

module.exports = usersRouter;
