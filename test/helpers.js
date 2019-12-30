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
  },
  testTeam() {
    return {
      teamname: "Well Win Again Someday",
      teamcode: "password",
      wins: 6,
      firstplace: 3,
      secondplace: 2,
      thirdplace: 1,
      winnings: 395
    };
  },
  expectedTeams() {
    return [
      {
        id: 1,
        teamname: "Well Win Again Someday",
        teamcode: "password",
        wins: 6,
        firstplace: 3,
        secondplace: 2,
        thirdplace: 1,
        winnings: 395
      },
      {
        id: 2,
        teamname: "Paddys Pub",
        teamcode: "password2",
        wins: 600,
        firstplace: 300,
        secondplace: 200,
        thirdplace: 100,
        winnings: 1000
      },
      {
        id: 3,
        teamname: "Demo Team",
        teamcode: "Demo",
        wins: 6,
        firstplace: 1,
        secondplace: 2,
        thirdplace: 3,
        winnings: 100
      },
      {
        id: 4,
        teamname: "Dumbledors Army",
        teamcode: "Potter",
        wins: 2,
        firstplace: 0,
        secondplace: 0,
        thirdplace: 2,
        winnings: 2
      }
    ];
  },
  expectedMembers() {
    return [
      { username: "Ash", nickname: "Ashley", role: "Reporter" },
      { username: "Jen", nickname: "Jennifer", role: "Captain" },
      { username: "Rokio", nickname: "Nick", role: "Captain" }
    ];
  },
  testUser() {
    return { username: "Rokio", password: "password", nickname: "Nick" };
  },
  teamWithNewWinnings() {
    return {
      id: 1,
      teamname: "Well Win Again Someday",
      teamcode: "password",
      wins: 6,
      firstplace: 3,
      secondplace: 2,
      thirdplace: 1,
      winnings: 5000
    };
  },
  testEvent() {
    return {
      date: "2020-01-01",
      location: "Paddys Pub",
      outcome: "Win",
      roster: ["Rokio", "Jen", "Ash"],
      position: "1st",
      winnings: 30
    };
  },
  expectedEventObject() {
    return {
      id: 1,
      teamcode: "password",
      teamname: "Well Win Again Someday",
      wins: 7,
      firstplace: 4,
      secondplace: 2,
      thirdplace: 1,
      winnings: 425,
      eventId: 14,
      resultId: 15,
      attendeeIds: [46, 47, 48]
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

function makeAuthHeader(user) {
  const token = Buffer.from(`${user.username}:${user.password}`).toString(
    "base64"
  );
  return `Basic ${token}`;
}

module.exports = {
  helpers,
  cleanTables,
  makeAuthHeader
};
