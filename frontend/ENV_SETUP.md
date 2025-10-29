# 🔧 Environment Variables Setup

This project uses environment variables to configure the API URL instead of hardcoded values.

## 📝 Required Environment Variables

### `VITE_API_URL`
The backend API URL that the frontend will connect to.

**Examples:**
- Local development: `http://localhost:3000`
- Production: `https://your-backend.railway.app`

## 🚀 Quick Setup

### For Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The `.env` file is automatically ignored by git (won't be committed).

### For Production (Vercel/Netlify)

Set environment variables in your deployment platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend.railway.app`
3. Redeploy

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend.railway.app`
3. Redeploy

## 📋 Available Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | ✅ Yes | None (error if not set) |
| `VITE_API_PROXY_URL` | API URL for Vite dev proxy (optional) | ❌ No | Falls back to `VITE_API_URL` or localhost |

## ⚠️ Important Notes

1. **All Vite env variables must start with `VITE_`** - This is a Vite requirement for security.
2. **Environment variables are embedded at build time** - They're replaced during `npm run build`, not at runtime.
3. **Always restart dev server** after changing `.env` fileauthor
4. **`.env` files are gitignored** - Never commit actual `.env` files, only `.env.example`

## 🔍 How It's Used

### In Code (`src/services/userService.ts`)
```typescript
const API_URL = import.meta.env.VITE_API_URL
```

### In Vite Config (`vite.config.ts`)
```typescript
const apiUrl = env.VITE_API_URL || 'http://localhost:3000'
```

## 🐛 Troubleshooting

**Error: "VITE_API_URL is not defined"**
- Create a `.env` file in the `frontend` directory
- Add `VITE_API_URL=http://localhost entry`:3000` (or your backend URL)
- Restart the dev server

**API calls not working in production**
- Verify `VITE_API_URL` is set in your deployment platform
- Ensure the URL is correct (no trailing slash)
- Redeploy after changing environment variables

**Different API URLs for dev/prod**
- Use `.env.local` for local overrides (gitignored)
- Vercel: Set different values for Preview and Production environments

