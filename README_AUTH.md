# 🔐 GrowWealth Authentication System

Complete authentication system with login, signup, Google OAuth, and password reset.

---

## 🎯 Quick Overview

Your app has a **fully functional authentication system** with:

```
┌─────────────────────────────────────────────────────┐
│  FRONTEND (React)                                   │
├─────────────────────────────────────────────────────┤
│  • LoginPage.jsx     - Email/password login        │
│  • SignupPage.jsx    - 3-step registration         │
│  • DashboardPage.jsx - Protected area              │
└────────────────┬────────────────────────────────────┘
                 │ API Calls (Axios/Fetch)
                 ▼
┌─────────────────────────────────────────────────────┐
│  BACKEND (Express.js)                               │
├─────────────────────────────────────────────────────┤
│  • /api/auth/signup           ✅ Create account     │
│  • /api/auth/login            ✅ Login              │
│  • /api/auth/forgot-password  ✅ Reset link        │
│  • /api/auth/google           ✅ OAuth login       │
│  • /api/auth/google/callback  ✅ OAuth callback    │
└────────────────┬────────────────────────────────────┘
                 │ Database & Email
                 ▼
┌─────────────────────────────────────────────────────┐
│  EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────┤
│  • MongoDB        - User data storage               │
│  • Google OAuth   - Social login                    │
│  • Resend         - Transactional emails            │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Get Started in 3 Steps

### 1️⃣ Copy Template
```bash
cp .env.example .env
```

### 2️⃣ Get Your Keys
| Service | Where to Get | Time |
|---------|--------------|------|
| MongoDB | https://www.mongodb.com/cloud/atlas | 5 min |
| Google | https://console.cloud.google.com | 10 min |
| Resend | https://resend.com | 2 min |

### 3️⃣ Run It
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

Visit `http://localhost:5173` ✅

---

## 📖 Documentation

| Document | Duration | Content |
|----------|----------|---------|
| **QUICK_START.md** | 5 min | Essential steps only |
| **SETUP_INSTRUCTIONS.md** | 10 min | Complete overview |
| **ENV_VARIABLES_GUIDE.md** | 15 min | All variables explained |
| **AUTHENTICATION_SETUP.md** | 20 min | Detailed walkthrough |
| **GOOGLE_OAUTH_SETUP.md** | 15 min | Google OAuth step-by-step |

**👉 Start with QUICK_START.md**

---

## 🔑 Required Environment Variables

```env
# Server
PORT=3000
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grow_wealth_db

# Security
JWT_SECRET=generate-random-32-character-string

# Email
RESEND_API_KEY=re_your_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## ✨ Features

### 🔐 Sign Up
- 3-step signup flow
- Name, email, phone
- Password validation (8+ chars)
- Welcome email sent automatically
- Auto-login after signup

### 🔑 Login
- Email & password login
- "Forgot password" link
- Sign up link
- Session token stored
- Dashboard access

### 👤 Google OAuth
- "Continue with Google" button
- Auto-creates account on first login
- Links to existing account
- One-click login
- No password needed

### 🔄 Password Reset
- Send reset link via email
- Link valid for 1 hour
- Secure token-based reset
- New password confirmation

---

## 📁 File Structure

```
src/pages/
├── LoginPage.jsx          ← Login + forgot password
├── SignupPage.jsx         ← 3-step registration
├── DashboardPage.jsx      ← Protected dashboard
└── HomePage.jsx           ← Home

server.js                  ← All API endpoints

.env                       ← Your secrets (DO NOT COMMIT)
.env.example               ← Template to copy from

Guides/
├── QUICK_START.md              ← Start here!
├── SETUP_INSTRUCTIONS.md       ← Complete guide
├── AUTHENTICATION_SETUP.md     ← Detailed walkthrough
├── ENV_VARIABLES_GUIDE.md      ← All variables
├── GOOGLE_OAUTH_SETUP.md       ← Google OAuth
└── README_AUTH.md              ← This file
```

---

## 🔗 API Endpoints

### Sign Up
```
POST /api/auth/signup
Body: { name, email, phone, password }
Response: { message, token }
```

### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token }
```

### Forgot Password
```
POST /api/auth/forgot-password
Body: { email }
Response: { message }
```

### Google OAuth
```
GET /api/auth/google
→ Redirects to Google login
```

### Google OAuth Callback
```
GET /api/auth/google/callback?code=...
→ Creates/updates user
→ Returns JWT token
→ Redirects to dashboard
```

---

## 🧪 Testing

### Test All Features
1. **Sign Up** - Create account
2. **Email** - Check inbox
3. **Login** - Log in with credentials
4. **Google** - Try "Continue with Google"
5. **Forgot Password** - Request reset link
6. **Reset** - Create new password

---

## 🐛 Troubleshooting

### MongoDB Won't Connect
```
Check: MONGODB_URI format, cluster running, IP whitelist
```

### Google OAuth "Invalid Client"
```
Check: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET exactly match
```

### Emails Not Sending
```
Check: RESEND_API_KEY is valid, not in spam, under quota
```

### "Cannot find module"
```
Solution: npm install
```

See **SETUP_INSTRUCTIONS.md** for more troubleshooting.

---

## 🔒 Security Notes

- ✅ `.env` is in `.gitignore` - safe from Git
- ✅ Passwords hashed with bcryptjs
- ✅ Tokens valid for 7 days
- ✅ Reset links valid for 1 hour
- ✅ No sensitive data in localStorage

**Before production:**
- Generate new `JWT_SECRET`
- Update `CLIENT_URL` to your domain
- Update Google OAuth URLs
- Use HTTPS only
- Rotate API keys regularly

---

## 📚 Service Documentation

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google OAuth](https://console.cloud.google.com)
- [Resend](https://resend.com)
- [JWT.io](https://jwt.io)
- [Express.js](https://expressjs.com)
- [React](https://react.dev)

---

## ✅ What You Get

- ✅ Complete authentication system
- ✅ Email validation
- ✅ Password reset
- ✅ Google OAuth
- ✅ JWT tokens
- ✅ MongoDB integration
- ✅ Error handling
- ✅ Email notifications

---

## 🎯 Next Steps

1. Read **QUICK_START.md** (5 min)
2. Get your API keys (20 min)
3. Fill `.env` file (5 min)
4. Run the servers (2 min)
5. Test all features (5 min)

**Total: ~40 minutes to full working authentication!**

---

## 🆘 Still Stuck?

1. Check the relevant guide above
2. Read SETUP_INSTRUCTIONS.md troubleshooting
3. Verify all `.env` variables are filled correctly
4. Check browser console (F12) for errors
5. Check server terminal for error messages

---

**Everything you need is already built. Just add your API keys!** 🚀

👉 **Start with QUICK_START.md →**
