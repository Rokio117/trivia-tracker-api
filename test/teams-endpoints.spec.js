const knex = require("knex");
const app = require("../src/app");
const { cleanTables } = require("./helpers");
const { seedData } = require("./seedData");
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

  describe.skip(`Get /api/teams/`, () => {
    context(`Given no articles`, () => {
      it(`responds with an empty list`, () => {
        return supertest(app)
          .get(`/api/teams/`)
          .expect([]);
      });
    });
  });
});
