function validateBodyTypes(req, res, next) {
  console.log("body validator ran");
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
            let err = new Error(`${key} must be a number`);
            err.status = 400;
            next(err);
          }
        }
      } else {
        let err = new Error(`Unexpected key: '${key}' in body`);
        err.status = 400;
        next(err);
      }
    });
    next();
  }
  next();
}

function keyValidator(req, res, next) {
  requiredKeys = req.requiredKeys;
  const keys = Object.keys(req.body);
  requiredKeys.forEach(key => {
    if (!keys.includes(key)) {
      let err = new Error(`Missing key '${key}' in request body`);
      err.status = 400;
      next(err);
    }
  });
  keys.forEach(key => {
    if (req.body[key] === "" || undefined) {
      let err = new Error(`Empty key '${key}' in request body`);
      err.status = 400;
      next(err);
    }
    if (!requiredKeys.includes(key)) {
      let err = new Error(`Unnecessary key '${key}' in request body`);
      err.status = 400;
      next(err);
    }
  });
  next();
}
module.exports = {
  validateBodyTypes,
  keyValidator
};
