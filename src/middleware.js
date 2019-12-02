const express = require("express");

function teamExists(req, res, next) {
  teamCode = req.params.team_code;
  exists = store.teams.map(team => team.teamCode === teamCode).includes(true);
  if (!exists) {
    return res.status(404).json({ error: "Team Does Not Exist" });
  }
}

module.exports = teamExists;
