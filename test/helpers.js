const helpers = {
  seedUsers(db, players) {
    console.log("seedUsers Ran");
    return db.into("trivia_players").insert(players);
  },

  seedTeams(db, teams) {
    console.log("seedTeams ran");
    return db.into("trivia_teams").insert(teams);
  },

  seedMembers(db, members) {
    console.log("seedmembers ran");
    return db.into("members").insert(members);
  },

  seedLocations(db, locations) {
    console.log("seedLocations ran");
    return db.into("trivia_locations").insert(locations);
  },

  seedEvents(db, events) {
    console.log("seedEvents ran");
    return db.into("trivia_events").insert(events);
  },

  seedResults(db, results) {
    console.log("seedResults ran");
    return db.into("trivia_results").insert(results);
  },

  seedAttendees(db, attendees) {
    console.log("seedAttendees ran");
    return db.into("trivia_attendees").insert(attendees);
  },

  seedAllTables(
    db,
    players,
    teams,
    members,
    locations,
    events,
    results,
    attendees
  ) {
    return this.seedUsers(db, players).then(() => {
      return this.seedTeams(db, teams).then(() => {
        return this.seedMembers(db, members).then(() => {
          return this.seedLocations(db, locations).then(() => {
            return this.seedEvents(db, events).then(() => {
              return this.seedResults(db, results).then(() => {
                return this.seedAttendees(db, attendees).then(() => {
                  console.log("all seeds ran");
                });
              });
            });
          });
        });
      });
    });
  },
  newTeam() {
    return {
      teamcode: "newcode",
      teamname: "Test name 001",
      wins: 10,
      firstplace: 4,
      secondplace: 3,
      thirdplace: 3,
      winnings: 200
    };
  },
  expectedTeam() {
    return {
      id: 5,
      teamcode: "newcode",
      teamname: "Test name 001",
      wins: 10,
      firstplace: 4,
      secondplace: 3,
      thirdplace: 3,
      winnings: 200
    };
  }
};

function cleanTables(db) {
  return db.raw(
    `TRUNCATE 
  trivia_attendees,
  trivia_results,
  trivia_events,
  trivia_locations,
  members,
  trivia_teams,
  trivia_players
  RESTART IDENTITY CASCADE`
  );
}

module.exports = {
  helpers,
  cleanTables
};
