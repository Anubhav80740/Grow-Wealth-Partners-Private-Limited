# 📱 Google OAuth 2.0 Setup Guide

This guide will help you get your Google OAuth 2.0 credentials for the GrowWealth app.

---

## 🔑 Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (create one if needed)
3. In the top left, click the **Project dropdown**
4. Click **NEW PROJECT**
5. Enter project name: `GrowWealth App` (or any name you prefer)
6. Click **CREATE**
7. Wait for the project to be created (this may take a few seconds)
8. Select your new project from the dropdown

---

## 📋 Step 2: Enable Google+ API

1. In the Cloud Console, click **APIs & Services** → **Library** (from left menu)
2. Search for **"Google+ API"**
3. Click on "Google+ API" from the results
4. Click the **ENABLE** button
5. Wait for it to enable (you'll see a checkmark)

---

## 🔐 Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials** (left menu)
2. Click **+ CREATE CREDENTIALS** (top button)
3. Select **OAuth 2.0 Client ID**
   - If prompted to create a consent screen first, click **Configure Consent Screen**

### 3a. Configure OAuth Consent Screen (if prompted)

1. Choose **External** for User Type (unless your app is for enterprise)
2. Click **CREATE**
3. Fill in the form:
   - **App name:** `GrowWealth`
   - **User support email:** Your email address
   - **Developer contact:** Your email address
4. Click **SAVE AND CONTINUE**
5. Skip through the scopes page (click **SAVE AND CONTINUE**)
6. Skip the test users page (click **SAVE AND CONTINUE**)
7. Review your settings and click **BACK TO DASHBOARD**

### 3b. Back to Creating OAuth Credentials

1. Go to **Credentials** again
2. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
3. Choose **Web application** from the dropdown
4. Under "Authorized JavaScript origins", add:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - Your production domain (e.g., `https://growwealth.example.com`)

5. Under "Authorized redirect URIs", add:
   - `http://localhost:3000/api/auth/google/callback`
   - Your production callback URL (e.g., `https://growwealth.example.com/api/auth/google/callback`)

6. Click **CREATE**
7. A popup will show your credentials:
   - **Client ID** → Copy this
   - **Client Secret** → Copy this

---

## 📝 Step 4: Add Credentials to Your App

1. Create a `.env` file in your project root (if you haven't already):
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Google credentials:
   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. Fill in other required fields:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   RESEND_API_KEY=your-resend-api-key
   JWT_SECRET=your-random-secret-key
   ```

---

## 🚀 Step 5: Test Your Setup

1. Start your backend server:
   ```bash
   npm run server
   ```

2. In another terminal, start your frontend:
   ```bash
   npm run dev
   ```

3. Go to `http://localhost:5173`
4. Click **Sign Up** or **Log In**
5. Click **"Continue with Google"**
6. Sign in with your Google account
7. You should be redirected to your dashboard!

---

## ⚠️ Common Issues

### Issue: "Invalid Client" Error
- **Solution:** Make sure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are exactly correct in your `.env`
- Check for extra spaces or typos

### Issue: "Redirect URI mismatch"
- **Solution:** Make sure the callback URL in your Google Console matches exactly:
  - For local: `http://localhost:3000/api/auth/google/callback`
  - For production: Update both `GOOGLE_CLIENT_SECRET` in `.env` AND the console

### Issue: "Unauthorized OAuth Scope"
- **Solution:** Make sure you enabled the **Google+ API** in step 2

### Issue: "User_consent required"
- **Solution:** Go back to your OAuth Consent Screen and make sure you published it
  - Go to **APIs & Services** → **OAuth Consent Screen**
  - Click **PUBLISH APP** button

---

## 🔒 For Production

Before deploying to production:

1. **Update Your Domain:**
   - Go to Google Cloud Console → **Credentials**
   - Edit your OAuth Client
   - Add your production domain to "Authorized JavaScript origins"
   - Add your production callback URL to "Authorized redirect URIs"

2. **Protect Your Secrets:**
   - Never commit `.env` to git (it's in `.gitignore`)
   - Use environment variables in your hosting platform (Vercel, Heroku, AWS, etc.)

3. **Change Your Secrets:**
   - Generate a new `JWT_SECRET` for production
   - Use a production MongoDB cluster
   - Use a production Resend key

---

## 📚 Helpful Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Resend Email Service](https://resend.com/docs)

---

**That's it!** Your Google OAuth setup is complete. If you have any issues, refer to the "Common Issues" section above.
