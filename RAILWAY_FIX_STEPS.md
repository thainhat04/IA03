# 🚨 IMMEDIATE FIX: Railway Docker Error

Railway is trying to use Docker instead of Nixpacks. Here's how to fix it **RIGHT NOW**:

## ⚡ Quick Fix (5 minutes)

### Step 1: Open Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click on your **backend service**

### Step 2: Change Builder to Nixpacks
1. Click the **Settings** tab
2. Scroll to **Build** section
3. Find **Builder** dropdown
4. **Change it from "Docker" to "Nixpacks"** ⚠️ CRITICAL!
5. Save changes

### Step 3: Set Root Directory
1. Still in **Settings** tab
2. Scroll to **Source** section  
3. Set **Root Directory** to: `backend`
4. Save changes

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** button (top right)
3. Watch the build logs - you should see:
   - ✅ "Using Nixpacks"
   - ✅ "Installing Node.js..."
   - ✅ "Running: npm install"

---

## 🎯 Why This Happens

Railway detects build method in this order:
1. **If Root Directory is NOT set** → Looks for Dockerfile in root → Uses Docker ❌
2. **If Builder is set to "Docker"** → Uses Docker ❌
3. **If Builder is set to "Nixpacks"** → Uses Nixpacks ✅
4. **Auto-detection** → Detects NestJS → Uses Nixpacks ✅

Your Railway is currently set to use Docker, so it's ignoring `railway.json`.

---

## ✅ Verification

After redeploying, check the build logs. You should see:

**✅ CORRECT (Nixpacks):**
```
Using Nixpacks builder
Installing Node.js 18.x
Running: npm install
Running: npm run build
```

**❌ WRONG (Docker):**
```
Building Docker image
COPY . /app/.
RUN cd backend && npm install
npm: command not found
```

---

## 🔄 If Still Not Working

### Option 1: Delete and Recreate Service
1. In Railway, delete your backend service
2. Click "+ New" → "GitHub Repo"
3. Select your repository
4. **IMMEDIATELY** go to Settings:
   - Set Root Directory: `backend`
   - Set Builder: `Nixpacks`
5. Add environment variables
6. Deploy

### Option 2: Create New Project
1. Create a completely new Railway project
2. Add PostgreSQL database
3. Add GitHub repo service
4. Set Root Directory to `backend` BEFORE first deploy
5. Set Builder to `Nixpacks`
6. Configure environment variables

---

## 📝 Note About railway.json

The updated `railway.json` now relies on Railway's auto-detection when Root Directory is set to `backend`. Railway will:
- Auto-detect NestJS
- Install dependencies with `npm install`
- Build with `npm run build`
- Start with `npm run start:prod`

No explicit build commands needed when Root Directory is correct!

---

## 💡 Pro Tip

Always set **Root Directory** and **Builder** in Railway Settings BEFORE the first deployment. Railway remembers these settings, so setting them early prevents Docker issues.

