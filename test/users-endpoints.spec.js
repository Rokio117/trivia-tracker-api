const knex = require("knex");
const app = require("../src/app");
const { helpers } = require("./helpers");
const { seedData } = require("./seedData");
const { cleanTables } = require("./helpers");
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
  before("clean the tables", () => {
    console.log("before cleantables ran");
    cleanTables(db);
  });
  afterEach("clean up", () => {
    console.log("after cleantables ran");
    cleanTables(db);
  });

  describe(`Get /api/users/`, () => {
    context(`Given no players`, () => {
      it(`responds with an empty list`, () => {
        return supertest(app)
          .get(`/api/users/`)
          .expect([]);
      });
    });
    context(`Given players`, () => {
      beforeEach("insert users", () => helpers.seedUsers(db, users));
      it(`responds with expected players`, () => {
        return supertest(app)
          .get(`/api/users/`)
          .expect(users);
      });
    });
  });
  describe.only(`POST /api/users`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const newUser = {
      userName: "Hopicoy",
      password: "password",
      nickName: "hoppers"
    };
    const expectedUsers = [...users, newUser];
    it(`responds with array of users with new user included`, () => {
      return supertest(app)
        .post(`/api/users/`)
        .send(newUser)
        .expect(expectedUsers);
    });
  });
});
