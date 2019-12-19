const userService = require("../users/users-service");
const teamsService = require("./teams-service");
function validateEvent(req, res, next) {
  console.log("validateEvent ran");

  userService.getAllusers(req.app.get("db")).then(userlist => {
    const usernames = userlist.map(userobject => userobject.username);
    console.log(usernames);
    req.body.roster.forEach(player => {
      if (!usernames.includes(player)) {
        console.log("member error");
        let err = new Error(`Player '${player}' was not found`);
        err.status = 400;
        return next(err);
      }
    });
  });
  const outcome = ["Win", "Loss"];
  if (!outcome.includes(req.body.outcome)) {
    console.log("outcome error");
    let err = new Error(`outcome must be 'Win' or 'Loss'`);
    err.status = 400;
    return next(err);
  }
  let numbers = [];
  for (let i = 1; i <= 30; i++) {
    numbers.push(i);
  }
  const positions = numbers.map(number => {
    if (number === 21 || number === 1) {
      return String(number) + "st";
    }
    if (number === 22 || number === 2) {
      return String(number) + "nd";
    }
    if (number === 23 || number === 3) {
      return String(number) + "rd";
    } else {
      return String(number) + "th";
    }
  });

  if (!positions.includes(req.body.position)) {
    console.log("position error");
    let err = new Error(`Position must be one of ${positions}`);
    err.status = 400;
    return next(err);
  }
  next();
}

function checkForDuplicateEvent(req, res, next) {
  const { date, location } = req.body;
  const newEvent = {
    eventdate: date,
    eventlocation: location
  };
  teamsService
    .findOrInsertLocation(req.app.get("db"), location)
    .then(locationId => {
      teamsService
        .getAllEventsForTeam(req.app.get("db"), req.params.team_code)
        .then(eventList => {
          eventList.forEach(event => {
            console.log(event.eventdate === newEvent.eventdate);
            console.log(event.eventlocation === locationId);
            const matchingDates = event.eventdate === newEvent.eventdate;
            const matchingLocations = event.eventlocation === locationId;
            if (matchingDates && matchingLocations) {
              console.log("if statement returnd true");
              let err = new Error(
                `Event with date '${newEvent.eventdate}' and location '${newEvent.eventlocation}' already exists`
              );
              err.status = 400;
              return next(err);
            }
          });
          console.log("bottom next ran");
          return next();
        });
    });
}

module.exports = {
  validateEvent,
  checkForDuplicateEvent
};
//module.exports = validatePatchTeamCodeTeam;
