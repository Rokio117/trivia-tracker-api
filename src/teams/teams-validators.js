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

module.exports = {
  validatePostSlash,
  validatePatchTeamCodeTeam,
  validatePostTeamCodeMembers,
  validatePatchTeamCodeUserNameRole,
  validatePatchTeamCodeWinnings,
  validatePostTeamCodeEvent
};
//module.exports = validatePatchTeamCodeTeam;
