const express = require("express");
const store = require("../../store");
const teamsService = {
  getAllTeams() {
    return store.teams;
  },
  getTeam(teamCode) {
    return store.teams.find(team => team.teamCode === teamCode);
  },
  getTeamMembers(teamCode) {
    return store.teams.find(team => team.teamCode === teamCode).members;
  }
};

module.exports = teamsService;
