const express = require("express");
const store = require("../store");
const userService = require("../users/users-service");
const teamsService = {
  doesExist(knex, teamcode) {
    //return store.teams.map(team => team.teamcode === teamcode).includes(true);
    //console.log("teamcode in doesExist", teamcode);
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode });
  },
  getAllTeams(knex) {
    return knex.select("*").from("trivia_teams");
  },
  getTeam(knex, teamcode) {
    return knex
      .select("*")
      .from("trivia_teams")
      .where({ teamcode });
  },
  getTeamById(knex, teamId) {
    return knex
      .select("*")
      .from("trivia_teams")
      .where({ id: teamId });
  },
  getTeamMembers(knex, teamcode) {
    console.log("getteammembers ran");
    //return store.teams.find(team => team.teamcode === teamcode).members;
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode })
      .then(id => {
        const team_id = id[0].id;
        return knex
          .select("player_id")
          .from("members")
          .where({ team_id })
          .then(players => {
            const playerIds = players.map(player => player.player_id);
            return knex
              .select("username")
              .from("trivia_players")
              .whereIn("id", playerIds)
              .then(playerIds => {
                const userNames = playerIds.map(id => id.username);
                return userNames;
              });
          });
      });
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
  postNewTeam(knex, teamObject) {
    //store.teams.push(teamObject);
    return knex
      .insert(teamObject)
      .into("trivia_teams")
      .returning("*")
      .then(result => {
        console.log(result, "result in postNewTeam");
        return result;
      });
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
  changeTeamName: (knex, newTeamName, teamcode) => {
    return knex("trivia_teams")
      .where({ teamcode: teamcode })
      .update({ teamname: newTeamName })
      .returning("*");
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
