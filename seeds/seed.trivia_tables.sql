BEGIN;

TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_events,
  members,
  trivia_teams,
  trivia_players
  RESTART IDENTITY CASCADE;

  INSERT INTO trivia_players (userName, nickName, password )
  VALUES
  ("Rokio","Nick","password"),
  ("Jen","Jennifer","password"),
  ("Ash","Ashley","password"),
  ("Deandra","Dee","password"),
  ("Charlie","Charlie","password"),
  ("Mac","Mac","password"),
  ("Demo","Demo","password"),
  ("Demo2","Demo Lovato","password"),
  ("Demo3","Demo Moore","password"),
  ("Demo4","Demenem","password"),
  ("Harry","Harry","password"),
  ("Ron","Ron","password"),
  ("Hermione","Hermione","password");







  COMMIT;