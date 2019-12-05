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
}

function validatePatchTeamCodeTeam(req, res, next) {
  const requiredKeys = ["newName"];
  req.requiredKeys = requiredKeys;
}

function validatePostTeamCodeMembers(req, res, next) {
  const requiredKeys = ["newMember", "role"];
  req.requiredKeys = requiredKeys;
}

function validatePatchTeamCodeUserNameRole(req, res, next) {
  const requiredKeys = ["role"];
  req.requiredKeys = requiredKeys;
}
function validatePatchTeamCodeWinnings(req, res, next) {
  const requiredKeys = ["winnings"];
  req.requiredKeys = requiredKeys;
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
}

function keyValidator(req, res, next) {
  const keys = Object.keys(req.body);
  req.requiredKeys.forEach(key => {
    if (!keys.includes(key)) {
      let err = new Error(`Missing key '${key}' in body`);
      err.status = 400;
      next(err);
    }
  });
  keys.forEach(key => {
    if (req.body[key] === "" || undefined) {
      let err = new Error(`Empty key '${key}' in body`);
      err.status = 400;
      next(err);
    }
    if (!requiredKeys.includes(key)) {
      let err = new Error(`Unnecessary key '${key}' in body`);
      err.status = 400;
      next(err);
    }
  });
  next();
}

module.exports = {
  validatePostSlash,
  validatePatchTeamCodeTeam,
  validatePostTeamCodeMembers,
  validatePatchTeamCodeUserNameRole,
  validatePatchTeamCodeWinnings,
  validatePostTeamCodeEvent,
  keyValidator
};
//module.exports = validatePatchTeamCodeTeam;
