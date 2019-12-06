const userService = require("../users/users-service");

function validateEvent(req, res, next) {
  console.log("validateEvent ran");
  req.body.roster.forEach(player => {
    if (!userService.userExists(player)) {
      let err = new Error(`Player '${player}' was not found`);
      err.status = 400;
      next(err);
    }
  });
  const outcome = ["Win", "Loss"];
  if (!outcome.includes(req.body.outcome)) {
    let err = new Error(`outcome must be 'Win' or 'Loss'`);
    err.status = 400;
    next(err);
  }
  let numbers = [];
  for (let i = 4; i <= 30; i++) {
    numbers.push(i);
  }
  const positions = numbers.map(number => {
    if (number === 21) {
      return String(number) + "st";
    }
    if (number === 22) {
      return String(number) + "nd";
    }
    if (number === 23) {
      return String(number) + "rd";
    } else {
      return String(number) + "th";
    }
  });

  if (!positions.includes(req.body.position)) {
    let err = new Error(`Position must be one of ${positions}`);
    err.status = 400;
    next(err);
  }
  next();
}

module.exports = {
  validateEvent
};
//module.exports = validatePatchTeamCodeTeam;
