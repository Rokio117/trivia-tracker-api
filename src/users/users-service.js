const store = require("../store");
const teamService = require("../teams/teams-service");
const usersService = {
  userExists(knex, username) {
    //return store.users.map(user => user.username).includes(username);
    console.log(username, "username in userExists");
    return knex
      .select("id")
      .from("trivia_players")
      .where({ username: username })
      .then(result => {
        console.log("result", result);
        return result;
      });
  },
  getAllusers(knex) {
    console.log("knex in getAllUsers", knex);
    return knex.select("*").from("trivia_players");
  },
  getUser(knex, username) {
    //return store.users.find(user => user.username === username);
    return knex
      .select("*")
      .from("trivia_players")
      .where({ username: username });
  },
  getNameFromUsername(username) {
    return store.users.find(user => user.username === username).name;
  },
  getUserTeams(username) {
    return store.teams.filter(team =>
      team.members.map(member => member.username).includes(username)
    );
  },
  getUserProfile(username) {
    return store.users.find(user => user.username === username);
  },
  postNewUserNoTeam(knex, profile) {
    console.log("knex in postNewUserNOTeam", knex);
    //return store.users.push(profile);
    return knex
      .insert(profile)
      .into("trivia_players")
      .returning("*");
  },
  changeUsername(newUsername, username) {
    store.users.find(user => user.username === username).username = newUsername;

    store.teams
      .filter(team => team.members.find(member => member.username === username))
      .forEach(
        team =>
          (team.members.find(
            member => member.username === username
          ).username = newUsername)
      );

    store.teams
      .filter(team =>
        team.members.find(member => member.username === newUsername)
      )
      .forEach(team =>
        team.history.forEach(event => {
          const index = event.roster.indexOf(username);
          event.roster.splice(index, 1, newUsername);
        })
      );
  },
  changePlayerName(newName, username) {
    store.users.find(user => user.username === username).name = newName;
  },
  postUserWithTeam: (userObject, teamCode) => {
    const user = { username: userObject.username, role: "Member" };
    store.users.push(userObject);
    store.teams.find(team => team.teamCode === teamCode).members.push(user);
  }
};

module.exports = usersService;
