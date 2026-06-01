# 🎬 Getting Started - Step-by-Step Visual Guide

Follow this guide to get your authentication system running in 30 minutes.

---

## 🔴 STEP 1: Generate Your JWT Secret (1 minute)

Open Command Prompt in your project directory and run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**You'll get something like:**
```
a7f8c3d9e2b1f4a6c8e5d2f9b3a6c8e1
```

**Copy this value** - you'll need it for `.env`

---

## 🟠 STEP 2: Set Up MongoDB (5 minutes)

### 2.1 Go to MongoDB Atlas
1. Open: https://www.mongodb.com/cloud/atlas
2. Click **"Sign up"** (or sign in if you have account)
3. Choose **"Serverless"** option
4. Click **"Create"**

### 2.2 Create Database User
1. On left menu, click **"Database Access"**
2. Click **"Add New Database User"**
3. Fill in:
   - Username: `growwealth_user`
   - Password: Create a strong password (e.g., `MySecure123Password`)
   - Authentication Method: **Password**
4. Click **"Add User"**

### 2.3 Get Connection String
1. On left menu, click **"Databases"**
2. Click **"Connect"** button
3. Choose **"Drivers"**
4. Copy the connection string
5. Replace `<username>` with `growwealth_user`
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `grow_wealth_db`

**Result should look like:**
```
mongodb+srv://growwealth_user:MySecure123Password@cluster0.abc123.mongodb.net/grow_wealth_db?retryWrites=true&w=majority
```

**Copy this** - you'll need it for `.env`

---

## 🟡 STEP 3: Set Up Google OAuth (10 minutes)

### 3.1 Create Google Project
1. Open: https://console.cloud.google.com
2. Sign in with Google account
3. At top, click the **Project dropdown**
4. Click **"NEW PROJECT"**
5. Name it: `GrowWealth`
6. Click **"CREATE"**
7. Wait for it to load (select the new project)

### 3.2 Enable Google+ API
1. Left sidebar: Click **"APIs & Services"** → **"Library"**
2. Search: `"Google+ API"`
3. Click on it
4. Click **"ENABLE"** button
5. Wait for it to enable

### 3.3 Create OAuth Credentials
1. Left sidebar: **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (top button)
3. If prompted, configure **Consent Screen**:
   - Choose "External"
   - Click "CREATE"
   - Fill app name: `GrowWealth`
   - Fill user support email and developer contact
   - Skip through remaining screens
   - Click "SAVE AND CONTINUE" for each

### 3.4 Create OAuth Client
1. Back to **Credentials** page
2. Click **"+ CREATE CREDENTIALS"** again
3. Choose **"OAuth 2.0 Client ID"**
4. Choose **"Web application"**
5. Add **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://localhost:5173
   ```
6. Add **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/google/callback
   ```
7. Click **"CREATE"**
8. A popup shows your credentials:
   - Copy **Client ID** (long string ending in .apps.googleusercontent.com)
   - Copy **Client Secret** (starts with GOCSPX-)

**Save both** - you'll need them for `.env`

---

## 🟢 STEP 4: Set Up Resend (2 minutes)

### 4.1 Create Resend Account
1. Open: https://resend.com
2. Click **"Sign up"**
3. Sign up with email
4. Verify email

### 4.2 Get API Key
1. Go to **Dashboard**
2. Click **"API Keys"** (left menu)
3. You'll see your API key starting with `re_`
4. Click copy icon or select and copy

**Save this** - you'll need it for `.env`

---

## 🔵 STEP 5: Fill Your `.env` File (2 minutes)

### 5.1 Open `.env` File
Navigate to:
```
C:\Users\motia\OneDrive\Desktop\Grow-Wealth-Partners-Private-Limited\.env
```

### 5.2 Fill in Your Values

Replace the blank values with what you collected:

```env
PORT=3000
CLIENT_URL=http://localhost:5173

# MongoDB connection string from step 2.3
MONGODB_URI=mongodb+srv://growwealth_user:MySecure123Password@cluster0.abc123.mongodb.net/grow_wealth_db

# JWT secret from step 1
JWT_SECRET=a7f8c3d9e2b1f4a6c8e5d2f9b3a6c8e1
NEXTAUTH_SECRET=a7f8c3d9e2b1f4a6c8e5d2f9b3a6c8e1

# Google credentials from step 3.4
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend key from step 4.2
RESEND_API_KEY=your-resend-api-key

NODE_ENV=development
```

### 5.3 Save the File
- Press **Ctrl+S** to save
- Do NOT commit to Git (it's in .gitignore)

---

## 🟣 STEP 6: Start Backend Server (2 minutes)

### 6.1 Open Terminal
1. Open Command Prompt or PowerShell
2. Navigate to project directory:
   ```bash
   cd "C:\Users\motia\OneDrive\Desktop\Grow-Wealth-Partners-Private-Limited"
   ```

### 6.2 Start Backend
```bash
npm run server
```

You should see:
```
Server is running on http://localhost:3000
MongoDB connected
```

**✅ Leave this running!**

---

## 🔶 STEP 7: Start Frontend Server (1 minute)

### 7.1 Open Another Terminal
1. Open **another** Command Prompt or PowerShell
2. Navigate to project directory:
   ```bash
   cd "C:\Users\motia\OneDrive\Desktop\Grow-Wealth-Partners-Private-Limited"
   ```

### 7.2 Start Frontend
```bash
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

**✅ Leave this running too!**

---

## 🔷 STEP 8: Test in Browser (5 minutes)

### 8.1 Open Your App
1. Open browser
2. Go to: **http://localhost:5173**
3. You should see login page with:
   - Login form
   - "Continue with Google" button
   - "Sign up" link

### 8.2 Test Sign Up
1. Click **"Sign up"**
2. Enter:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+91 98765 43210`
3. Click **Continue**
4. Enter password: `MyPassword123`
5. Confirm password
6. Click **Continue**
7. See success screen ✅
8. Check your email for welcome message ✅

### 8.3 Test Login
1. Click **"Log In"** (from success screen)
2. Enter your email and password
3. Click **"Log In"**
4. Get redirected to dashboard ✅

### 8.4 Test Google OAuth
1. On login page, click **"Continue with Google"**
2. Sign in with Google
3. Get redirected to dashboard ✅

### 8.5 Test Forgot Password
1. On login page, click **"Forgot password?"**
2. Enter your email
3. Click **"Send Reset Link"**
4. Check email for reset link
5. Click link and reset password
6. Login with new password ✅

---

## ✨ Success! Everything is Working!

If all tests passed:
- ✅ Sign up works
- ✅ Emails sending
- ✅ Login works
- ✅ Google OAuth works
- ✅ Password reset works

**Your authentication system is live!** 🎉

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection error"
**Solution:**
1. Check `.env` - `MONGODB_URI` format
2. Go to MongoDB Atlas → Network Access
3. Add `0.0.0.0/0` to IP whitelist (for testing)
4. Restart backend server

### Problem: "Invalid Client" on Google OAuth
**Solution:**
1. Check `.env` - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. Make sure no extra spaces
3. Check Google Console - callback URL registered

### Problem: "Email not received"
**Solution:**
1. Check `.env` - `RESEND_API_KEY` is correct
2. Check spam/junk folder
3. Try a different email address
4. Wait a minute (sometimes takes time)

### Problem: "Cannot find module"
**Solution:**
```bash
npm install
```

### Problem: "Port 3000 already in use"
**Solution:**
Change `PORT=3000` in `.env` to `PORT=5000` and restart

### Problem: "Cannot GET /dashboard"
**Solution:**
- Make sure you're logged in first
- Check localStorage has `authToken`
- Try logging in again

---

## 📚 Next Steps

1. ✅ Test all features (you're here)
2. Explore the code in `src/pages/`
3. Read SETUP_INSTRUCTIONS.md for more details
4. Plan your dashboard features
5. Deploy to production

---

## 🎯 You're All Done!

Congratulations! Your authentication system is:
- ✅ Running
- ✅ Connected to MongoDB
- ✅ Sending emails
- ✅ Handling Google OAuth
- ✅ Managing passwords securely

**Now you can focus on building your app features!** 🚀

---

## 📞 Need Help?

| Issue | Read This |
|-------|-----------|
| Database problems | ENV_VARIABLES_GUIDE.md |
| Google OAuth issues | GOOGLE_OAUTH_SETUP.md |
| Email problems | SETUP_INSTRUCTIONS.md |
| General questions | SETUP_SUMMARY.md |

---

**Enjoy your fully functional authentication system!** 💚
