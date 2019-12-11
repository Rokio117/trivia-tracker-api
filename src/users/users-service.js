const store = require("../store");
const teamService = require("../teams/teams-service");
const usersService = {
  userExists(knex, userName) {
    //return store.users.map(user => user.userName).includes(userName);
    console.log(userName, "username in userExists");
    return knex
      .select("id")
      .from("trivia_players")
      .where({ username: userName })
      .then(result => {
        console.log("result", result);
        return result;
      });
  },
  getAllusers(knex) {
    console.log("knex in getAllUsers", knex);
    return knex.select("*").from("trivia_players");
  },
  getUser(knex, userName) {
    //return store.users.find(user => user.userName === userName);
    return knex
      .select("*")
      .from("trivia_players")
      .where({ userName: userName });
  },
  getNameFromUserName(userName) {
    return store.users.find(user => user.userName === userName).name;
  },
  getUserTeams(userName) {
    return store.teams.filter(team =>
      team.members.map(member => member.userName).includes(userName)
    );
  },
  getUserProfile(userName) {
    return store.users.find(user => user.userName === userName);
  },
  postNewUserNoTeam(knex, profile) {
    console.log("knex in postNewUserNOTeam", knex);
    //return store.users.push(profile);
    return knex
      .insert(profile)
      .into("trivia_players")
      .returning("*");
  },
  changeUserName(newUserName, userName) {
    store.users.find(user => user.userName === userName).userName = newUserName;

    store.teams
      .filter(team => team.members.find(member => member.userName === userName))
      .forEach(
        team =>
          (team.members.find(
            member => member.userName === userName
          ).userName = newUserName)
      );

    store.teams
      .filter(team =>
        team.members.find(member => member.userName === newUserName)
      )
      .forEach(team =>
        team.history.forEach(event => {
          const index = event.roster.indexOf(userName);
          event.roster.splice(index, 1, newUserName);
        })
      );
  },
  changePlayerName(newName, userName) {
    store.users.find(user => user.userName === userName).name = newName;
  },
  postUserWithTeam: (userObject, teamCode) => {
    const user = { userName: userObject.userName, role: "Member" };
    store.users.push(userObject);
    store.teams.find(team => team.teamCode === teamCode).members.push(user);
  }
};

module.exports = usersService;
