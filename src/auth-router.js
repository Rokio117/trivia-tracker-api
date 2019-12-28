const express = require("express");
const jsonBodyParser = express.json();
const authRouter = express.Router();
const { keyValidator } = require("./middleware");
const { validateBodyTypes } = require("./middleware");
const usersService = require("../src/users/users-service");
const { AuthService } = require("./authService");

authRouter.post(
  `/login`,
  jsonBodyParser,
  validateBodyTypes,
  keyValidator(["username", "password"]),

  (req, res, next) => {
    const { username, password } = req.body;
    const loginUser = { username, password };

    usersService.getUser(req.app.get("db"), loginUser.username).then(user => {
      if (!user) {
        let err = new Error("Incorrect username or password 1");
        err.status = 400;
        return next(err);
      } else {
        if (user[0].password !== loginUser.password) {
          let err = new Error("Incorrect username or password 2");
          err.status = 400;
          return next(err);
        }
        const sub = loginUser.username;
        const payload = { userid: user[0].id };
        console.log(sub, payload, "sub and payload");
        res.send({
          authToken: AuthService.createJwt(sub, payload)
        });
      }
    });
  }
);

module.exports = authRouter;
