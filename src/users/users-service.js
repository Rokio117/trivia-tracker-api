const store = require("../store");
const teamService = require("../teams/teams-service");
const usersService = {
  userExists(knex, username) {
    return knex
      .select("id")
      .from("trivia_players")
      .where({ username: username });
  },
  getAllusers(knex) {
    return knex.select("*").from("trivia_players");
  },
  getUser(knex, username) {
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
  getUsersIds(knex, userList) {
    return knex
      .select("id")
      .from("trivia_players")
      .whereIn("username", userList)
      .then(ids => {
        console.log(ids);
        const formattedIds = ids.map(id => id.id);
        return formattedIds;
      });
  },

  getNameFromUsername(knex, username) {
    return knex
      .select("nickname")
      .from("trivia_players")
      .where({ username: username });
  },
  getUserTeams(knex, userid) {
    return knex
      .select("team_id")
      .from("members")
      .where({ player_id: userid });
  },
  getTeamInfo(knex, teamIds) {
    const ids = teamIds.map(item => item.team_id);

    return knex("trivia_teams").whereIn("id", ids);
  },

  postNewUser(knex, profile) {
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
  },
  changePlayerName(knex, newName, username) {
    console.log(
      newName,
      username,
      "newName and username in change player name"
    );
    return knex("trivia_players")
      .where({ username })
      .update({ nickname: newName })
      .then(() => {
        return knex
          .select("*")
          .from("trivia_players")
          .where({ username });
      });
  }
};

module.exports = usersService;
