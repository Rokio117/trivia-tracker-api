BEGIN;

TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_events,
  members,
  trivia_teams,
  trivia_players
  RESTART IDENTITY CASCADE;

  INSERT INTO trivia_players (userName, nickName, password)
  VALUES
  ('Rokio','Nick','password'),
  ('Jen','Jennifer','password'),
  ('Ash','Ashley','password'),
  ('Deandra','Dee','password'),
  ('Charlie','Charlie','password'),
  ('Mac','Mac','password'),
  ('Demo','Demo','password'),
  ('Demo2','Demo Lovato','password'),
  ('Demo3','Demo Moore','password'),
  ('Demo4','Demenem','password'),
  ('Harry','Harry','password'),
  ('Ron','Ron','password'),
  ('Hermione','Hermione','password');

  INSERT INTO trivia_teams (teamName, teamCode, wins, firstPlace, secondPlace, thirdPlace, winnings)
  VALUES
  ('Well Win Again Someday','password', 6, 3, 2, 1, 395),
  ('Paddys Pub','password2',600,300,200,100, 1000),
  ('Demo Team','Demo',6,1,2,3,100),
  ('Dumbledors Army','Potter',2,0,0,2,20);

  INSERT INTO members (player_id, team_id)
  VALUES 
  (1,1),
  (2,1),
  (3,1),
  (1,2),
  (4,2),
  (6,2),
  (5,2),
  (7,3),
  (8,3),
  (9,3),
  (10,3),
  (11,4),
  (12,4),
  (13,4);

INSERT INTO trivia_events (date, location)
VALUES
('2019-01-22','Paddys Pub'),
('2019-01-23','Paddys Pub'),
('2019-12-12','Paddys Pub'),
('2019-11-11','Paddys Pub'),
('2019-10-10','Snakehole Lounge'),
('2019-09-09','The Drunken Clam'),
('2019-08-08','The Three Broomsticks'),
('2019-08-07','The Hogs Head'),
('')





  COMMIT;