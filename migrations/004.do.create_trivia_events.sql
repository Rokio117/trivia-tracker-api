DROP TABLE IF EXISTS trivia_events;

CREATE TABLE trivia_events (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  date TEXT NOT NULL,
  location TEXT NOT NULL
)