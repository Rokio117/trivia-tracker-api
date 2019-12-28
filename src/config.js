module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  DB_URL:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_URL
      : process.env.DB_URL
};
