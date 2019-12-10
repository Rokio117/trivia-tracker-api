const seedData = 

{ users = () => {
  return ([
  { id: 1, userName: "Rokio", name: "Nick", password: "password" },
  { id: 2, userName: "Jen", name: "Jennifer", password: "password" },
  { id: 3, userName: "Ash", name: "Ashley", password: "password" },
  { id: 4, userName: "Deandra", name: "Dee", password: "password" },
  { id: 5, userName: "Charlie", name: "Charlie", password: "password" },
  { id: 6, userName: "Mac", name: "Mac", password: "password" },
  { id: 7, userName: "Demo", name: "Demo", password: "password" },
  { id: 8, userName: "Demo2", name: "Demo Lovato", password: "password" },
  { id: 9, userName: "Demo3", name: "Demo Moore", password: "password" },
  { id: 10, userName: "Demo4", name: "Demenem", password: "password" },
  { id: 11, userName: "Harry", name: "Harry", password: "password" },
  { id: 12, userName: "Ron", name: "Ron", password: "password" },
  { id: 13, userName: "Hermione", name: "Hermione", password: "password" }
])},

 teams = ()=>  {
   return([
   
  {
    id: 1,
    teamName: "Well Win Again Someday",
    password: "password",
    wins: 6,
    firstPlace: 3,
    secondPlace: 2,
    thirdPlace: 1,
    winnings: 395
  },
  {
    id: 2,
    teamName: "Paddys Pub",
    password: "password2",
    wins: 600,
    firstPlace: 300,
    secondPlace: 200,
    thirdPlace: 100,
    winnings: 1000
  },
  {
    id: 3,
    teamName: "Demo Team",
    password: "Demo",
    wins: 6,
    firstPlace: 1,
    secondPlace: 2,
    thirdPlace: 3,
    winnings: 100
  },
  {
    id: 4,
    teamName: "Dumbledors Army",
    password: "Potter",
    wins: 2,
    firstPlace: 0,
    secondPlace: 0,
    thirdPlace: 2,
    winnings: 2
  }
])
},

  members =()=> {
    return(
      [
        { id: 1, playerId: 1, team_id: 1 },
        { id: 2, playerId: 2, team_id: 1 },
        { id: 3, playerId: 3, team_id: 1 },
        { id: 4, playerId: 1, team_id: 2 },
        { id: 5, playerId: 4, team_id: 2 },
        { id: 6, playerId: 6, team_id: 2 },
        { id: 7, playerId: 5, team_id: 2 },
        { id: 8, playerId: 7, team_id: 3 },
        { id: 9, playerId: 8, team_id: 3 },
        { id: 10, playerId: 9, team_id: 3 },
        { id: 11, playerId: 10, team_id: 3 },
        { id: 12, playerId: 11, team_id: 4 },
        { id: 13, playerId: 12, team_id: 4 },
        { id: 14, playerId: 13, team_id: 4 }
      ]
    )
  },

 locations = ()=> {
    return (
      [
        { id: 1, locationName: "Paddys Pub" },
        { id: 2, locationName: "Moes Tavern" },
        { id: 3, locationName: "Snakehole Lounge" },
        { id: 4, locationName: "The Drunken Clam" },
        { id: 5, locationName: "The Three Broomsticks" },
        { id: 6, locationName: "The Hogs Head" }
      ]
    )
  },

  events = ()=> {
    return (
      [
        { id: 1, eventDate: "2019-01-22", eventLocation: 1 },
        { id: 2, eventDate: "2019-01-23", eventLocation: 1 },
        { id: 3, eventDate: "2019-12-12", eventLocation: 1 },
        { id: 4, eventDate: "2019-11-11", eventLocation: 1 },
        { id: 5, eventDate: "2019-10-10", eventLocation: 3 },
        { id: 6, eventDate: "2019-09-09", eventLocation: 4 },
        { id: 7, eventDate: "2019-08-08", eventLocation: 5 },
        { id: 8, eventDate: "2019-08-07", eventLocation: 6 },
        { id: 9, eventDate: "2019-11-11", eventLocation: 2 },
        { id: 10, eventDate: "2019-12-12", eventLocation: 5 },
        { id: 11, eventDate: "2019-11-28", eventLocation: 5 },
        { id: 12, eventDate: "2019-11-21", eventLocation: 5 },
        { id: 13, eventDate: "2019-12-05", eventLocation: 5 }
        ]
    )
  },

  results = ()=> {
    return (
      [
        {
          id: 1,
          team_id: 1,
          event_id: 1,
          winnings: 0,
          outcome: "Loss",
          position: "4th"
        },
        {
          id: 2,
          team_id: 1,
          event_id: 2,
          winnings: 30,
          outcome: "Win",
          position: "1st"
        },
        {
          id: 3,
          team_id: 2,
          event_id: 1,
          winnings: 30,
          outcome: "Win",
          position: "1st"
        },
        {
          id: 4,
          team_id: 2,
          event_id: 2,
          winnings: 30,
          outcome: "Win",
          position: "1st"
        },
        {
          id: 5,
          team_id: 3,
          event_id: 3,
          winnings: 10,
          outcome: "Win",
          position: "3rd"
        },
        {
          id: 6,
          team_id: 3,
          event_id: 9,
          winnings: 10,
          outcome: "Win",
          position: "3rd"
        },
        {
          id: 7,
          team_id: 3,
          event_id: 5,
          winnings: 10,
          outcome: "Win",
          position: "3rd"
        },
        {
          id: 8,
          team_id: 3,
          event_id: 6,
          winnings: 20,
          outcome: "Win",
          position: "2nd"
        },
        {
          id: 9,
          team_id: 3,
          event_id: 7,
          winnings: 20,
          outcome: "Win",
          position: "2nd"
        },
        {
          id: 10,
          team_id: 3,
          event_id: 8,
          winnings: 30,
          outcome: "Win",
          position: "1st"
        },
        {
          id: 11,
          team_id: 4,
          event_id: 10,
          winnings: 0,
          outcome: "Loss",
          position: "4th"
        },
        {
          id: 12,
          team_id: 4,
          event_id: 13,
          winnings: 10,
          outcome: "Win",
          position: "3rd"
        },
        {
          id: 13,
          team_id: 4,
          event_id: 11,
          winnings: 10,
          outcome: "Win",
          position: "3rd"
        },
        {
          id: 14,
          team_id: 4,
          event_id: 12,
          winnings: 0,
          outcome: "Loss",
          position: "11th"
        }
      ]
    )
  },

 attendees = ()=>{
    return (
      [
        { id: 1, team_id: 1, event_id: 1, player_id: 1 },
        { id: 2, team_id: 1, event_id: 1, player_id: 2 },
        { id: 3, team_id: 1, event_id: 2, player_id: 1 },
        { id: 4, team_id: 1, event_id: 2, player_id: 2 },
        { id: 5, team_id: 1, event_id: 2, player_id: 3 },
        { id: 6, team_id: 2, event_id: 1, player_id: 1 },
        { id: 7, team_id: 2, event_id: 6, player_id: 1 },
        { id: 8, team_id: 2, event_id: 4, player_id: 1 },
        { id: 9, team_id: 2, event_id: 1, player_id: 2 },
        { id: 10, team_id: 2, event_id: 6, player_id: 2 },
        { id: 11, team_id: 2, event_id: 4, player_id: 2 },
        { id: 12, team_id: 3, event_id: 3, player_id: 7 },
        { id: 13, team_id: 3, event_id: 3, player_id: 8 },
        { id: 14, team_id: 3, event_id: 3, player_id: 9 },
        { id: 15, team_id: 3, event_id: 3, player_id: 10 },
        { id: 16, team_id: 3, event_id: 9, player_id: 7 },
        { id: 17, team_id: 3, event_id: 9, player_id: 8 },
        { id: 18, team_id: 3, event_id: 9, player_id: 9 },
        { id: 19, team_id: 3, event_id: 9, player_id: 10 },
        { id: 20, team_id: 3, event_id: 3, player_id: 7 },
        { id: 21, team_id: 3, event_id: 3, player_id: 8 },
        { id: 22, team_id: 3, event_id: 6, player_id: 7 },
        { id: 23, team_id: 3, event_id: 6, player_id: 8 },
        { id: 24, team_id: 3, event_id: 7, player_id: 7 },
        { id: 25, team_id: 3, event_id: 7, player_id: 8 },
        { id: 26, team_id: 3, event_id: 7, player_id: 9 },
        { id: 27, team_id: 3, event_id: 7, player_id: 10 },
        { id: 28, team_id: 3, event_id: 8, player_id: 7 },
        { id: 29, team_id: 3, event_id: 8, player_id: 8 },
        { id: 30, team_id: 3, event_id: 8, player_id: 9 },
        { id: 31, team_id: 3, event_id: 8, player_id: 10 },
        { id: 32, team_id: 4, event_id: 10, player_id: 11 },
        { id: 33, team_id: 4, event_id: 10, player_id: 12 },
        { id: 34, team_id: 4, event_id: 10, player_id: 13 },
        { id: 35, team_id: 4, event_id: 10, player_id: 7 },
        { id: 36, team_id: 4, event_id: 13, player_id: 11 },
        { id: 37, team_id: 4, event_id: 13, player_id: 12 },
        { id: 38, team_id: 4, event_id: 13, player_id: 13 },
        { id: 39, team_id: 4, event_id: 13, player_id: 7 },
        { id: 40, team_id: 4, event_id: 11, player_id: 11 },
        { id: 41, team_id: 4, event_id: 11, player_id: 12 },
        { id: 42, team_id: 4, event_id: 11, player_id: 13 },
        { id: 43, team_id: 4, event_id: 12, player_id: 11 },
        { id: 44, team_id: 4, event_id: 12, player_id: 12 },
        { id: 45, team_id: 4, event_id: 12, player_id: 13 }
      ]
    )
  }


}

module.exports = {seedData}