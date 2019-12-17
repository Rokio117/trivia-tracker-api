const userService = require("../users/users-service");

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

module.exports = {
  validateEvent
};
//module.exports = validatePatchTeamCodeTeam;
