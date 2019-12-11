const store = require("../store");
const teamService = require("../teams/teams-service");
const usersService = {
  userExists(knex, userName) {
    //return store.users.map(user => user.userName).includes(userName);
    const player = knex
      .select("*")
      .from("trivia_players")
      .where("userName", userName);
    if (player) {
      return true;
    } else return false;
  },
  getAllusers(knex) {
    return knex.select("*").from("trivia_players");
  },
  getUser(userName) {
    return store.users.find(user => user.userName === userName);
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
  postNewUserNoTeam(profile) {
    return store.users.push(profile);
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
