const knex = require("knex");
const app = require("../src/app");
const { helpers } = require("./helpers");
const { seedData } = require("./seedData");
const { cleanTables } = require("./helpers");
require("dotenv").config();

describe("Users Endpoints", function() {
  let db;
  const users = seedData.users();
  const teams = seedData.teams();
  const members = seedData.members();
  const locations = seedData.locations();
  const events = seedData.events();
  const results = seedData.results();
  const attendees = seedData.attendees();
  const expectedUsers = seedData.usersWithId();
  const expectedUserTeams = seedData.expectedUserTeams();
  const { makeAuthHeader } = require("./helpers");

  const testUser = {
    username: "Rokio",
    nickname: "Nick",
    password: "password"
  };
  const newUser = {
    username: "Bubba",
    password: "password",
    nickname: "Bubba"
  };
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
    return cleanTables(db);
  });
  afterEach("clean up", () => {
    console.log("after cleantables ran");
    return cleanTables(db);
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
          .expect(expectedUsers);
      });
    });
  });
  describe(`POST /api/users/`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));

    const newUserWithId = [
      {
        id: 14,
        username: "Bubba",
        password: "password",
        nickname: "Bubba"
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
    const userNameandPassword = { username: "Rokio", password: "password" };
    it("responds with new username", () => {
      return supertest(app)
        .patch(`/api/users/${user.username}`)
        .set(`Authorization`, makeAuthHeader(userNameandPassword))
        .send({ newusername: newusername })
        .expect([newUserObject]);
    });
  });

  describe(`POST /api/users/:user_name/teams`, () => {
    beforeEach("check the members table", () => {
      return db
        .select("*")
        .from("members")
        .then(members =>
          console.log(members, "members in beforeEach of /user_name/teams")
        );
    });
    beforeEach("insert players and teams", () => {
      return helpers.seedUsers(db, users);
    });
    beforeEach("insert players and teams", () => {
      return helpers.seedTeams(db, teams);
    });
    beforeEach("insert players and teams", () => {
      return helpers.seedMembers(db, members);
    });

    const body = {
      teamcode: "password",
      nickname: "Bubba",
      password: "password"
    };
    const expected = { id: 16, player_id: 14, team_id: 1, role: "Member" };

    it("responds with users teams", () => {
      return supertest(app)
        .post(`/api/users/Bubba/teams`)
        .send(body)
        .expect([expected]);
    });
  });
  describe("GET /api/users/:user_name/name", () => {
    beforeEach("insert players ", () => {
      return helpers.seedUsers(db, users);
    });
    it("responds with player name", () => {
      return supertest(app)
        .get(`/api/users/Rokio/name`)
        .expect([{ nickname: "Nick" }]);
    });
  });
  describe("PATCH /api/users:user_name/name", () => {
    beforeEach("insert players ", () => {
      return helpers.seedUsers(db, users);
    });
    const userNameandPassword = { username: "Rokio", password: "password" };
    const expected = {
      id: 1,
      username: "Rokio",
      nickname: "Donald",
      password: "password"
    };
    it("responds with new player info", () => {
      return supertest(app)
        .patch(`/api/users/Rokio/name`)
        .set(`Authorization`, makeAuthHeader(userNameandPassword))
        .send({ nickname: "Donald" })
        .expect([expected]);
    });
  });
});
