function cleanTables(db) {
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

function seedUsers(db, users) {}

module.exports = {
  cleanTables
};
