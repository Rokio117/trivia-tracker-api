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
  const expectedTeam = helpers.expectedTeam();
  const testTeam = helpers.testTeam();
  const expectedTeams = helpers.expectedTeams();
  const expectedMembers = helpers.expectedMembers();
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
  describe(` testing /api/teams/  `, () => {
    context(`Get /api/teams/`, () => {
      it(`responds with all teams`, () => {
        return supertest(app)
          .get(`/api/teams/`)
          .expect(expectedTeams);
      });
    });
    context(`POST /api/teams/`, () => {
      it("posts new team and responds with new team object", () => {
        return supertest(app)
          .post(`/api/teams/`)
          .send(newTeam)
          .expect([expectedTeam]);
      });
    });
  });
  describe(`test /api/teams/:team_code/team`, () => {
    context(`GET /api/teams/:team_code/team`, () => {
      const expected = { id: 1, ...testTeam };
      it(`Gets team object from team code`, () => {
        return supertest(app)
          .get(`/api/teams/${testTeam.teamcode}/team`)
          .expect([expected]);
      });
    });
    context(`POST /api/teams/:team_code/team`, () => {
      it(`Changes team name and responds with new team object`, () => {
        const newTeamname = {
          newname: "This is Why We Can't Have Nice Things"
        };
        const nameBuilder = { teamname: newTeamname.newname };
        const expectedNewName = { ...testTeam, ...nameBuilder, id: 1 };
        return supertest(app)
          .patch(`/api/teams/${testTeam.teamcode}/team`)
          .send(newTeamname)
          .expect([expectedNewName]);
      });
    });
  });
  describe(`test /api/teams/:team_code/members`, () => {
    context(`GET /:team_code/members`, () => {
      it("gets members of the team", () => {
        return supertest(app)
          .get(`/api/teams/:${testTeam.teamcode}`)
          .expect(expectedMembers);
      });
    });
  });
});
