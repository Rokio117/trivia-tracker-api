CREATE TABLE trivia_players(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  userName TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL
)