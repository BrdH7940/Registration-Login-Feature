## 📁 Project Structure

```
IA06/
├── backend/
│   ├── src/
│   │   ├── common/          # Shared utilities
│   │   │   ├── config/      # Swagger configuration
│   │   │   ├── decorators/  # Custom decorators
│   │   │   ├── filters/     # Exception filters
│   │   │   ├── guards/      # Rate limiting guards
│   │   │   ├── health/      # Health check
│   │   │   ├── interceptors/# Request/response logging
│   │   │   ├── pipes/       # Input sanitization
│   │   │   └── validators/  # Custom validators
│   │   ├── user/            # User module
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── schemas/     # MongoDB schemas
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── auth/        # Auth-specific components
    │   │   ├── ui/          # Reusable UI components
    │   │   └── ErrorBoundary.tsx
    │   ├── pages/           # Page components
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   └── SignUp.tsx
    │   ├── lib/             # Utilities
    │   │   ├── api.ts       # API client
    │   │   ├── query-client.ts
    │   │   └── utils.ts
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## 🛠️ Technology Stack

### Backend

-   **NestJS** - Progressive Node.js framework
-   **TypeScript** - Type-safe development
-   **MongoDB** - NoSQL database
-   **Mongoose** - MongoDB object modeling
-   **Bcrypt** - Password hashing
-   **class-validator** - Validation decorators
-   **Swagger** - API documentation (optional)

### Frontend

-   **React 19** - UI library
-   **TypeScript** - Type-safe development
-   **Vite** - Build tool and dev server
-   **React Router** - Client-side routing
-   **React Query** - Server state management
-   **React Hook Form** - Form handling
-   **Zod** - Schema validation
-   **Axios** - HTTP client
-   **Framer Motion** - Animation library
-   **Tailwind CSS** - Utility-first CSS
-   **shadcn/ui** - UI component library

## ✨ Features

### Frontend Features

-   **User Registration** - Email/password registration with validation
-   **User Login** - Secure authentication flow
-   **Form Validation** - React Hook Form + Zod schema validation
-   **Error Handling** - React Error Boundary for component errors
-   **API Integration** - Axios with interceptors and error handling
-   **State Management** - React Query for server state and caching
-   **UI/UX** - Modern, responsive design with Framer Motion animations
-   **Loading States** - Visual feedback during API calls
-   **Type Safety** - Full TypeScript implementation

### Backend Features

-   **User Registration** - Secure user registration with validation
-   **User Login** - Authentication with password verification
-   **Password Security** - Bcrypt hashing (10 salt rounds)
-   **Input Validation** - Multi-layer validation system
-   **Rate Limiting** - Protection against brute force attacks
-   **API Documentation** - Swagger/OpenAPI integration (optional)
-   **Health Monitoring** - Health check endpoint
-   **Error Handling** - Global exception filter with structured logging
-   **Request Logging** - Comprehensive request/response logging
-   **CORS** - Configured for frontend communication

## 🔒 Security Features

### Multi-Layer Security Architecture

**Layer 1: Input Sanitization**

-   Automatic whitespace trimming on all string inputs
-   Global TrimPipe applied to all requests

**Layer 2: DTO Validation**

-   Email format validation with normalization (lowercase, trim)
-   Password strength requirements (min 6 chars, letter + number)
-   Length limits (email: 255, password: 128)
-   No whitespace allowed in passwords
-   Required field validation

**Layer 3: Global Validation Pipeline**

-   Whitelist filtering (strips unknown properties)
-   Mass assignment protection (blocks extra properties)
-   Type-safe transformations
-   Custom error messages

**Layer 4: Rate Limiting**

-   Registration: 5 requests/minute per IP
-   Login: 10 requests/minute per IP
-   Prevents brute force attacks

**Layer 5: Service-Level Security**

-   Secure password hashing with bcrypt
-   Duplicate email detection
-   Security event logging

**Layer 6: Database Constraints**

-   Email uniqueness constraint
-   Automatic email normalization
-   Schema-level validation

### Protected Against

-   ✅ Invalid input formats
-   ✅ SQL/NoSQL injection attacks
-   ✅ Mass assignment attacks
-   ✅ Brute force attacks
-   ✅ DoS attempts
-   ✅ Weak passwords
-   ✅ Email injection
-   ✅ Whitespace injection
-   ✅ Type confusion attacks

## 📡 API Endpoints

### POST `/user/register`

Register a new user.

**Request:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response (201):**

```json
{
    "message": "User registered successfully",
    "user": {
        "email": "user@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
}
```

**Errors:**

-   `400` - Validation failed
-   `409` - Email already registered
-   `429` - Too many requests

### POST `/user/login`

Authenticate a user.

**Request:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response (200):**

```json
{
    "message": "Login successful",
    "user": {
        "email": "user@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
}
```

**Errors:**

-   `400` - Validation failed
-   `401` - Invalid email or password
-   `429` - Too many requests

### GET `/health`

Health check endpoint.

**Response (200):**

```json
{
    "status": "ok",
    "uptime": 12345
}
```

## 🔧 Configuration

### Backend Environment Variables (`backend/.env`)

```env
PORT=3000
CONNECTIONSTRING=mongodb://localhost:27017/ia06
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Environment Variables (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📦 Optional: Swagger API Documentation

To enable interactive API documentation:

```bash
cd backend
npm install @nestjs/swagger swagger-ui-express
```

After installation, restart the server and access:

-   **Swagger UI**: http://localhost:3000/api

_Note: Swagger is automatically disabled in production mode._

## 🎯 Best Practices Implemented

### Backend

-   ✅ Structured logging with NestJS Logger
-   ✅ Global exception filtering
-   ✅ Request/response interceptors
-   ✅ Input sanitization
-   ✅ Type-safe DTOs
-   ✅ Separation of concerns
-   ✅ Error handling
-   ✅ Health monitoring

### Frontend

-   ✅ Error boundaries for component errors
-   ✅ Type-safe API calls
-   ✅ Form validation
-   ✅ Loading and error states
-   ✅ Component reusability
-   ✅ Environment configuration
-   ✅ Responsive design

## 🚀 Future Enhancements

Potential improvements for production:

-   JWT authentication tokens
-   Refresh token mechanism
-   Email verification
-   Password reset functionality
-   Role-based access control
-   Two-factor authentication
-   API versioning
-   Unit and E2E tests
-   CI/CD pipeline
-   Docker containerization
-   Application monitoring
