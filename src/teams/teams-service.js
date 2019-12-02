const express = require("express");
const store = require("../store");
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
  },
  getRoleOfMember(userName, teamCode) {
    console.log(userName, teamCode);
    return store.teams
      .find(team => team.teamCode === teamCode)
      .members.find(member => member.userName === userName).role;
  },
  userExists(userName) {
    return store.users.map(user => user.userName).includes(userName);
  }
};

module.exports = teamsService;
