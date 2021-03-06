DROP TABLE IF EXISTS trivia_players CASCADE;
DROP TABLE IF EXISTS trivia_teams CASCADE;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS trivia_locations;
DROP TABLE IF EXISTS trivia_events;
DROP TABLE IF EXISTS trivia_results;
DROP TYPE IF EXISTS options;
DROP TABLE IF EXISTS trivia_attendees;




CREATE TABLE IF NOT EXISTS trivia_players (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT NOT NULL
)