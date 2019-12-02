require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const data = require("./data");
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const teamsRouter = require("./users/teams/teams");
const PORT = process.env.PORT || 3000;
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));

app.use("/api/teams", teamsRouter);

app.get("/api/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
