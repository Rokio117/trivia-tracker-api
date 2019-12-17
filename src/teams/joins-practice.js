const express = require("express");
const store = require("../store");
const userService = require("../users/users-service");

const joinsPractice = {
  membersOfTeam(knex, teamId) {
    return knex
      .select("username")
      .from("trivia_players")
      .join("members", "trivia_players.id", "members.player_id")
      .join("trivia_teams", "members.team_id", "trivia_teams.id")
      .where("members.team_id", teamId);
  },
  teamsOfPlayer(knex, player_id) {
    return (
      knex
        .from("trivia_teams")
        .outerJoin("members", "trivia_teams.id", "members.team_id")
        //I only want the teams but it is giving me all data from both tables
        //no matter which join I try...
        .where("members.player_id", player_id)
    );
  },
  names(knex) {
    return knex
      .select("username", "teamname")
      .from("trivia_players")
      .join("members", "trivia_players.id", "members.player_id")
      .join("trivia_teams", "members.team_id", "trivia_teams.id");
  }
};

module.exports = joinsPractice;
