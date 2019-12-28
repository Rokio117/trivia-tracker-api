const knex = require("knex");
const app = require("../src/app");
const { cleanTables } = require("./helpers");
const { seedData } = require("./seedData");
const { helpers } = require("./helpers");
const jwt = require("jsonwebtoken");
const { authService } = require("../src/authService");
require("dotenv").config();

describe("auth endpoints", function() {
  let db;
  const users = seedData.users();
  const teams = seedData.teams();
  const members = seedData.members();
  const locations = seedData.locations();
  const events = seedData.events();
  const results = seedData.results();
  const attendees = seedData.attendees();
  const config = require("../src/config");
  before("make knex instance", () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: "pg",
      connection: process.env.DB_TEST_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the tables", () => {
    console.log("clean tables before ran");
    return cleanTables(db);
  });
  afterEach("clean up", () => {
    console.log("afterEach clean up tables ran");
    return cleanTables(db);
  });
  //seed tables beforeeach, if test needs clean tables clean it manually in the test
  beforeEach("seed tables", () => {
    return helpers.seedAllTables(
      db,
      users,
      teams,
      members,
      locations,
      events,
      results,
      attendees
    );
  });
  describe.only(`POST /api/auth/login`, () => {
    context("happy case", () => {
      it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
          username: "Rokio",
          password: "password"
        };
        const expectedToken = jwt.sign(
          { userid: 1 }, // payload
          config.JWT_SECRET, //this is different than the one in auth-endpoint
          {
            subject: "Rokio",
            algorithm: "HS256"
          }
        );

        console.log(config.JWT_SECRET, "jwt secret in test");
        return supertest(app)
          .post(`/api/auth/login`)
          .send(userValidCreds)
          .expect(200, {
            authToken: expectedToken
          });
      });
    });
  });
});
