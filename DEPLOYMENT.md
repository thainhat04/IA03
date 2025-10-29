# Complete Deployment Guide

This guide covers setting up and deploying both the backend and frontend for the User Registration System.

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🔧 Local Development Setup

### Step 1: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URI=postgresql://username:password@localhost:5432
   DATABASE_NAME=user_registration
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

4. Create the PostgreSQL database:
   ```bash
   createdb user_registration
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:3000`

### Step 2: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory (optional):
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## ☁️ Production Deployment

This guide provides step-by-step instructions for hosting both backend and frontend. We recommend **Railway for backend** and **Vercel for frontend** as they offer excellent free tiers and are easy to set up.

---

## 🚂 Option 1: Railway (Backend) + Vercel (Frontend) - Recommended

### Step 1: Host Backend on Railway

1. **Sign up/Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub (recommended) or email

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database**
   - In your project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create a PostgreSQL database

4. **Configure Backend Service**
   - Railway should auto-detect your backend (NestJS)
   - If not, click "+ New" → "GitHub Repo" and select your repo
   - Set the **Root Directory** to `backend`

5. **Set Environment Variables**
   - Go to your backend service → "Variables" tab
   - Add the following variables:
     ```
     DATABASE_URI=${{Postgres.DATABASE_URL}}
     DATABASE_NAME=user_registration
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - **Note**: Replace `${{Postgres.DATABASE_URL}}` with the connection string from your PostgreSQL service
   - **Note**: For `FRONTEND_URL`, you'll update this after deploying frontend

6. **Deploy**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (2-3 minutes)
   - Copy your backend URL (e.g., `https://your-backend-production.up.railway.app`)

### Step 2: Host Frontend on Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Build Settings**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

4. **Set Environment Variables**
   - Go to "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-production.up.railway.app
     ```
   - Replace with your actual Railway backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Link Backend and Frontend

1. **Update Backend CORS**
   - Go back to Railway → Your backend service → Variables
   - Update `FRONTEND_URL` with your Vercel frontend URL:
     ```
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Railway will automatically redeploy

2. **Verify Deployment**
   - Visit your Vercel frontend URL
   - Try registering a new user
   - Check browser console for any errors

---

## 🎨 Option 2: Render (Both Backend & Frontend)

Render can host both services. Use the provided `render.yaml` file for easy setup.

1. **Sign up to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Blueprint**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Select the `render.yaml` file from your repo
   - Click "Apply"

3. **Configure Services**
   - Render will create both services automatically
   - Update environment variables:
     - **Backend**: Set `DATABASE_URI` (use Render's PostgreSQL or external)
     - **Frontend**: Set `VITE_API_URL` to your backend URL after deployment

4. **Add PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Create database and copy connection string
   - Update `DATABASE_URI` in backend service

5. **Deploy**
   - Render will deploy both services
   - Update `FRONTEND_URL` in backend with your frontend URL
   - Update `VITE_API_URL` in frontend with your backend URL

---

## 🐳 Option 3: Docker (Self-Hosted)

For self-hosting, you can use Docker. See `docker-compose.yml` if available.

---

### Alternative Platform Instructions

### Backend Deployment (Railway/Render)

1. **Choose a Platform** (Railway, Render recommended)

2. **Connect Your Repository**
   - Link your GitHub repository to the platform
   - Enable automatic deployments

3. **Set Environment Variables**:
   - `DATABASE_URI`: Your PostgreSQL connection string
   - `DATABASE_NAME`: Your database name (e.g., `user_registration`)
   - `PORT`: Will be auto-assigned by the platform
   - `FRONTEND_URL`: Your deployed frontend URL (e.g., `https://your-app.vercel.app`)

4. **Add PostgreSQL Database**:
   - Add a PostgreSQL addon from the platform's marketplace
   - Copy the connection string to `DATABASE_URI` environment variable

5. **Deploy**:
   - Push to your main branch
   - The platform will automatically build and deploy

6. **Copy Backend URL**: 
   - Save the URL (e.g., `https://your-backend.railway.app`)

### Frontend Deployment (Vercel/Netlify)

1. **Choose a Platform** (Vercel recommended for React apps)

2. **Import Project**:
   - Connect your GitHub repository
   - Select the frontend directory as the root

3. **Set Environment Variables**:
   - `VITE_API_URL`: Your deployed backend URL

4. **Deploy**:
   - Click Deploy
   - Vercel will automatically build and deploy your React app

5. **Update Backend CORS**:
   - Update `FRONTEND_URL` in backend environment variables with your deployed frontend URL

## 🌐 Platform-Specific Configuration

### Railway Backend Configuration

The `railway.json` file in the root directory is already configured. Railway will auto-detect it.

**Manual Setup (if needed)**:
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm run start:prod`
- **Root Directory**: `backend` (optional, can set in Railway dashboard)

### Vercel Frontend Configuration

The `vercel.json` file is already configured. Vercel will use it automatically.

**Manual Setup**:
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Vite

### Render Configuration

The `render.yaml` file in the root directory provides a complete setup. Just import it in Render.

**Manual Setup**:

**Backend Service**:
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm run start:prod`
- **Environment**: Node

**Frontend Service**:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment**: Static Site

### Example Environment Variables

**Backend**:
```env
DATABASE_URI=postgresql://user:pass@host:5432/dbname
DATABASE_NAME=user_registration
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend**:
```env
VITE_API_URL=https://your-backend-production.up.railway.app
```

## 🧪 Testing Your Deployment

1. **Test Backend**: 
   ```bash
   curl -X POST https://your-backend.onrender.com/user/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

2. **Test Frontend**:
   - Visit your deployed frontend URL
   - Try registering a new user
   - Check the browser console for any errors

## 📊 Free Tier Hosting Options

### Recommended Combinations

| Backend | Frontend | Database | Notes |
|---------|----------|----------|-------|
| **Railway** | **Vercel** | Railway PostgreSQL | ⭐ Best overall, easiest setup |
| Render | Netlify | Render PostgreSQL | Good alternative |
| Railway | Netlify | Railway PostgreSQL | Cross-platform option |
| Render | Vercel | Render PostgreSQL | Cross-platform option |

### Free Tier Limits

**Railway**:
- $5 free credit monthly (enough for small projects)
- PostgreSQL included
- Auto-deployments

**Vercel**:
- Unlimited personal projects
- Free SSL certificates
- Global CDN

**Render**:
- Free tier available (with limitations)
- PostgreSQL included
- May spin down after inactivity

**Netlify**:
- Free tier available
- Great for static sites
- Free SSL and CDN

### Database Options (if not using platform DB)

- **Supabase**: Free PostgreSQL database (500MB storage)
- **Neon**: Serverless PostgreSQL (free tier available)
- **Railway PostgreSQL**: Included with Railway service

## 🐛 Troubleshooting

1. **CORS Errors**: Ensure `FRONTEND_URL` in backend matches your deployed frontend URL
2. **Database Connection**: Verify `DATABASE_URI` is correct and includes all required parameters
3. **Environment Variables**: Make sure all env vars are set in both backend and frontend
4. **Build Errors**: Check build logs for missing dependencies or TypeScript errors

## 📝 Notes

- The database schema will be auto-created on first run thanks to `synchronize: true` in production (consider migrations for production)
- For production, set `synchronize: false` and use migrations
- Use secure passwords and API keys in production
- Consider adding rate limiting for security

