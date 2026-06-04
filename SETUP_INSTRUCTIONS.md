# 🚀 GrowWealth Authentication System - Complete Setup

Welcome! Your authentication system is **ready to use**. This guide will help you get everything working in minutes.

---

## 📖 Documentation Files

Read these in order:

1. **QUICK_START.md** ← Start here! (5 minutes)
2. **ENV_VARIABLES_GUIDE.md** ← Get all your API keys
3. **AUTHENTICATION_SETUP.md** ← Detailed setup guide
4. **GOOGLE_OAUTH_SETUP.md** ← Google OAuth step-by-step
5. **This file** ← Overview & troubleshooting

---

## ⚡ Super Quick Start (2 Steps)

### Step 1: Create `.env` File
```bash
cp .env.example .env
```

### Step 2: Fill with Your Keys
Open `.env` and add your:
- `MONGODB_URI` (from MongoDB Atlas)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` (from Google Cloud)
- `RESEND_API_KEY` (from Resend)
- `JWT_SECRET` (generate random string)

### Step 3: Run It
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

Visit `http://localhost:5173` and test it! ✅

---

## 🔐 What's Already Built

### ✅ Features Included

| Feature | Status | Location |
|---------|--------|----------|
| Email & Password Sign Up | ✅ Ready | `src/pages/SignupPage.jsx` |
| Email & Password Login | ✅ Ready | `src/pages/LoginPage.jsx` |
| Google OAuth Login | ✅ Ready | Built-in with Google button |
| Forgot Password | ✅ Ready | Reset link via Resend email |
| Password Reset | ✅ Ready | Secure token-based reset |
| JWT Authentication | ✅ Ready | 7-day token expiry |
| MongoDB Integration | ✅ Ready | User data storage |
| Protected Dashboard | ✅ Ready | Redirect after login |

### 📁 What You Have

```
.env.example                    Template (DO NOT DELETE)
.gitignore                      Already ignores .env (Good!)
AUTHENTICATION_SETUP.md         Detailed setup walkthrough
GOOGLE_OAUTH_SETUP.md          Google OAuth instructions
ENV_VARIABLES_GUIDE.md         All environment variables explained
QUICK_START.md                 Quick reference
SETUP_INSTRUCTIONS.md          This file

server.js                       Backend with all API endpoints
src/pages/LoginPage.jsx        Login + forgot password
src/pages/SignupPage.jsx       3-step signup process
src/pages/DashboardPage.jsx    Protected dashboard
```

---

## 🎯 Getting API Keys - Quick Reference

### 📦 MongoDB (Database)
**Time: 5 minutes**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster → Add database user
4. Get connection string
5. Paste into `.env` as `MONGODB_URI`

👉 **See ENV_VARIABLES_GUIDE.md** for exact steps

---

### 🔐 Google OAuth
**Time: 10 minutes**

1. Go to https://console.cloud.google.com
2. Create project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized URLs:
   - `http://localhost:3000`
   - `http://localhost:5173`
5. Copy Client ID & Secret
6. Paste into `.env`

👉 **See GOOGLE_OAUTH_SETUP.md** for detailed walkthrough

---

### 📧 Resend (Email)
**Time: 2 minutes**

1. Go to https://resend.com
2. Sign up (free)
3. Get API key
4. Paste into `.env` as `RESEND_API_KEY`

👉 **See ENV_VARIABLES_GUIDE.md** for more details

---

## 🛠️ Setup Process

### Phase 1: Prepare Local Environment (10 min)
1. [ ] Clone repo (already done)
2. [ ] Run `npm install` (already done)
3. [ ] Copy `.env.example` to `.env`
4. [ ] Generate `JWT_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Phase 2: Get External Keys (20 min)
1. [ ] **MongoDB**: Get `MONGODB_URI`
2. [ ] **Google**: Get `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
3. [ ] **Resend**: Get `RESEND_API_KEY`

### Phase 3: Fill `.env` (2 min)
1. [ ] Add all keys to `.env`
2. [ ] Verify format matches examples
3. [ ] Don't add quotes around values

### Phase 4: Test (5 min)
1. [ ] Start backend: `npm run server`
2. [ ] Start frontend: `npm run dev`
3. [ ] Open `http://localhost:5173`
4. [ ] Click "Sign Up"
5. [ ] Create account
6. [ ] Check email for welcome message
7. [ ] Test "Log In"
8. [ ] Test "Continue with Google"
9. [ ] Test "Forgot Password"

---

## ✅ Testing Checklist

After setup, test each feature:

- [ ] **Sign Up**
  - Enter name, email, phone
  - Set password (8+ chars)
  - See success screen
  - Check email for welcome message

- [ ] **Login**
  - Use email & password
  - Get redirected to dashboard
  - Token saved in localStorage

- [ ] **Google OAuth**
  - Click "Continue with Google"
  - Auto-creates account
  - Redirects to dashboard

- [ ] **Forgot Password**
  - Click forgot password link
  - Enter email
  - Check email for reset link
  - Reset password
  - Login with new password

- [ ] **Dashboard Access**
  - Login required to access
  - Token persists after refresh
  - Logout clears token

---

## 🐛 Troubleshooting

### Problem: "Cannot find module" or npm errors
```bash
# Solution
npm install
```

### Problem: MongoDB connection fails
```
Error: connect ECONNREFUSED
```
**Check:**
1. `MONGODB_URI` format is correct
2. MongoDB cluster is running
3. IP whitelist includes your computer
4. Username/password are correct

### Problem: Google OAuth "Invalid Client"
**Check:**
1. `GOOGLE_CLIENT_ID` matches exactly (no spaces)
2. `GOOGLE_CLIENT_SECRET` matches exactly
3. Callback URL registered in Google Console:
   - `http://localhost:3000/api/auth/google/callback`

### Problem: Emails not received
**Check:**
1. `RESEND_API_KEY` is correct
2. Check spam/junk folder
3. Domain verified in Resend (optional but recommended)
4. You haven't exceeded free tier limit

### Problem: "Token expired" on password reset
**Cause:** Reset links expire after 1 hour
**Solution:** Request a new reset link

### Problem: "Email already registered"
**Cause:** Account already exists
**Solution:** Use "Log In" or "Forgot Password" instead

---

## 🔒 Security Checklist

Before going to production:

- [ ] `.env` is in `.gitignore` (already done)
- [ ] `.env` file is NOT committed to Git
- [ ] `JWT_SECRET` is a long random string
- [ ] Using HTTPS URLs (in production)
- [ ] Google OAuth URLs updated for production domain
- [ ] MongoDB password is strong
- [ ] API keys are not hardcoded anywhere
- [ ] Secrets rotated periodically

---

## 🚀 Going to Production

### Update `.env` for Production:
```env
PORT=8000
CLIENT_URL=https://yourdomain.com
MONGODB_URI=production-mongodb-uri
JWT_SECRET=new-production-secret-key
GOOGLE_CLIENT_ID=production-client-id
GOOGLE_CLIENT_SECRET=production-client-secret
RESEND_API_KEY=production-resend-key
```

### Update Google OAuth Console:
1. Add authorized URI: `https://yourdomain.com`
2. Add callback URL: `https://yourdomain.com/api/auth/google/callback`

### Update Resend:
1. Verify your domain (e.g., `noreply@yourdomain.com`)
2. Update `from` email in `server.js`

### Update server.js:
```javascript
// Change this:
from: "GrowWealth <noreply@growwealth.com>",
// To your domain:
from: "GrowWealth <noreply@yourdomain.com>",
```

---

## 📚 Full Documentation

For detailed information, read:

- **QUICK_START.md** - 5-minute overview
- **ENV_VARIABLES_GUIDE.md** - Every variable explained
- **AUTHENTICATION_SETUP.md** - Complete setup walkthrough
- **GOOGLE_OAUTH_SETUP.md** - Google OAuth detailed guide
- **SETUP_INSTRUCTIONS.md** - This file

---

## 💡 Tips

1. **Keep `.env` secure** - Never share it
2. **Use strong passwords** - For database and Google Secret
3. **Monitor your limits** - Resend free tier: 100 emails/day
4. **Test everything locally** - Before production
5. **Backup your secrets** - In case you need to regenerate

---

## 📞 Need Help?

### Check These First:
1. Read the guide for your issue (links above)
2. Check troubleshooting section
3. Verify all `.env` variables are filled
4. Check browser console (F12) for errors
5. Check server logs in terminal

### Common Resources:
- MongoDB Issues: https://www.mongodb.com/docs/
- Google OAuth: https://developers.google.com/identity/
- Resend: https://resend.com/docs
- JWT: https://jwt.io/

---

## ✨ What's Next?

After you get login/signup working:

1. Add email verification for new accounts
2. Add 2FA (Two-Factor Authentication)
3. Add profile editing page
4. Add social login (GitHub, LinkedIn)
5. Add session management (logout other devices)
6. Add account deletion
7. Add password change (not reset)

---

## 🎉 You're All Set!

Everything is ready. Just fill in your API keys in `.env` and run it!

**Questions?** Read the detailed guides above or check the troubleshooting section.

**Ready?** Start with QUICK_START.md! 🚀

---

**Happy coding!** 💚
