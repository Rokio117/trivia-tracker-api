function validatePostSlash(req, res, next) {
  const requiredBody = [
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
  const keys = Object.keys(req.body);
  console.log(keys, "keys in validatePostSlash");
  keys.forEach(key => {
    if (!requiredBody.includes(key)) {
      let err = new Error(`Missing key '${key}' in body`);
      err.status = 400;
      next(err);
    }
    next();
  });
}
function validatePatchTeamCodeTeam(req, res, next) {
  if (!Object.keys(req.body).includes("newName")) {
    let err = new Error(`Missing key 'newName' in body`);
    err.status = 400;
    next(err);
  }
  if (req.body.newName === "" || undefined) {
    let err = new Error("no name submitted");
    err.status = 400;
    next(err);
  }
  next();
}
function validatePostTeamCodeMembers(req, res, next) {}
function validatePatchTeamCodeUserNameRole(req, res, next) {}
function validatePatchTeamCodeWinnings(req, res, next) {}
function validatePostTeamCodeEvent(req, res, next) {}

module.exports = validatePostSlash;
//module.exports = validatePatchTeamCodeTeam;
