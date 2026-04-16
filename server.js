const express = require("express");
const path = require("path");

const app = express();

// serve static files (THIS HANDLES EVERYTHING)
app.use(express.static(path.join(__dirname, "public")));

// only root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});