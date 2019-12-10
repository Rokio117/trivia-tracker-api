const knex = require("knex");
const app = require("../src/app");
const { cleanTables } = require("./helpers");

describe("Users Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the tables", () => cleanTables(db));
  afterEach("clean up", () => cleanTables(db));
});
