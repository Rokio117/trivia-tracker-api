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
      let err = new Error(`Unnecessary key '${key}' in body`);
      err.status = 400;
      next(err);
    }
  });
  requiredBody.forEach(key => {
    if (!keys.includes(key)) {
      let err = new Error(`Missing key '${key}' in body`);
      err.status = 400;
      next(err);
    }
  });
  next();
}

function validatePatchTeamCodeTeam(req, res, next) {
  const keys = Object.keys(req.body);
  if (!keys.includes("newName")) {
    let err = new Error(`Missing key 'newName' in body`);
    err.status = 400;
    next(err);
  }
  if (req.body.newName === "" || undefined) {
    let err = new Error("no name submitted");
    err.status = 400;
    next(err);
  }
  keys.forEach(key => {
    if (key !== "newName") {
      let err = new Error(`Unnecessary key '${key}' in body`);
      err.status = 400;
      next(err);
    }
  });
  next();
}

function validatePostTeamCodeMembers(req, res, next) {
  const keys = Object.keys(req.body);
  const requiredKeys = ["newMember", "role"];
  requiredKeys.forEach(key => {
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

function validatePatchTeamCodeUserNameRole(req, res, next) {
  const keys = Object.keys(req.body);
  const requiredKeys = ["role"];
  requiredKeys.forEach(key => {
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
function validatePatchTeamCodeWinnings(req, res, next) {
  const keys = Object.keys(req.body);
  const requiredKeys = ["winnings"];
  requiredKeys.forEach(key => {
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
function validatePostTeamCodeEvent(req, res, next) {
  const keys = Object.keys(req.body);
  const requiredKeys = [
    "date",
    "location",
    "outcome",
    "roster",
    "position",
    "winnings"
  ];
  requiredKeys.forEach(key => {
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
