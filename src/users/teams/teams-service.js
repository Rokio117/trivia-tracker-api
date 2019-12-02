const express = require("express");
const store = require("../../store");
const teamsService = {
  doesExist(teamCode) {
    console.log(teamCode);
    return store.teams.map(team => team.teamCode === teamCode).includes(true);
  },
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
