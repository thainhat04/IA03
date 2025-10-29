# User Registration Backend API

A NestJS backend API for user registration and authentication.

## Features

- ✅ User registration with email and password
- ✅ Password hashing using bcryptjs
- ✅ Input validation using class-validator
- ✅ Email uniqueness validation
- ✅ PostgreSQL database integration with TypeORM
- ✅ CORS enabled for frontend communication
- ✅ Error handling with meaningful messages

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **class-validator** - Validation decorators
- **TypeScript** - Programming language

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database running locally or remotely
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432
DATABASE_NAME=user_registration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

3. Create the database:
```bash
# Using psql
psql postgres
CREATE DATABASE user_registration;

# Or using createdb command
createdb user_registration
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm run start:prod
```

## API Endpoints

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

**Error Response (409 - Email already exists):**
```json
{
  "statusCode": 409,
  "message": "Email already registered"
}
```

**Error Response (400 - Validation error):**
```json
{
  "statusCode": 400,
  "message": [
    "Please provide a valid email address",
    "Password must be at least 6 characters long"
  ],
  "error": "Bad Request"
}
```

**Error Response (500 - Server error):**
```json
{
  "statusCode": 500,
  "message": "An error occurred during registration. Please try again."
}
```

## Validation Rules

- **Email**: Required, must be a valid email format
- **Password**: Required, must be at least 6 characters long

## Database Schema

### User Entity
```typescript
{
  id: number (auto-generated)
  email: string (unique, required)
  password: string (required, hashed)
  createdAt: Date (auto-generated)
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URI | PostgreSQL connection URI | postgresql://postgres:postgres@localhost:5432 |
| DATABASE_NAME | Database name | user_registration |
| PORT | Server port | 3000 |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 10
- Input validation using class-validator
- CORS configured for specific frontend origin
- SQL injection protection through TypeORM

## Project Structure

```
backend/
├── src/
│   ├── user/
│   │   ├── dto/
│   │   │   └── register-user.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.entity.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

### Railway/Render/Heroku

1. Set the following environment variables in your hosting platform:
   - `DATABASE_URI`: Your PostgreSQL connection string
   - `DATABASE_NAME`: Your database name
   - `PORT`: Server port (auto-assigned by platform)
   - `FRONTEND_URL`: Your deployed frontend URL

2. Deploy using Git push:
```bash
git push origin main
```

## License

MIT

