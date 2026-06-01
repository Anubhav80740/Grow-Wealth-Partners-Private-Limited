# 🔐 GrowWealth Authentication System Setup Guide

This guide walks you through setting up the complete authentication system with Login, Sign Up, Google OAuth, and Password Reset functionality.

---

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [MongoDB Setup](#mongodb-setup)
3. [Google OAuth Setup](#google-oauth-setup)
4. [Resend Email Setup](#resend-email-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Features](#testing-the-features)

---

## Environment Setup

### Step 1: Create `.env` File

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and you'll see:
   ```env
   PORT=3000
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   RESEND_API_KEY=your-resend-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

---

## 🗄️ MongoDB Setup

MongoDB is used to store user accounts, passwords, and reset tokens.

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED

**Best for:** Production and development

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project called "GrowWealth"
4. Build a cluster (choose the free tier)
5. Create a database user:
   - Click **Database Access** → **Add New Database User**
   - Username: `growwealth_user`
   - Password: Generate a strong password
   - Click **Add User**

6. Get your connection string:
   - Click **Database** → **Connect**
   - Choose **Drivers**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `grow_wealth_db`

7. Add to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://growwealth_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/grow_wealth_db?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

**Best for:** Local development only

1. Download & install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   - Windows: `mongod`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. Add to `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/grow_wealth_db
   ```

---

## 🔐 Google OAuth Setup

See **GOOGLE_OAUTH_SETUP.md** in the project root for detailed step-by-step instructions.

Quick summary:
1. Create Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs
5. Copy credentials to `.env`

---

## 📧 Resend Email Setup

Resend is used for the "Forgot Password" feature.

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain (or use `noreply@resend.dev` for testing)
4. Go to **Dashboard** → **API Keys**
5. Copy your API Key
6. Add to `.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Verify Your Domain (Optional but Recommended)

1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., `noreply@growwealth.com`)
3. Follow the DNS verification instructions
4. Update server.js to use your domain:
   ```javascript
   from: "GrowWealth <noreply@growwealth.com>", // Change this
   ```

---

## 🚀 Running the Application

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Backend Server

In one terminal:
```bash
npm run server
```

You should see:
```
Server is running on http://localhost:3000
MongoDB connected
```

### Step 3: Start the Frontend Development Server

In another terminal:
```bash
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

---

## ✅ Testing the Features

### Test 1: Sign Up with Email & Password

1. Open `http://localhost:5173`
2. Click **"Sign Up"**
3. Fill in:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+91 98765 43210`
   - Password: `SecurePassword123`
4. Click **Continue** through the steps
5. You should see the success screen
6. Check your email for the welcome message

### Test 2: Login with Credentials

1. Click **"Log In"**
2. Enter your email and password
3. Click **Log In**
4. You should be redirected to the dashboard

### Test 3: Google OAuth Login

1. Click **"Log In"** (or **"Sign Up"**)
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. You should be redirected to the dashboard

### Test 4: Forgot Password

1. Click **"Log In"**
2. Click **"Forgot password?"**
3. Enter your email
4. Click **"Send Reset Link"**
5. Check your email for the reset link
6. Click the link and reset your password

---

## 📁 File Structure

```
src/
├── pages/
│   ├── LoginPage.jsx          ← Login form with Google OAuth
│   ├── SignupPage.jsx         ← 3-step signup flow
│   ├── DashboardPage.jsx      ← Protected page after login
│   └── ...
└── ...

server.js                        ← Backend API endpoints
.env                             ← Your secret keys (DO NOT COMMIT)
.env.example                     ← Template for .env
GOOGLE_OAUTH_SETUP.md           ← Detailed Google OAuth guide
AUTHENTICATION_SETUP.md         ← This file
```

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/forgot-password` | Send password reset email |
| GET | `/api/auth/google` | Start Google OAuth flow |
| GET | `/api/auth/google/callback` | Google OAuth callback |

---

## 🛡️ Security Best Practices

1. **Never commit `.env` to git:**
   - It's already in `.gitignore`
   - Never share your secret keys

2. **Use strong JWT_SECRET:**
   ```bash
   # Generate a strong random string
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Keep credentials safe:**
   - Rotate your keys periodically
   - Use different keys for dev/prod
   - Never log sensitive data

4. **For production:**
   - Use HTTPS only
   - Set secure cookie flags
   - Enable rate limiting on endpoints
   - Add CSRF protection

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongoDB connection error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running. Check `.env` for correct `MONGODB_URI`.

### Google OAuth Error: "Invalid Client"
**Solution:** Make sure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct in `.env`.

### Email Not Sending
**Solution:** Check `RESEND_API_KEY` is set and valid. Check your email spam folder.

### "Token is invalid" on Password Reset
**Solution:** Reset links expire after 1 hour. Request a new one.

---

## 📚 Next Steps

1. ✅ Complete this setup guide
2. ✅ Test all authentication features
3. ✅ Add profile completion flow
4. ✅ Implement account settings
5. ✅ Add 2FA (Two-Factor Authentication)
6. ✅ Deploy to production

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the detailed guides (GOOGLE_OAUTH_SETUP.md)
3. Check browser console for errors
4. Check server logs for API errors

Good luck! 🚀
