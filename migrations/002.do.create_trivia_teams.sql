

CREATE TABLE IF NOT EXISTS trivia_teams (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  teamCode TEXT NOT NULL UNIQUE,
  teamName TEXT,
  wins INTEGER NOT NULL,
  firstPlace INTEGER NOT NULL,
  secondPlace INTEGER NOT NULL,
  thirdPlace INTEGER NOT NULL,
  winnings INTEGER NOT NULL
);