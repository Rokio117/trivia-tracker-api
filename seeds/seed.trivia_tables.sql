BEGIN;

TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_locations,
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

INSERT INTO trivia_locations (locationName)
VALUES
('Paddys Pub'),
('Moes Tavern'),
('Snakehole Lounge'),
('The Drunken Clam'),
('The Three Broomsticks'),
('The Hogs Head');


INSERT INTO trivia_events (eventDate, eventLocation)
VALUES
('2019-01-22',1),
('2019-01-23',1),
('2019-12-12',1),
('2019-11-11',1),
('2019-10-10',3),
('2019-09-09',4),
('2019-08-08',5),
('2019-08-07',6),
('2019-11-11',2),
('2019-12-12',5),
('2019-11-28',5),
('2019-11-21',5),
('2019-12-05',5);


INSERT INTO trivia_results (team_id, event_id, winnings, outcome, position)
VALUES
(1,1,0,'Loss','4th'),
(1,2,30,'Win','1st'),
(2,1,30,'Win','1st'),
(2,2,30,'Win','1st'),
(3,3,10,'Win','3rd'),
(3,9,10,'Win','3rd'),
(3,5,10,'Win','3rd'),
(3,6,20,'Win','2nd'),
(3,7,20,'Win','2nd'),
(3,8,30,'Win','1st'),
(4,10,0,'Loss','4th'),
(4,13,10,'Win','3rd'),
(4,11,10,'Win','3rd'),
(4,12,0,'Loss','11th');


INSERT INTO trivia_attendees (team_id, event_id, player_id)
VALUES
(1,1,1),
(1,1,2),
(1,2,1),
(1,2,2),
(1,2,3),
(2,1,1),
(2,6,1),
(2,4,1),
(2,1,2),
(2,6,2),
(2,4,2),
(3,3,7),
(3,3,8),
(3,3,9),
(3,3,10),
(3,9,7),
(3,9,8),
(3,9,9),
(3,9,10),
(3,3,7),
(3,3,8),
(3,6,7),
(3,6,8),
(3,7,7),
(3,7,8),
(3,7,9),
(3,7,10),
(3,8,7),
(3,8,8),
(3,8,9),
(3,8,10),
(4,10,11),
(4,10,12),
(4,10,13),
(4,10,7),
(4,13,11),
(4,13,12),
(4,13,13),
(4,13,7),
(4,11,11),
(4,11,12),
(4,11,13),
(4,12,11),
(4,12,12),
(4,12,13);


COMMIT;