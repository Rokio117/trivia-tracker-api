const seedData = {
  users() {
    return [
      { username: "Rokio", password: "password", nickname: "Nick" },
      { username: "Jen", password: "password", nickname: "Jennifer" },
      { username: "Ash", password: "password", nickname: "Ashley" },
      { username: "Deandra", password: "password", nickname: "Dee" },
      { username: "Charlie", password: "password", nickname: "Charlie" },
      { username: "Mac", password: "password", nickname: "Mac" },
      { username: "Demo", password: "password", nickname: "Demo" },
      {
        username: "Demo2",
        password: "password",
        nickname: "Demo Lovato"
      },
      {
        username: "Demo3",
        password: "password",
        nickname: "Demo Moore"
      },
      { username: "Demo4", password: "password", nickname: "Demenem" },
      { username: "Harry", password: "password", nickname: "Harry" },
      { username: "Ron", password: "password", nickname: "Ron" },
      {
        username: "Hermione",
        password: "password",
        nickname: "Hermione"
      }
    ];
  },

  teams() {
    return [
      {
        teamname: "Well Win Again Someday",
        teamcode: "password",
        wins: 6,
        firstplace: 3,
        secondplace: 2,
        thirdplace: 1,
        winnings: 395
      },
      {
        teamname: "Paddys Pub",
        teamcode: "password2",
        wins: 600,
        firstplace: 300,
        secondplace: 200,
        thirdplace: 100,
        winnings: 1000
      },
      {
        teamname: "Demo Team",
        teamcode: "Demo",
        wins: 6,
        firstplace: 1,
        secondplace: 2,
        thirdplace: 3,
        winnings: 100
      },
      {
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

  members() {
    return [
      { player_id: 1, team_id: 1, role: "Captain" },
      { player_id: 2, team_id: 1, role: "Captain" },
      { player_id: 3, team_id: 1, role: "Reporter" },
      { player_id: 1, team_id: 2, role: "Captain" },
      { player_id: 4, team_id: 2, role: "Captain" },
      { player_id: 6, team_id: 2, role: "Reporter" },
      { player_id: 5, team_id: 2, role: "Member" },
      { player_id: 7, team_id: 3, role: "Captain" },
      { player_id: 8, team_id: 3, role: "Reporter" },
      { player_id: 9, team_id: 3, role: "Member" },
      { player_id: 10, team_id: 3, role: "Guest" },
      { player_id: 7, team_id: 4, role: "Captain" },
      { player_id: 11, team_id: 4, role: "Reporter" },
      { player_id: 12, team_id: 4, role: "Guest" },
      { player_id: 13, team_id: 4, role: "Captain" }
    ];
  },

  locations() {
    return [
      { locationname: "Paddys Pub" },
      { locationname: "Moes Tavern" },
      { locationname: "Snakehole Lounge" },
      { locationname: "The Drunken Clam" },
      { locationname: "The Three Broomsticks" },
      { locationname: "The Hogs Head" }
    ];
  },

  events() {
    return [
      { eventdate: "2019-01-22", eventlocation: 1 },
      { eventdate: "2019-01-23", eventlocation: 1 },
      { eventdate: "2019-12-12", eventlocation: 1 },
      { eventdate: "2019-11-11", eventlocation: 1 },
      { eventdate: "2019-10-10", eventlocation: 3 },
      { eventdate: "2019-09-09", eventlocation: 4 },
      { eventdate: "2019-08-08", eventlocation: 5 },
      { eventdate: "2019-08-07", eventlocation: 6 },
      { eventdate: "2019-11-11", eventlocation: 2 },
      { eventdate: "2019-12-12", eventlocation: 5 },
      { eventdate: "2019-11-28", eventlocation: 5 },
      { eventdate: "2019-11-21", eventlocation: 5 },
      { eventdate: "2019-12-05", eventlocation: 5 }
    ];
  },

  results() {
    return [
      {
        team_id: 1,
        event_id: 1,
        winnings: 0,
        outcome: "Loss",
        position: "4th"
      },
      {
        team_id: 1,
        event_id: 2,
        winnings: 30,
        outcome: "Win",
        position: "1st"
      },
      {
        team_id: 2,
        event_id: 1,
        winnings: 30,
        outcome: "Win",
        position: "1st"
      },
      {
        team_id: 2,
        event_id: 2,
        winnings: 30,
        outcome: "Win",
        position: "1st"
      },
      {
        team_id: 3,
        event_id: 3,
        winnings: 10,
        outcome: "Win",
        position: "3rd"
      },
      {
        team_id: 3,
        event_id: 9,
        winnings: 10,
        outcome: "Win",
        position: "3rd"
      },
      {
        team_id: 3,
        event_id: 5,
        winnings: 10,
        outcome: "Win",
        position: "3rd"
      },
      {
        team_id: 3,
        event_id: 6,
        winnings: 20,
        outcome: "Win",
        position: "2nd"
      },
      {
        team_id: 3,
        event_id: 7,
        winnings: 20,
        outcome: "Win",
        position: "2nd"
      },
      {
        team_id: 3,
        event_id: 8,
        winnings: 30,
        outcome: "Win",
        position: "1st"
      },
      {
        team_id: 4,
        event_id: 10,
        winnings: 0,
        outcome: "Loss",
        position: "4th"
      },
      {
        team_id: 4,
        event_id: 13,
        winnings: 10,
        outcome: "Win",
        position: "3rd"
      },
      {
        team_id: 4,
        event_id: 11,
        winnings: 10,
        outcome: "Win",
        position: "3rd"
      },
      {
        team_id: 4,
        event_id: 12,
        winnings: 0,
        outcome: "Loss",
        position: "11th"
      }
    ];
  },

  attendees() {
    return [
      { team_id: 1, event_id: 1, player_id: 1 },
      { team_id: 1, event_id: 1, player_id: 3 },
      { team_id: 1, event_id: 2, player_id: 1 },
      { team_id: 1, event_id: 2, player_id: 2 },
      { team_id: 1, event_id: 2, player_id: 3 },
      { team_id: 2, event_id: 1, player_id: 1 },
      { team_id: 2, event_id: 1, player_id: 6 },
      { team_id: 2, event_id: 1, player_id: 4 },
      { team_id: 2, event_id: 2, player_id: 1 },
      { team_id: 2, event_id: 2, player_id: 6 },
      { team_id: 2, event_id: 2, player_id: 4 },
      { team_id: 3, event_id: 3, player_id: 7 },
      { team_id: 3, event_id: 3, player_id: 8 },
      { team_id: 3, event_id: 3, player_id: 9 },
      { team_id: 3, event_id: 3, player_id: 10 },
      { team_id: 3, event_id: 9, player_id: 7 },
      { team_id: 3, event_id: 9, player_id: 8 },
      { team_id: 3, event_id: 9, player_id: 9 },
      { team_id: 3, event_id: 9, player_id: 10 },
      { team_id: 3, event_id: 5, player_id: 7 },
      { team_id: 3, event_id: 5, player_id: 8 },
      { team_id: 3, event_id: 6, player_id: 7 },
      { team_id: 3, event_id: 6, player_id: 8 },
      { team_id: 3, event_id: 7, player_id: 7 },
      { team_id: 3, event_id: 7, player_id: 8 },
      { team_id: 3, event_id: 7, player_id: 9 },
      { team_id: 3, event_id: 7, player_id: 10 },
      { team_id: 3, event_id: 8, player_id: 7 },
      { team_id: 3, event_id: 8, player_id: 8 },
      { team_id: 3, event_id: 8, player_id: 9 },
      { team_id: 3, event_id: 8, player_id: 10 },
      { team_id: 4, event_id: 10, player_id: 11 },
      { team_id: 4, event_id: 10, player_id: 12 },
      { team_id: 4, event_id: 10, player_id: 13 },
      { team_id: 4, event_id: 10, player_id: 7 },
      { team_id: 4, event_id: 13, player_id: 11 },
      { team_id: 4, event_id: 13, player_id: 12 },
      { team_id: 4, event_id: 13, player_id: 13 },
      { team_id: 4, event_id: 13, player_id: 7 },
      { team_id: 4, event_id: 11, player_id: 11 },
      { team_id: 4, event_id: 11, player_id: 12 },
      { team_id: 4, event_id: 11, player_id: 13 },
      { team_id: 4, event_id: 12, player_id: 11 },
      { team_id: 4, event_id: 12, player_id: 12 },
      { team_id: 4, event_id: 12, player_id: 13 }
    ];
  },
  usersWithId() {
    return [
      { id: 1, username: "Rokio", password: "password", nickname: "Nick" },
      { id: 2, username: "Jen", password: "password", nickname: "Jennifer" },
      { id: 3, username: "Ash", password: "password", nickname: "Ashley" },
      { id: 4, username: "Deandra", password: "password", nickname: "Dee" },
      { id: 5, username: "Charlie", password: "password", nickname: "Charlie" },
      { id: 6, username: "Mac", password: "password", nickname: "Mac" },
      { id: 7, username: "Demo", password: "password", nickname: "Demo" },
      {
        id: 8,
        username: "Demo2",
        password: "password",
        nickname: "Demo Lovato"
      },
      {
        id: 9,
        username: "Demo3",
        password: "password",
        nickname: "Demo Moore"
      },
      { id: 10, username: "Demo4", password: "password", nickname: "Demenem" },
      { id: 11, username: "Harry", password: "password", nickname: "Harry" },
      { id: 12, username: "Ron", password: "password", nickname: "Ron" },
      {
        id: 13,
        username: "Hermione",
        password: "password",
        nickname: "Hermione"
      }
    ];
  },
  expectedUserTeams() {
    return [
      {
        id: 1,
        teamcode: "password",
        teamname: "Well Win Again Someday",
        wins: 6,
        firstplace: 3,
        secondplace: 2,
        thirdplace: 1,
        winnings: 395,
        members: [
          {
            username: "Rokio",
            role: "Captain",
            nickname: "Nick"
          },
          {
            username: "Jen",
            role: "Captain",
            nickname: "Jennifer"
          },
          {
            username: "Ash",
            role: "Reporter",
            nickname: "Ashley"
          }
        ],
        history: [
          {
            eventdate: "2019-01-23",
            locationname: "Paddys Pub",
            outcome: "Win",
            position: "1st",
            winnings: 30,
            id: 2,
            roster: ["Rokio", "Jen", "Ash"]
          },
          {
            eventdate: "2019-01-22",
            locationname: "Paddys Pub",
            outcome: "Loss",
            position: "4th",
            winnings: 0,
            id: 1,
            roster: ["Ash", "Rokio"]
          }
        ]
      },
      {
        id: 2,
        teamcode: "password2",
        teamname: "Paddys Pub",
        wins: 600,
        firstplace: 300,
        secondplace: 200,
        thirdplace: 100,
        winnings: 1000,
        members: [
          {
            username: "Rokio",
            role: "Captain",
            nickname: "Nick"
          },
          {
            username: "Deandra",
            role: "Captain",
            nickname: "Dee"
          },
          {
            username: "Mac",
            role: "Reporter",
            nickname: "Mac"
          },
          {
            username: "Charlie",
            role: "Member",
            nickname: "Charlie"
          }
        ],
        history: [
          {
            eventdate: "2019-01-23",
            locationname: "Paddys Pub",
            outcome: "Win",
            position: "1st",
            winnings: 30,
            id: 2,
            roster: ["Deandra", "Rokio", "Mac"]
          },
          {
            eventdate: "2019-01-22",
            locationname: "Paddys Pub",
            outcome: "Win",
            position: "1st",
            winnings: 30,
            id: 1,
            roster: ["Rokio", "Mac", "Deandra"]
          }
        ]
      }
    ];
  }
};

module.exports = { seedData };
