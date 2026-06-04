# 🔐 Complete Environment Variables Guide

This document explains every environment variable you need to set up.

---

## 📍 Where to Put `.env` File

Place the `.env` file in your **project root directory:**

```
Grow-Wealth-Partners-Private-Limited/
├── .env                 ← CREATE THIS FILE HERE
├── .env.example         ← Reference file
├── .gitignore           ← Already ignores .env
├── package.json
├── server.js
└── src/
```

**IMPORTANT:** Never commit `.env` to Git. It's already in `.gitignore` ✅

---

## 📝 All Environment Variables

### 1. **PORT** - Server Port
```env
PORT=3000
```
- The port your backend server runs on
- Default: `3000`
- For production, use `8000` or `5000`

---

### 2. **CLIENT_URL** - Frontend URL
```env
CLIENT_URL=http://localhost:5173
```
- The URL where your React app is running
- Used for redirects after Google OAuth and password resets
- **Development:** `http://localhost:5173`
- **Production:** `https://yourapp.com`

---

### 3. **MONGODB_URI** - Database Connection
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/grow_wealth_db?retryWrites=true&w=majority
```

#### How to Get It:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account → Create cluster (free tier available)
3. Create database user:
   - Click **Database Access** → **Add New Database User**
   - Username: `growwealth_user`
   - Password: Create strong password
   - Click **Add User**

4. Get connection string:
   - Click **Databases** → **Connect**
   - Choose **Drivers**
   - Copy the connection string
   - Replace `<username>:<password>` with your credentials
   - Replace `myFirstDatabase` with `grow_wealth_db`

#### Example:
```env
MONGODB_URI=mongodb+srv://growwealth_user:MySecurePassword123@cluster0.abc123.mongodb.net/grow_wealth_db?retryWrites=true&w=majority
```

#### Troubleshooting:
- Make sure your IP is whitelisted in MongoDB Atlas
- Use `0.0.0.0/0` to allow all IPs (dev only!)

---

### 4. **JWT_SECRET** - Security Token
```env
JWT_SECRET=your-super-secret-random-string-at-least-32-characters
```

#### How to Create It:
Run this command to generate a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator: https://www.random.org/strings/

#### Example:
```env
JWT_SECRET=a7f8c3d9e2b1f4a6c8e5d2f9b3a6c8e1
```

#### For Production:
- Generate a NEW secret for production
- Never reuse development secret
- Keep it secure and backed up

---

### 5. **NEXTAUTH_SECRET** - Optional Secondary Secret
```env
NEXTAUTH_SECRET=another-secret-key-at-least-32-characters
```

- Similar to JWT_SECRET
- Used if you plan to add NextAuth later
- Can be the same as JWT_SECRET for now
- Leave blank if not using NextAuth

#### Generate:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 6. **RESEND_API_KEY** - Email Service
```env
RESEND_API_KEY=re_abc123xyz789def456ghi789
```

#### How to Get It:
1. Go to [Resend.com](https://resend.com)
2. Sign up for free account
3. Go to **Dashboard** → **API Keys**
4. Copy your API key
5. Paste into `.env`

#### What It's Used For:
- Sending "Forgot Password" reset links
- Sending welcome emails after signup
- Any transactional emails

#### Important:
- Free tier allows 100 emails/day
- For production, verify your domain
- Default sender: `noreply@growwealth.com`

#### Test It:
```bash
# After setting RESEND_API_KEY, emails will send automatically
# Forgot Password → Check your email for reset link
```

---

### 7. **GOOGLE_CLIENT_ID** - Google OAuth
```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

#### How to Get It:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project called "GrowWealth"
3. Enable **Google+ API**
4. Create **OAuth 2.0 credentials**
5. Choose **Web application**
6. Add authorized URIs:
   ```
   http://localhost:3000
   http://localhost:5173
   ```
7. Add callback URL:
   ```
   http://localhost:3000/api/auth/google/callback
   ```
8. Copy the **Client ID**

#### Example:
```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

#### For Production:
Update authorized URIs with your production domain:
```
https://yourdomain.com
https://yourdomain.com/api/auth/google/callback
```

---

### 8. **GOOGLE_CLIENT_SECRET** - Google OAuth Secret
```env
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### How to Get It:
- Same process as GOOGLE_CLIENT_ID (steps above)
- It appears in the same popup as Client ID
- Copy the **Client Secret**

#### Important:
- Keep this VERY SECRET
- Never commit to Git (use .gitignore)
- Never share in emails or messages
- Rotate periodically

#### Example:
```env
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

### 9. **NODE_ENV** - Environment (Optional)
```env
NODE_ENV=development
```

- **development** - Verbose logs, easier debugging
- **production** - Optimized, minimal logs

---

## ✅ Complete `.env` Example

Here's a complete working example:

```env
# ═════════════════════════════════════════════════════════════
# SERVER & CLIENT
# ═════════════════════════════════════════════════════════════
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# ═════════════════════════════════════════════════════════════
# DATABASE
# ═════════════════════════════════════════════════════════════
MONGODB_URI=mongodb+srv://growwealth_user:MyPassword123@cluster0.abc123.mongodb.net/grow_wealth_db?retryWrites=true&w=majority

# ═════════════════════════════════════════════════════════════
# SECURITY & JWT
# ═════════════════════════════════════════════════════════════
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret

# ═════════════════════════════════════════════════════════════
# EMAIL SERVICE
# ═════════════════════════════════════════════════════════════
RESEND_API_KEY=your-resend-api-key

# ═════════════════════════════════════════════════════════════
# GOOGLE OAUTH 2.0
# ═════════════════════════════════════════════════════════════
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🚀 Setup Checklist

- [ ] Created `.env` file in project root
- [ ] Set up MongoDB Atlas and got `MONGODB_URI`
- [ ] Generated `JWT_SECRET` and `NEXTAUTH_SECRET`
- [ ] Created Google Cloud project and got `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Got `RESEND_API_KEY` from Resend
- [ ] Filled in all variables in `.env`
- [ ] Verified `.env` is in `.gitignore`
- [ ] Started backend: `npm run server`
- [ ] Started frontend: `npm run dev`
- [ ] Tested login at `http://localhost:5173`

---

## 🔒 Security Tips

1. **Never share `.env` file** - Contains all your secrets
2. **Never commit `.env` to Git** - Check `.gitignore`
3. **Use strong JWT_SECRET** - Generate with random bytes
4. **Rotate secrets periodically** - Especially in production
5. **Use different keys for dev/prod** - Never use same secret
6. **Keep Google OAuth secret private** - Regenerate if exposed
7. **Monitor API key usage** - Check Resend and Google dashboards

---

## 🐛 Common Mistakes

### ❌ Wrong Database URI Format
```env
# WRONG
MONGODB_URI=growwealth_user:password@cluster0.mongodb.net
# RIGHT
MONGODB_URI=mongodb+srv://growwealth_user:password@cluster0.xxxxx.mongodb.net/grow_wealth_db
```

### ❌ Google OAuth Not Working
- Make sure `CLIENT_URL` and callback URLs match exactly
- Check CLIENT_ID and CLIENT_SECRET for typos
- Verify authorized URIs in Google Console

### ❌ Emails Not Sending
- Check `RESEND_API_KEY` is correct
- Verify your email inbox (check spam)
- Make sure you have enough free tier quota

### ❌ Database Connection Fails
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Confirm username and password are correct

---

## 📚 Helpful Links

| Service | Link | Purpose |
|---------|------|---------|
| **MongoDB** | https://www.mongodb.com/cloud/atlas | Database storage |
| **Google Cloud** | https://console.cloud.google.com/ | OAuth credentials |
| **Resend** | https://resend.com/dashboard/api-keys | Email service |
| **JWT Generator** | https://www.random.org/strings/ | Generate random secrets |

---

## ❓ FAQ

**Q: Can I use the same secret for JWT_SECRET and NEXTAUTH_SECRET?**
A: Yes, for development it's fine. For production, generate two different secrets.

**Q: Is MongoDB free?**
A: Yes! MongoDB Atlas offers a free tier with 512MB storage (enough for development).

**Q: Is Google OAuth free?**
A: Yes! Google Cloud provides OAuth for free.

**Q: Is Resend free?**
A: Yes! 100 free emails per day. Upgrade for production.

**Q: What if I forget my Google Client Secret?**
A: Regenerate it in Google Cloud Console → Credentials → Edit OAuth Client.

**Q: How often should I rotate secrets?**
A: Every 3-6 months for production, or immediately if exposed.

---

## ✨ Next Steps

1. Set up all environment variables ✅
2. Start backend server: `npm run server`
3. Start frontend: `npm run dev`
4. Test all features at `http://localhost:5173`
5. Deploy to production with production secrets

Good luck! 🚀
