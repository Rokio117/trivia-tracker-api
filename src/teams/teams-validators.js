const userService = require("../users/users-service");

function validatePostSlash(req, res, next) {
  const requiredKeys = [
    "name",
    "teamCode",
    "members",
    "wins",
    "firstPlace",
    "secondPlace",
    "thirdPlace",
    "winnings",
    "history"
  ];
  req.requiredKeys = requiredKeys;
  next();
}

function validatePatchTeamCodeTeam(req, res, next) {
  const requiredKeys = ["newName"];
  req.requiredKeys = requiredKeys;
  next();
}

function validatePostTeamCodeMembers(req, res, next) {
  const requiredKeys = ["newMember", "role"];
  req.requiredKeys = requiredKeys;
  next();
}

function validatePatchTeamCodeUserNameRole(req, res, next) {
  const requiredKeys = ["role"];
  req.requiredKeys = requiredKeys;
  next();
}
function validatePatchTeamCodeWinnings(req, res, next) {
  const requiredKeys = ["winnings"];
  req.requiredKeys = requiredKeys;
  next();
}
function validatePostTeamCodeEvent(req, res, next) {
  const requiredKeys = [
    "date",
    "location",
    "outcome",
    "roster",
    "position",
    "winnings"
  ];
  req.requiredKeys = requiredKeys;
  next();
}

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
  validatePostSlash,
  validatePatchTeamCodeTeam,
  validatePostTeamCodeMembers,
  validatePatchTeamCodeUserNameRole,
  validatePatchTeamCodeWinnings,
  validatePostTeamCodeEvent,
  validateEvent
};
//module.exports = validatePatchTeamCodeTeam;
