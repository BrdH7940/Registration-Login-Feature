# IA06 - User Registration & Authentication System

A full-stack web application built with **NestJS** (backend) and **React + TypeScript** (frontend) for user registration and authentication with comprehensive security features.

## 🚀 Quick Start

### Prerequisites

-   Node.js v18+
-   MongoDB (local or Atlas)

### Installation & Run

**Backend:**

```bash
cd backend
npm install

# Create .env file
echo "PORT=3000
CONNECTIONSTRING=mongodb://localhost:27017/ia06
FRONTEND_URL=http://localhost:5173" > .env

npm run start:dev
```

**Frontend:**

```bash
cd frontend
npm install

# Optional: Create .env file
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

npm run dev
```

**Access:**

-   Frontend: http://localhost:5173
-   Backend API: http://localhost:3000
-   API Documentation: http://localhost:3000/api

#### 🗄️ MongoDB Setup

**MongoDB Atlas:**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `CONNECTIONSTRING` in `backend/.env`
