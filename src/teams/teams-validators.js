function validateBodyTypes(req, res, next) {
  const possibleStringKeys = [
    "name",
    "teamCode",
    "newName",
    "newMember",
    "userName",
    "role",
    "location",
    "outcome",
    "password",
    "newUserName",
    "position",
    "date"
  ];
  const possibleNumberKeys = [
    "wins",
    "firstPlace",
    "secondPlace",
    "thirdPlace",
    "winnings"
  ];
  const possibleArrayKeys = ["history", "roster", "members"];
  const allPossibleKeys = [
    ...possibleStringKeys,
    ...possibleNumberKeys,
    ...possibleArrayKeys
  ];
  if (req.body && req.body !== {}) {
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if (allPossibleKeys.includes(key)) {
        if (possibleStringKeys.includes(key)) {
          if (typeof req.body[key] !== "string") {
            let err = new Error(`${key} must be a string`);
            err.status = 400;
            next(err);
          }
        }
        if (possibleArrayKeys.includes(key)) {
          if (!Array.isArray(req.body[key])) {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            next(err);
          }
        }
        if (possibleNumberKeys.includes(key)) {
          if (typeof req.body[key] !== "number") {
            let err = new Error(`${key} must be an array`);
            err.status = 400;
            next(err);
          }
        }
      } else {
        let err = new Error(`Unexpected key: ${key} in body`);
        err.status = 400;
        next(err);
      }
    });
    next();
  }
  next();
}

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

module.exports = validateBodyTypes;
module.exports = validatePostSlash;
module.exports = validatePatchTeamCodeTeam;
//module.exports = validatePatchTeamCodeTeam;
