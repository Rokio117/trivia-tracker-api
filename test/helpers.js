const helpers = {
  seedUsers(db, players) {
    console.log("seedUsers Ran");
    return db.into("trivia_players").insert(players);
  },

  seedTeams(db, teams) {
    console.log("seedTeams ran");
    return db.into("trivia_teams").insert(teams);
  },

  seedMembers(db, members) {
    console.log("seedmembers ran");
    return db.into("members").insert(members);
  },

  seedLocations(db, locations) {},

  seedEvents(db, events) {},

  seedResults(db, results) {},

  seedAttendees(db, attendees) {},

  seedAllTables(
    db,
    players,
    teams,
    members,
    locations,
    events,
    results,
    attendees
  ) {
    seedPlayers(db, players);
    seedTeams(db, teams);
    seedMembers(db, members);
    seedLocations(db, locations);
    seedEvents(db, events);
    seedResults(db, results);
    seedAttendees(db, attendees);
  }
};

function cleanTables(db) {
  return db.raw(
    `TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_events,
  members,
  trivia_teams,
  trivia_players
  RESTART IDENTITY CASCADE`
  );
}

module.exports = {
  helpers,
  cleanTables
};
