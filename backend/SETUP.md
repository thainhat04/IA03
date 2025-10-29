# Backend Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env` file in the backend directory with the following content:
   ```env
   DATABASE_URI=postgresql://postgres:postgres@localhost:5432
   DATABASE_NAME=user_registration
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

   **Note**: Update the `DATABASE_URI` with your PostgreSQL credentials if they differ from the default.

3. **Create PostgreSQL Database**
   
   Make sure PostgreSQL is installed and running on your system.
   
   Create the database using one of these methods:
   
   **Option A - Using psql:**
   ```bash
   psql postgres
   CREATE DATABASE user_registration;
   \q
   ```
   
   **Option B - Using createdb command:**
   ```bash
   createdb user_registration
   ```

4. **Run the Backend**
   ```bash
   npm run start:dev
   ```

The backend server will be running on `http://localhost:3000`

## API Testing

You can test the registration endpoint using curl or Postman:

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "test@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Troubleshooting

1. **Cannot find module errors**: Run `npm install` in the backend directory
2. **Database connection error**: Check PostgreSQL is running and credentials are correct
3. **Port already in use**: Change the PORT in `.env` file

## Files Created

```
backend/
├── src/
│   ├── user/
│   │   ├── dto/
│   │   │   └── register-user.dto.ts      # Validation DTO
│   │   ├── user.controller.ts            # POST /user/register endpoint
│   │   ├── user.entity.ts                # User database schema
│   │   ├── user.module.ts                # User module configuration
│   │   ├── user.service.ts               # Business logic & password hashing
│   │   └── user.service.spec.ts         # Unit tests
│   ├── app.module.ts                     # Main application module
│   └── main.ts                           # Application entry point
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript configuration
├── nest-cli.json                         # NestJS CLI configuration
├── .eslintrc.js                          # ESLint configuration
├── .prettierrc                           # Prettier configuration
├── .gitignore                            # Git ignore rules
└── README.md                             # Documentation
```

