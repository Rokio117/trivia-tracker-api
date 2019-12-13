const express = require("express");
const store = require("../store");
const userService = require("../users/users-service");
const teamsService = {
  doesExist(knex, teamcode) {
    //return store.teams.map(team => team.teamcode === teamcode).includes(true);
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode });
  },
  getAllTeams(knex) {
    return knex.select("*").from("trivia_teams");
  },
  getTeam(teamcode) {
    return store.teams.find(team => team.teamcode === teamcode);
  },
  getTeamById(knex, teamId) {
    return knex
      .select("*")
      .from("trivia_teams")
      .where({ id: teamId });
  },
  getTeamMembers(teamcode) {
    return store.teams.find(team => team.teamcode === teamcode).members;
  },
  getRoleOfMember(username, teamcode) {
    console.log(username, teamcode);
    return store.teams
      .find(team => team.teamcode === teamcode)
      .members.find(member => member.username === username).role;
  },
  userExists(username) {
    return store.users.map(user => user.username).includes(username);
  },
  getNamedMembersOfTeam: members => {
    return members.map(member =>
      Object.assign(member, {
        name: userService.getNameFromUsername(member.username)
      })
    );
  },
  postNewTeam(teamObject) {
    store.teams.push(teamObject);
  },
  addToTeam(knex, playerId, teamcode, role) {
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode })
      .then(id => {
        const member = { player_id: playerId, team_id: id[0].id };
        return knex
          .insert(member)
          .into("members")
          .returning("*")
          .then(result => result);
      });
    // const newMember = {
    //   username: player,
    //   role: role
    // };
    // store.teams
    //   .find(team => team.teamcode === teamcode)
    //   .members.push(newMember);
  },
  changeRole(player, role, teamcode) {
    store.teams
      .find(team => team.teamcode === teamcode)
      .members.find(member => member.username === player).role = role;
  },
  changeWinnings: (winnings, teamcode) => {
    store.teams.find(team => team.teamcode === teamcode).winnings = winnings;
  },
  changeTeamName: (name, teamcode) => {
    store.teams.find(team => team.teamcode === teamcode).name = name;
  },
  addEvent(event, teamcode) {
    const winnings =
      parseInt(store.teams.find(team => team.teamcode === teamcode).winnings) +
      parseInt(event.winnings);
    store.teams.find(team => team.teamcode === teamcode).history.unshift(event);
    console.log("winnings in store.addEvent", winnings, typeof winnings);
    store.teams.find(team => team.teamcode === teamcode).winnings = winnings;

    if (event.outcome === "Win") {
      const position = event.position;
      store.teams.find(team => team.teamcode === teamcode).wins++;
      if (position === "1st") {
        store.teams.find(team => team.teamcode === teamcode).firstPlace++;
      }
      if (position === "2nd") {
        store.teams.find(team => team.teamcode === teamcode).secondPlace++;
      }
      if (position === "3rd") {
        store.teams.find(team => team.teamcode === teamcode).thirdPlace++;
      }
    }
  }
};

module.exports = teamsService;
