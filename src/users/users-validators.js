function postNewUserNoTeamKeys(req, res, next) {
  const requiredKeys = ["userName", "name", "password"];
  req.requiredKeys = requiredKeys;
  next();
}
function patchChangeUserNameKeys(req, res, next) {
  const requiredKeys = ["newUserName"];
  req.requiredKeys = requiredKeys;
  next();
}

function patchChangePlayerNameKeys(req, res, next) {
  const requiredKeys = ["name"];
  req.requiredKeys = requiredKeys;
  next();
}

function postUserWithTeamKeys(req, res, next) {
  const requiredKeys = ["name", "password", "teamCode"];
  req.requiredKeys = requiredKeys;
  next();
}

module.exports = {
  postNewUserNoTeamKeys,
  patchChangeUserNameKeys,
  patchChangePlayerNameKeys,
  postUserWithTeamKeys
};
