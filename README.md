# IA06 - User Registration System

NestJS backend + React frontend user registration system.

## Quick Start

### Prerequisites

-   Node.js v18+
-   MongoDB (local or Atlas)

### Setup & Run

**1. Backend (Terminal 1)**

```bash
cd backend
npm install

# Create backend/.env
echo "PORT=3000
CONNECTIONSTRING=mongodb://localhost:27017/ia06
FRONTEND_URL=http://localhost:5173" > .env

npm run start:dev
```

**2. Frontend (Terminal 2)**

```bash
cd frontend
npm install

# Optional: Create frontend/.env
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

npm run dev
```

**3. Access**

-   Frontend: http://localhost:5173
-   Backend API: http://localhost:3000

## MongoDB Setup

**Local (Docker):**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas:**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `CONNECTIONSTRING` in `backend/.env`

## Environment Variables

**backend/.env:**

```env
PORT=3000
CONNECTIONSTRING=mongodb://localhost:27017/ia06
FRONTEND_URL=http://localhost:5173
```

**frontend/.env (optional):**

```env
VITE_API_BASE_URL=http://localhost:3000
```

## API Endpoint

**POST** `/user/register`

-   Request: `{ email: string, password: string }`
-   Response: `{ message: string, user?: { email: string, createdAt: string } }`

## Features

-   ✅ User registration with email/password
-   ✅ Password hashing (bcrypt)
-   ✅ Input validation
-   ✅ CORS enabled
-   ✅ Error handling
-   ✅ React Query for API calls
-   ✅ Form validation (React Hook Form + Zod)
