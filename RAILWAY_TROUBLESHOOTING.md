# 🔧 Railway Build Troubleshooting

## Problem: Railway tries to use Docker instead of Nixpacks

If you see errors like:
```
/bin/bash: line 1: npm: command not found
```

This means Railway is trying to use Docker instead of Nixpacks.

## ✅ Solution

### Step 1: Set Root Directory
1. Go to Railway → Your backend service
2. Click **Settings** tab
3. Under **Source**, set **Root Directory** to: `backend`

### Step 2: Ensure Nixpacks Builder
1. Still in **Settings** tab
2. Scroll to **Build** section
3. Make sure **Builder** is set to: `Nixpacks`
   - If it says "Docker", click the dropdown and select "Nixpacks"

### Step 3: Verify railway.json
Make sure `railway.json` exists in your repo root with:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install && npm run build"
  },
  "deploy": {
    "startCommand": "cd backend && npm run start:prod"
  }
}
```

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** or push a new commit
3. Watch the build logs - it should now use npm commands

---

## How Railway Detects Build Method

Railway checks in this order:
1. **Dockerfile** in root → Uses Docker ❌
2. **railway.json** with builder specified → Uses that builder ✅
3. **Auto-detection** → Tries to detect framework (NestJS → Nixpacks) ✅

Since we removed Dockerfiles, Railway should use `railway.json` or auto-detect.

---

## Verify It's Working

After deployment, check build logs. You should see:
- ✅ "Using Nixpacks builder"
- ✅ "Installing Node.js..."
- ✅ "Running: npm install"
- ✅ "Running: npm run build"

NOT:
- ❌ "Building Docker image"
- ❌ "RUN cd backend && npm install"

---

## Still Having Issues?

1. **Delete and recreate the service**
   - Remove the service
   - Add new GitHub repo service
   - Set Root Directory to `backend` immediately
   - Configure environment variables

2. **Check Railway Status**
   - Visit [status.railway.app](https://status.railway.app)
   - Check if there are any platform issues

3. **Railway Support**
   - Use Railway's in-app support chat
   - Include your build logs

