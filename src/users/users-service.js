const store = require("../store");

const usersService = {
  userExists(userName) {
    return store.users.map(user => user.userName).includes(userName);
  },
  getAllusers() {
    return store.users;
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
  }
};

module.exports = usersService;
