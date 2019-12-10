function cleanTables(db) {
  console.log("cleanTables ran");
  console.log("db in cleanTables", db);
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
}

function seedPlayers(db, players) {}

function seedTeams(db, teams) {}

function seedMembers(db, members) {}

function seedLocations(db, locations) {}

function seedEvents(db, events) {}

function seedResults(db, results) {}

function seedAttendees(db, attendees) {}

function seedAllTables(
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

module.exports = {
  cleanTables,
  seedPlayers,
  seedTeams,
  seedMembers,
  seedLocations,
  seedEvents,
  seedResults,
  seedAttendees,
  seedAllTables
};
