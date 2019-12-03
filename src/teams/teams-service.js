const express = require("express");
const store = require("../store");
const userService = require("../users/users-service");
const teamsService = {
  doesExist(teamCode) {
    console.log(teamCode, "teamCode in doesExist");
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
  },
  getNamedMembersOfTeam: members => {
    return members.map(member =>
      Object.assign(member, {
        name: userService.getNameFromUserName(member.userName)
      })
    );
  },
  postNewTeam(teamObject) {
    store.teams.push(teamObject);
  },
  addToTeam(player, teamCode, role) {
    const newMember = {
      userName: player,
      role: role
    };
    store.teams
      .find(team => team.teamCode === teamCode)
      .members.push(newMember);
  },
  changeRole(player, role, teamCode) {
    store.teams
      .find(team => team.teamCode === teamCode)
      .members.find(member => member.userName === player).role = role;
  },
  changeWinnings: (winnings, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).winnings = winnings;
  },
  changeTeamName: (name, teamCode) => {
    store.teams.find(team => team.teamCode === teamCode).name = name;
  },
  addEvent(eventObject, teamCode) {
    const winnings =
      parseInt(store.teams.find(team => team.teamCode === teamCode).winnings) +
      parseInt(event.winnings);
    store.teams.find(team => team.teamCode === teamCode).history.unshift(event);
    console.log("winnings in store.addEvent", winnings, typeof winnings);
    store.teams.find(team => team.teamCode === teamCode).winnings = winnings;

    if (event.outcome === "Win") {
      const position = event.position;
      store.teams.find(team => team.teamCode === teamCode).wins++;
      if (position === "1st") {
        store.teams.find(team => team.teamCode === teamCode).firstPlace++;
      }
      if (position === "2nd") {
        store.teams.find(team => team.teamCode === teamCode).secondPlace++;
      }
      if (position === "3rd") {
        store.teams.find(team => team.teamCode === teamCode).thirdPlace++;
      }
    }
  }
};

module.exports = teamsService;
