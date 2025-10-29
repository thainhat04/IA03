# 📦 Deployment Configuration Files

This directory contains configuration files for hosting your application on various platforms.

## 📄 Files Overview

### `railway.json`
Configuration for **Railway** backend deployment. Railway will automatically detect and use this file.

**What it does:**
- Configures build and start commands for the backend
- Sets up automatic restarts on failure

**Usage:**
1. Push this file to your repository
2. Deploy on Railway (it will auto-detect)

---

### `vercel.json`
Configuration for **Vercel** frontend deployment. This is optional - Vercel can auto-detect Vite projects.

**What it does:**
- Sets build and output directory for frontend
- Ensures proper build commands are used

**Usage:**
1. Push this file to your repository
2. When deploying on Vercel, set Root Directory to `frontend` in the dashboard
3. Vercel will use the build commands from this file

---

### `render.yaml`
Complete blueprint for deploying **both backend and frontend** on **Render**.

**What it does:**
- Defines both backend (Node.js) and frontend (Static) services
- Pre-configures environment variables
- Sets up build and start commands

**Usage:**
1. Push this file to your repository
2. On Render: New → Blueprint → Connect repo → Select `render.yaml`
3. Render will create both services automatically
4. Update environment variables in Render dashboard

---

## 🚀 Quick Start

### Option 1: Railway + Vercel (Recommended)
- Backend: Uses `railway.json`
- Frontend: Uses `vercel.json` (optional, Vercel auto-detects Vite)

### Option 2: Render (Both Services)
- Both: Uses `render.yaml` blueprint

---

## 📝 Environment Variables Needed

### Backend
- `DATABASE_URI` - PostgreSQL connection string
- `DATABASE_NAME` - Database name (default: `user_registration`)
- `NODE_ENV` - Set to `production` for production
- `PORT` - Server port (usually auto-set by platform)
- `FRONTEND_URL` - Your deployed frontend URL (for CORS)

### Frontend
- `VITE_API_URL` - Your deployed backend URL

---

## 🔧 Platform-Specific Notes

### Railway
- Automatically detects `railway.json`
- You can also configure everything in the dashboard
- Root directory can be set in the dashboard or use the `startCommand` path

### Vercel
- `vercel.json` is optional for Vite projects
- Most important: Set Root Directory to `frontend` in dashboard
- Environment variables should be set in Vercel dashboard

### Render
- Uses `render.yaml` for blueprint deployments
- Can also deploy services manually using the same commands
- Environment variables marked `sync: false` need to be set manually

---

## 📚 More Info

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.
See [HOSTING_QUICK_START.md](./HOSTING_QUICK_START.md) for a 15-minute quick start guide.

