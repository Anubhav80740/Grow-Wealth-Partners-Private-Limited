import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { google } from "googleapis";

dotenv.config();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "replace-me-with-a-secret";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!MONGODB_URI) {
  console.warn("Warning: MONGODB_URI is not set in .env. MongoDB will not connect.");
}
if (!RESEND_API_KEY) {
  console.warn("Warning: RESEND_API_KEY is not set in .env. Forgot password email delivery will fail.");
}
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn("Warning: Google OAuth credentials are missing. Google sign-in will not work.");
}

mongoose.set("strictQuery", false);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  googleId: { type: String },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

function createJwtToken(userId, email) {
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "7d" });
}

async function sendResendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping email send.");
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "GrowWealth <noreply@growwealth.com>",
      to: [to],
      subject,
      html,
    }),
  });
}

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
    });

    const token = createJwtToken(user._id, user.email);

    await sendResendEmail({
      to: user.email,
      subject: "Welcome to GrowWealth",
      html: `<p>Hi ${user.name},</p><p>Welcome to GrowWealth! Your account has been created successfully.</p>`,
    });

    return res.json({ message: "Account created.", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create account." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = createJwtToken(user._id, user.email);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to log in." });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ message: "If that email is registered, a reset link has been sent." });
    }

    const token = crypto.randomBytes(24).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60);
    await user.save();

    const resetUrl = `${CLIENT_URL}/login?resetToken=${encodeURIComponent(token)}&email=${encodeURIComponent(user.email)}`;

    await sendResendEmail({
      to: user.email,
      subject: "Reset your GrowWealth password",
      html: `<p>Hi ${user.name || "there"},</p><p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in one hour.</p>`,
    });

    return res.json({ message: "A password reset link was sent if that email exists." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to send reset link." });
  }
});

app.get("/api/auth/google", (req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(500).send("Google OAuth is not configured.");
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `http://localhost:${PORT}/api/auth/google/callback`
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "profile", "email"],
  });

  res.redirect(authUrl);
});

app.get("/api/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send("Missing code from Google callback.");
    }

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      `http://localhost:${PORT}/api/auth/google/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const profile = await oauth2.userinfo.get();
    const payload = profile.data;

    if (!payload.email) {
      return res.status(400).send("Google account did not return an email address.");
    }

    let user = await User.findOne({ email: payload.email.toLowerCase() });
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email.toLowerCase(),
        googleId: payload.id,
      });
    } else if (!user.googleId) {
      user.googleId = payload.id;
      await user.save();
    }

    const token = createJwtToken(user._id, user.email);
    const redirectUrl = `${CLIENT_URL}/dashboard?token=${encodeURIComponent(token)}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Google authentication failed.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
