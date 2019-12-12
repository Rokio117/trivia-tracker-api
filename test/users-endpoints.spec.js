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
  describe(`POST /api/users/`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const newUser = {
      username: "Bubba",
      password: "password",
      nickname: "hoppers"
    };
    const newUserWithId = [
      {
        id: 14,
        username: "Bubba",
        password: "password",
        nickname: "hoppers"
      }
    ];
    it(`responds with array of users with new user included`, () => {
      return supertest(app)
        .post(`/api/users/`)
        .send(newUser)
        .expect(newUserWithId);
    });
  });
  describe(`GET  /api/:user_name`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const user = {
      id: 1,
      username: "Rokio",
      password: "password",
      nickname: "Nick"
    };
    const newusername = "newusername";
    const newUserObject = {
      id: 1,
      username: "newusername",
      password: "password",
      nickname: "Nick"
    };
    it("Returns user object when real user is entered", () => {
      return supertest(app)
        .get(`/api/users/${user.username}`)
        .expect([user]);
    });
  });
  describe(`PATCH /api/:user_name`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const user = {
      id: 1,
      username: "Rokio",
      password: "password",
      nickname: "Nick"
    };
    const newusername = "newusername";
    const newUserObject = {
      id: 1,
      username: "newusername",
      password: "password",
      nickname: "Nick"
    };
    it("responds with new username", () => {
      return supertest(app)
        .patch(`/api/users/${user.username}`)
        .send({ newusername: newusername })
        .expect([newUserObject]);
    });
  });
  describe.only(`GET /api/users/:user_name/teams`);
  before("insert players and teams", () => {
    helpers.seedUsers(db, users);
    helpers.seedTeams(db, teams);
  });
});
