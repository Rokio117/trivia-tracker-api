const express = require("express");

function validateParamTypes(req, res, next) {
  const keys = Object.keys(req.params);
  keys.forEach(key => {
    if (key === "team_code" || "user_name") {
      if (typeof req.params[key] !== "string") {
        let err = new Error(` ${key} must be a string`);
        err.status = 400;
        next(err);
      }
      next();
    }
  });
}

function validateBodyTypes(req, res, next) {
  const possibleStringKeys = [
    "name",
    "teamCode",
    "members",
    "newName",
    "newMember",
    "userName",
    "role",
    "location",
    "outcome"
  ];
  const possibleNumberKeys = [
    "wins",
    "firstPlace",
    "secondPlace",
    "thirdPlace",
    "winnings"
  ];
  const possibleArrayKeys = ["history", "roster", "position"];
  const allPossibleKeys = [
    ...possibleStringKeys,
    ...possibleNumberKeys,
    ...possibleArrayKeys
  ];
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
        if (typeof req.body[key] !== "array") {
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
      let err = new Error(`Incorrect key: ${key} in body`);
      err.status = 400;
      next(err);
    }
  });
  next();
}

module.exports = validateParamTypes;
