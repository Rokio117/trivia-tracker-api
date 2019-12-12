let teamList = [];
return knex
  .select("id")
  .from("trivia_players")
  .where({ username: username })
  .then(id => {
    knex
      .select("team_id")
      .from("members")
      .where({ player_id: id[0].id })
      .then(team_id => {
        team_id.forEach(id => {
          let teamId = id.team_id;
          //console.log("teamId in getUserTeams", teamId);
          return knex
            .select("*")
            .from("trivia_teams")
            .where({ id: teamId })
            .then(result => {
              console.log(result[0], "result of big query");
              teamList.push(result[0]);
            });
        });
      });
    return teamList;
  });
