# User Registration System

A complete full-stack application with NestJS backend and React frontend for user registration and authentication.

## 📋 Features

- **Backend (NestJS)**
  - RESTful API for user registration
  - PostgreSQL database with MikroORM
  - Password hashing with bcrypt
  - Input validation
  - CORS enabled for frontend communication
  
- **Frontend (React + Vite)**
  - Modern, responsive UI with Tailwind CSS
  - React Router for navigation
  - React Query for API state management
  - React Hook Form with Zod validation
  - Beautiful gradient design

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or cloud database)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432
DATABASE_NAME=user_registration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

4. Make sure PostgreSQL is running. Create a database:
```bash
createdb user_registration
```

Or using psql:
```bash
psql postgres
CREATE DATABASE user_registration;
```

5. Run the backend server (this will automatically create the database schema):
```bash
npm run start:dev
```

The backend will be running on `http://localhost:3000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   │   └── register-user.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── user.schema.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   └── SignUp.tsx
│   │   ├── services/
│   │   │   └── userService.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🎯 API Endpoints

### POST /user/register

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (409):**
```json
{
  "statusCode": 409,
  "message": "Email already registered"
}
```

## 🧪 Testing

### Backend
```bash
cd backend
npm run test
```

### Frontend
The frontend runs in development mode with hot reload enabled.

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🚀 Deployment

### Backend Deployment (Railway/Heroku/Render)

1. Set environment variables in your hosting platform:
   - `DATABASE_URI`: Your PostgreSQL connection string
   - `DATABASE_NAME`: Your database name
   - `PORT`: Server port (auto-assigned by platform)
   - `FRONTEND_URL`: Your deployed frontend URL

2. Deploy using Git push or platform-specific CLI.

### Frontend Deployment (Vercel/Netlify)

1. Connect your repository to Vercel/Netlify.

2. Set environment variable:
   - `VITE_API_URL`: Your deployed backend API URL

3. Deploy!

## 🛠️ Technologies Used

**Backend:**
- NestJS
- PostgreSQL & MikroORM
- bcryptjs
- class-validator
- TypeScript

**Frontend:**
- React 18
- Vite
- React Router
- React Query (TanStack Query)
- React Hook Form
- Zod
- Tailwind CSS
- TypeScript

## 📝 Notes

- The login page is UI-only (no backend integration) as per requirements.
- All passwords are securely hashed using bcrypt before storage.
- The application uses environment variables for configuration.
- CORS is properly configured for cross-origin requests.
- Input validation is implemented on both client and server side.

## 👤 Author

Created for Advanced Web Development course.

## 📄 License

This project is open source and available under the MIT License.

