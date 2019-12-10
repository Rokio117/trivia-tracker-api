

DROP TYPE IF EXISTS options;

CREATE TYPE options AS ENUM (
  'Win',
  'Loss'
);

CREATE TABLE trivia_results (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  team_id INTEGER REFERENCES trivia_teams(id) NOT NULL,
  event_id INTEGER REFERENCES trivia_events(id) NOT NULL,
  winnings INTEGER NOT NULL,
  outcome options NOT NULL,
  position TEXT NOT NULL
)