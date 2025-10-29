# 🚀 Quick Hosting Guide

Get both your backend and frontend online in 15 minutes!

## Recommended: Railway + Vercel

### ⚡ Quick Steps

#### 1️⃣ Backend on Railway (5 min)

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository: `thainhat04/IA03`
4. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
5. Click **"+ New"** → **"GitHub Repo"** → Select repo → **Set root directory to `backend`**
   - **Important**: Railway will auto-detect NestJS and use `railway.json` config (no Docker needed!)
6. Go to backend service → **"Variables"** → Add:
   ```
   DATABASE_URI=${{Postgres.DATABASE_URL}}
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
   (Update FRONTEND_URL after Step 2)
7. Copy your backend URL (wait ~2 min for deployment)

#### 2️⃣ Frontend on Vercel (3 min)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New"** → **"Project"** → Import your repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   ```
   VITE_API_URL=your-railway-backend-url
   ```
5. Click **"Deploy"** → Copy frontend URL

#### 3️⃣ Link Them Together (2 min)

1. Go back to Railway → Backend service → Variables
2. Update `FRONTEND_URL` with your Vercel URL
3. Wait for redeploy (~1 min)
4. ✅ Done! Visit your frontend URL and test!

---

## Alternative: Render (Both on One Platform)

1. Go to [render.com](https://render.com) → Sign up
2. Click **"New +"** → **"Blueprint"**
3. Connect repo → Select `render.yaml` → **"Apply"**
4. Add PostgreSQL database
5. Update env vars in both services with database URL and URLs
6. Wait for deployment

---

## 🎯 Environment Variables Cheat Sheet

### Backend (Railway)
```
DATABASE_URI=${{Postgres.DATABASE_URL}}  (or full connection string)
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app
```

---

## ❓ Troubleshooting

**CORS Error?** → Update `FRONTEND_URL` in backend with exact frontend URL

**Database Connection Failed?** → Check `DATABASE_URI` includes full connection string with database name

**404 on Frontend?** → Make sure `VITE_API_URL` points to your backend URL

**Build Failed?** → 
- Check Railway is using **Nixpacks** (not Docker) in Settings → Build
- Ensure Root Directory is set to `backend`
- Check build logs for missing dependencies

---

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and all platform options.

