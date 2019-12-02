const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// app.get("/api/*", (req, res) => {
//   res.json({ ok: true });
// });

app.get("/api/", (req, res) => {
  res.send("Hello, world!");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
