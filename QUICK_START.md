# 🚀 Quick Start Guide - Authentication System

Your GrowWealth app already has a complete authentication system! Here's how to get it running.

---

## ⚡ 5-Minute Setup

### 1. Create `.env` File
```bash
cp .env.example .env
```

### 2. Fill in Your Credentials

Open `.env` and add:

```env
# Database - Get from MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grow_wealth_db

# JWT Secret - Generate any random string
JWT_SECRET=your-random-secret-key-change-this

# Email Service - Get from Resend (https://resend.com/dashboard/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Google OAuth - Get from Google Cloud Console (https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 3. Start the Servers

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 4. Test It!
Open `http://localhost:5173` and click **Sign Up** or **Log In**

---

## 🔑 Get Your Credentials

| Service | Steps | Free Tier |
|---------|-------|-----------|
| **MongoDB** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | ✅ Yes |
| **Google OAuth** | [Google Cloud Console](https://console.cloud.google.com/) | ✅ Yes |
| **Resend Email** | [Resend](https://resend.com) | ✅ Yes (limited) |

### Step-by-Step for Each Service:

#### 📦 MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create free cluster
3. Create database user (username/password)
4. Get connection string
5. Copy to `.env` as `MONGODB_URI`

#### 🔐 Google OAuth
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized URIs:
   - `http://localhost:3000`
   - `http://localhost:5173`
6. Add callback URL:
   - `http://localhost:3000/api/auth/google/callback`
7. Copy Client ID and Client Secret to `.env`

**Full guide:** See `GOOGLE_OAUTH_SETUP.md`

#### 📧 Resend
1. Go to https://resend.com
2. Sign up → Get API key
3. Copy to `.env` as `RESEND_API_KEY`

---

## ✅ What's Already Built

Your app has all these features ready to use:

### 🔑 Login Page
- Email & password login
- **Google OAuth login** 
- Forgot password link
- Sign up link

### 📝 Sign Up Page
- 3-step sign up process
  1. Personal details (name, email, phone)
  2. Password setup
  3. Success screen
- Welcome email sent automatically
- Automatically logs in user

### 🔑 Forgot Password
- Enter email → Get reset link via email
- Reset link works for 1 hour
- Password reset confirmation
- Works with Resend email service

### 👤 Google OAuth
- Click "Continue with Google"
- Auto-creates account if new user
- Links to existing account if found

---

## 📁 Files in Your Project

```
.env                            ← Your secrets (DO NOT COMMIT)
.env.example                    ← Template to copy from
AUTHENTICATION_SETUP.md         ← Detailed setup guide
GOOGLE_OAUTH_SETUP.md          ← Google OAuth step-by-step
QUICK_START.md                 ← This file

server.js                       ← Backend API (all endpoints working)
src/pages/LoginPage.jsx        ← Login with Google OAuth button
src/pages/SignupPage.jsx       ← 3-step signup form
```

---

## 🧪 Test Checklist

- [ ] **Sign Up** with email/password
- [ ] **Check your email** for welcome message
- [ ] **Log In** with credentials
- [ ] **Sign Up via Google** (or Log In via Google)
- [ ] **Forgot Password** → Check email for link
- [ ] **Reset Password** with new password
- [ ] **Log In** with new password

---

## 🐛 Common Issues

| Issue | Fix |
|-------|-----|
| MongoDB connection fails | Check `MONGODB_URI` in `.env` and MongoDB status |
| Google OAuth shows "Invalid Client" | Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct |
| Email not received | Check `RESEND_API_KEY` and spam folder |
| "Cannot find module" error | Run `npm install` |

---

## 🚢 Ready for Production?

Before deploying:

1. Update `.env` with production URLs
2. Generate strong `JWT_SECRET`
3. Use production MongoDB cluster
4. Add domain to Google OAuth console
5. Verify domain in Resend
6. Use HTTPS URLs everywhere

---

## 📚 Need More Details?

- **Full Setup Guide:** `AUTHENTICATION_SETUP.md`
- **Google OAuth Detailed:** `GOOGLE_OAUTH_SETUP.md`
- **Email Issues:** Check Resend dashboard
- **Database Issues:** Check MongoDB Atlas

---

## 🎯 Next Features to Add

- [ ] User profile page
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Social login (GitHub, LinkedIn)
- [ ] Password strength meter
- [ ] Login history/sessions

---

**Everything is ready! Just add your API keys to `.env` and run it.** 🚀

Questions? Check the detailed guides above!
