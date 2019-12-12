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
  getUserId(knex, username) {
    return knex
      .select("id")
      .from("trivia_players")
      .where({ username: username });
  },

  getNameFromUsername(username) {
    return store.users.find(user => user.username === username).name;
  },
  getUserTeams(knex, userid) {
    return knex
      .select("team_id")
      .from("members")
      .where({ player_id: userid });
  },
  getTeamInfo(knex, teamIds) {
    const ids = teamIds.map(teamId => teamId.team_id);
    return knex("trivia_teams").whereIn("id", ids);
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
      .returning("*")
      .then(result => {
        return result;
      });
  },
  changeUsername(knex, username, newusername) {
    return knex("trivia_players")
      .where({ username })
      .update({ username: newusername })
      .then(() => {
        return knex("trivia_players").where({ username: newusername });
      });

    // store.users.find(user => user.username === username).username = newUsername;

    // store.teams
    //   .filter(team => team.members.find(member => member.username === username))
    //   .forEach(
    //     team =>
    //       (team.members.find(
    //         member => member.username === username
    //       ).username = newUsername)
    //   );

    // store.teams
    //   .filter(team =>
    //     team.members.find(member => member.username === newUsername)
    //   )
    //   .forEach(team =>
    //     team.history.forEach(event => {
    //       const index = event.roster.indexOf(username);
    //       event.roster.splice(index, 1, newUsername);
    //     })
    //   );
  },
  changePlayerName(newName, username) {
    store.users.find(user => user.username === username).name = newName;
  },
  postUserWithTeam: (knex, userObject, teamcode) => {
    console.log(userObject, teamcode);
    // const user = { username: userObject.username, role: "Member" };
    // store.users.push(userObject);
    // store.teams.find(team => team.teamcode === teamcode).members.push(user);
  }
};

module.exports = usersService;
