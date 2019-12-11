const helpers = {
  cleanTables(db) {
    db.raw(
      `TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_events,
  members,
  trivia_teams,
  trivia_players
  RESTART IDENTITY CASCADE`
    );
  },

  seedUsers(db, players) {
    console.log(players, "players");
    return db.into("trivia_players").insert(players);
  },

  seedTeams(db, teams) {},

  seedMembers(db, members) {},

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

module.exports = {
  helpers
};
