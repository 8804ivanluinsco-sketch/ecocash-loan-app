const express = require("express");
const path = require("path");

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// ROUTES (ADD THESE)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/step1.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "step1.html"));
});

app.get("/step2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "step2.html"));
});

app.get("/step3.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "step3.html"));
});

app.get("/step4.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "step4.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});