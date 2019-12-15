const knex = require("knex");
const app = require("../src/app");
const { cleanTables } = require("./helpers");
const { seedData } = require("./seedData");
const { helpers } = require("./helpers");
require("dotenv").config();

describe.only("Users Endpoints", function() {
  let db;
  const users = seedData.users();
  const teams = seedData.teams();
  const members = seedData.members();
  const locations = seedData.locations();
  const events = seedData.events();
  const results = seedData.results();
  const attendees = seedData.attendees();
  const newTeam = helpers.newTeam();
  const expectedTeam = helpers.newTeam();
  before("make knex instance", () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: "pg",
      connection: process.env.DB_TEST_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the tables", () => cleanTables(db));
  afterEach("clean up", () => cleanTables(db));
  //seed tables beforeeach, if test needs clean tables clean it manually in the test
  before("seed tables", () => {
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
  describe.only(` testing /api/teams/  `, () => {
    context(`Get /api/teams/`, () => {
      it(`responds with all teams`, () => {
        return supertest(app)
          .get(`/api/teams/`)
          .expect(teams);
      });
    });
    context(`POST /api/teams/`, () => {
      console.log(newTeam, "newteam in test");
      it.only("posts new team and responds with new team object", () => {
        return supertest(app)
          .post(`/api/teams/`)
          .send(newTeam)
          .expect([expectedTeam]);
      });
    });
  });
});
