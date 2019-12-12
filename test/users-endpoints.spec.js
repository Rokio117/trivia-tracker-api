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
  const expectedUsers = seedData.usersWithId();

  const testUser = {
    username: "Rokio",
    nickname: "Nick",
    password: "password"
  };
  const newUser = {
    username: "Bubba",
    password: "password",
    nickname: "hoppers"
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
  describe(`GET /api/users/:user_name/teams`, () => {
    console.log(testUser.username);
    beforeEach("insert players and teams", () => {
      return helpers.seedUsers(db, users);
    });
    beforeEach("insert players and teams", () => {
      return helpers.seedTeams(db, teams);
    });
    beforeEach("insert players and teams", () => {
      return helpers.seedMembers(db, members);
    });

    const userTeams = [
      {
        id: 1,
        teamcode: "password",
        teamname: "Well Win Again Someday",
        wins: 6,
        firstplace: 3,
        secondplace: 2,
        thirdplace: 1,
        winnings: 395
      },
      {
        id: 2,
        teamcode: "password2",
        teamname: "Paddys Pub",
        wins: 600,
        firstplace: 300,
        secondplace: 200,
        thirdplace: 100,
        winnings: 1000
      }
    ];
    it("responds with teams for user", () => {
      return supertest(app)
        .get(`/api/users/${testUser.username}/teams`)
        .expect(userTeams);
    });
  });
  describe(`POST /api/users/:user_name/teams`, () => {
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
      teamcode: password,
      nickname: newUser.nickname,
      password: newUser.password
    };

    it("responds with users teams", () => {
      return supertest(app)
        .post(`/api/users/${newuser.username}/teams`)
        .send(body)
        .expect(teams[0]);
    });
  });
});
