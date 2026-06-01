# 🚀 Deploying to Vercel - Complete Guide

Your app is now Vercel-ready! Follow these steps to deploy securely.

---

## ✅ What's Been Updated

Your code now uses **environment variables** that work with Vercel:
- Frontend uses `VITE_BACKEND_URL` instead of hardcoded URL
- Backend uses environment variables from Vercel
- `.env` stays in `.gitignore` (NOT committed)
- `.env.local` is for local development only

---

## 📋 Pre-Deployment Checklist

- [ ] Your app works locally
- [ ] You have all 4 API keys ready:
  - MongoDB URI
  - Google Client ID & Secret
  - Resend API Key
- [ ] You have a GitHub account
- [ ] You have a Vercel account

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd "C:\Users\motia\OneDrive\Desktop\Grow-Wealth-Partners-Private-Limited"
git init
git add .
git commit -m "Initial commit: Add GrowWealth authentication system"
```

### 1.2 Verify `.env` is in `.gitignore`
Open `.gitignore` and make sure it contains:
```
.env
.env.local
.env.*.local
```

**IMPORTANT:** `.env` should NOT be committed (for security)

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `growwealth-app` (or any name)
3. Add your project:
```bash
git remote add origin https://github.com/YOUR_USERNAME/growwealth-app.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Connect Vercel to GitHub

1. Go to https://vercel.com
2. Click **"New Project"**
3. Connect your GitHub repository
4. Select your `growwealth-app` repository
5. Vercel auto-detects it's a Vite project ✅

### 2.2 Set Frontend Environment Variables

In the Vercel dashboard for your frontend project:

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   Name: VITE_BACKEND_URL
   Value: https://your-backend-api.vercel.app
   ```
   (We'll set up the backend first, then come back to this)

3. Click **Deploy**

### 2.3 Get Your Frontend URL

After deployment, Vercel shows you:
```
https://growwealth-app.vercel.app
```

Save this URL - you'll need it for the backend.

---

## 🔙 Step 3: Deploy Backend to Vercel

### 3.1 Create a `vercel.json` Configuration File

In your project root, create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "PORT": "3000",
    "NODE_ENV": "production"
  }
}
```

### 3.2 Update `server.js` for Production

Change the PORT line in `server.js`:

```javascript
const PORT = process.env.PORT || 3000;  // ← Already correct ✅
```

Also make sure `CLIENT_URL` accepts both localhost and Vercel domain:

```javascript
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
```

### 3.3 Deploy Backend to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your GitHub repository again
4. **Root Directory:** Make sure it's set to `./` (project root)
5. **Build Command:** Leave empty (no build needed for Express)
6. **Start Command:** `node server.js`

### 3.4 Set Backend Environment Variables

In Vercel dashboard for backend project, go to **Settings** → **Environment Variables**

Add all your production secrets:

```
MONGODB_URI=                    (your production MongoDB URI)
JWT_SECRET=                     (use different secret than dev!)
NEXTAUTH_SECRET=                (use different secret than dev!)
GOOGLE_CLIENT_ID=               (same as dev)
GOOGLE_CLIENT_SECRET=           (same as dev)
RESEND_API_KEY=                 (same as dev)
CLIENT_URL=https://your-frontend-vercel-app.vercel.app
PORT=3000
NODE_ENV=production
```

### 3.5 Deploy

Click **Deploy**

After deployment, Vercel shows you:
```
https://growwealth-backend.vercel.app
```

---

## 🔗 Step 4: Connect Frontend & Backend

### 4.1 Update Frontend Environment Variable

1. Go to **frontend project** in Vercel
2. **Settings** → **Environment Variables**
3. Update `VITE_BACKEND_URL`:
   ```
   https://growwealth-backend.vercel.app
   ```

### 4.2 Update Backend's CLIENT_URL

1. Go to **backend project** in Vercel
2. **Settings** → **Environment Variables**
3. Update `CLIENT_URL`:
   ```
   https://your-frontend-vercel-app.vercel.app
   ```

### 4.3 Update Google OAuth URLs

1. Go to https://console.cloud.google.com
2. Go to **APIs & Services** → **Credentials**
3. Edit your OAuth Client
4. Update **Authorized JavaScript origins:**
   ```
   https://your-frontend-vercel-app.vercel.app
   https://your-backend-vercel-app.vercel.app
   ```

5. Update **Authorized redirect URIs:**
   ```
   https://your-backend-vercel-app.vercel.app/api/auth/google/callback
   ```

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Frontend
1. Open: `https://your-frontend-vercel-app.vercel.app`
2. You should see login page ✅

### 5.2 Test Login
1. Click **Sign Up**
2. Create account
3. Check email for confirmation
4. Log in ✅

### 5.3 Test Google OAuth
1. Click **Continue with Google**
2. Sign in with Google
3. You should be logged in ✅

### 5.4 Test Forgot Password
1. Click **Forgot password?**
2. Enter email
3. Check email for reset link ✅

---

## 🔒 Security Checklist for Production

- [ ] Never commit `.env` to Git
- [ ] Use different `JWT_SECRET` in production
- [ ] Use production MongoDB cluster (not dev)
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Set strong passwords for database
- [ ] Verify all domains in Google OAuth console
- [ ] Monitor API usage (Resend, MongoDB, Google)
- [ ] Set up monitoring/alerts for errors
- [ ] Enable branch protection on main (no direct commits)
- [ ] Require code reviews before merge

---

## 🚨 Troubleshooting

### Frontend shows "Cannot connect to backend"
- Check `VITE_BACKEND_URL` environment variable is set correctly
- Make sure backend API is deployed and running
- Check browser console (F12) for exact error

### Google OAuth shows "Redirect URI mismatch"
- Verify the callback URL in Google Cloud Console
- Should be: `https://your-backend-vercel-app.vercel.app/api/auth/google/callback`
- Not: `http://localhost:3000/api/auth/google/callback`

### Emails not sending
- Verify `RESEND_API_KEY` is correct in Vercel
- Check Resend dashboard for API usage
- Make sure your domain is verified in Resend (optional)

### MongoDB connection failing
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas (add `0.0.0.0/0` for development)
- Make sure database user has correct password

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Common issues: missing environment variables, wrong Node version
- Try rebuilding from Vercel dashboard

---

## 📚 Environment Variable Summary

### Local Development (`.env.local`)
```
VITE_BACKEND_URL=http://localhost:3000
MONGODB_URI=local-mongodb-uri
GOOGLE_CLIENT_ID=your-dev-client-id
GOOGLE_CLIENT_SECRET=your-dev-client-secret
RESEND_API_KEY=your-resend-key
JWT_SECRET=your-dev-secret
```

### Production (Vercel Dashboard)
```
VITE_BACKEND_URL=https://your-backend-vercel-app.vercel.app  (frontend only)
MONGODB_URI=production-mongodb-uri  (backend only)
GOOGLE_CLIENT_ID=same-client-id  (both)
GOOGLE_CLIENT_SECRET=same-client-secret  (both)
RESEND_API_KEY=same-api-key  (backend only)
JWT_SECRET=different-production-secret  (backend only)
CLIENT_URL=https://your-frontend-vercel-app.vercel.app  (backend only)
```

---

## 🎯 Next Steps

1. Commit all changes to GitHub
2. Deploy frontend to Vercel
3. Deploy backend to Vercel
4. Set environment variables in Vercel
5. Test all features
6. Monitor for errors
7. Celebrate! 🎉

---

## 📞 Need Help?

Common issues and solutions:
- **Build fails:** Check Vercel build logs
- **API not working:** Check environment variables in Vercel
- **OAuth fails:** Update Google Console with production URLs
- **Emails not sending:** Verify Resend API key
- **Database connection:** Verify MongoDB IP whitelist

---

**Your app is now production-ready!** 🚀

Never commit secrets to Git. Always use Vercel's environment variables.
