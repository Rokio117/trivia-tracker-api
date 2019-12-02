const store = {
  users: [
    {
      userName: "Rokio",
      name: "Nick",
      password: "password"
    },
    {
      userName: "Jen",
      name: "Jennifer",
      password: "password"
    },
    {
      userName: "Ash",
      name: "Ashley",
      password: "password"
    },
    {
      userName: "Deandra",
      name: "Dee",
      password: "password"
    },
    {
      userName: "Charlie",
      name: "Charlie",
      password: "password"
    },
    {
      userName: "Mac",
      name: "Mac",
      password: "password"
    },
    {
      userName: "Demo",
      name: "Demo",
      password: "password"
    },
    {
      userName: "Demo2",
      name: "Demo Lovato",
      password: "password"
    },
    {
      userName: "Demo3",
      name: "Demo Moore",
      password: "password"
    },
    {
      userName: "Demo4",
      name: "Demenem",
      password: "password"
    },
    {
      userName: "Harry",
      name: "Harry",
      password: "password"
    },
    {
      userName: "Ron",
      name: "Ron",
      password: "password"
    },
    {
      userName: "Hermione",
      name: "Hermione",
      password: "password"
    }
  ],
  teams: [
    {
      name: "We'll Win Again Someday",
      teamCode: "password",
      members: [
        {
          userName: "Rokio",
          role: "Captain"
        },
        {
          userName: "Jen",
          role: "Captain"
        },
        {
          userName: "Ash",
          role: "Reporter"
        }
      ],
      wins: 6,
      firstPlace: 3,
      secondPlace: 2,
      thirdPlace: 1,
      winnings: 395,
      history: [
        {
          date: "1/22/19",
          location: "Paddy's Pub",
          outcome: "Loss",
          roster: ["Rokio", "Ash"],
          position: "4th",
          winnings: 20
        },
        {
          date: "1/23/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Ash", "Jen"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "Paddy's pub",
      teamCode: "password2",
      members: [
        {
          userName: "Rokio",
          role: "Captain"
        },
        {
          userName: "Deandra",
          role: "Captain"
        },
        {
          userName: "Mac",
          role: "Reporter"
        },
        {
          userName: "Charlie",
          role: "Member"
        }
      ],
      wins: 1000,
      firstPlace: 1000,
      secondPlace: 999,
      thirdPlace: 888,
      winnings: 777,
      history: [
        {
          date: "1/22/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Mac", "Deandra"],
          position: "1st",
          winnings: 30
        },
        {
          date: "1/23/19",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Rokio", "Mac", "Deandra"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "Demo Team",
      teamCode: "Demo",
      members: [
        {
          userName: "Demo",
          role: "Captain"
        },
        {
          userName: "Demo2",
          role: "Reporter"
        },
        {
          userName: "Demo3",
          role: "Member"
        },
        {
          userName: "Demo4",
          role: "Guest"
        }
      ],
      wins: 6,
      firstPlace: 1,
      secondPlace: 2,
      thirdPlace: 3,
      winnings: 100,
      history: [
        {
          date: "2019-12-12",
          location: "Paddy's Pub",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-11",
          location: "Moes Tavern",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-10-10",
          location: "Snakehole Lounge",
          outcome: "Win",
          roster: ["Demo", "Demo2"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-09-09",
          location: "The Drunken Clam",
          outcome: "Win",
          roster: ["Demo", "Demo2"],
          position: "2rd",
          winnings: 20
        },
        {
          date: "2019-08-08",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "2rd",
          winnings: 20
        },
        {
          date: "2019-08-07",
          location: "The Hog's Head",
          outcome: "Win",
          roster: ["Demo", "Demo2", "Demo3", "Demo4"],
          position: "1st",
          winnings: 30
        }
      ]
    },
    {
      name: "The Potters",
      teamCode: "Potter",
      members: [
        {
          userName: "Demo",
          role: "Guest"
        },
        {
          userName: "Harry",
          role: "Reporter"
        },
        {
          userName: "Ron",
          role: "Guest"
        },
        {
          userName: "Hermione",
          role: "Captain"
        }
      ],
      wins: 2,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 2,
      winnings: 20,
      history: [
        {
          date: "2019-12-12",
          location: "The Three Broomsticks",
          outcome: "Loss",
          roster: ["Harry", "Ron", "Hermione", "Demo"],
          position: "4th",
          winnings: 0
        },
        {
          date: "2019-12-5",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Harry", "Ron", "Hermione", "Demo"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-28",
          location: "The Three Broomsticks",
          outcome: "Win",
          roster: ["Harry", "Ron", "Hermione"],
          position: "3rd",
          winnings: 10
        },
        {
          date: "2019-11-21",
          location: "The Three Broomsticks",
          outcome: "Loss",
          roster: ["Harry", "Ron", "Hermione"],
          position: "11th",
          winnings: 0
        }
      ]
    }
  ]
};
