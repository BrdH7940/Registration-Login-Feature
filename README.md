# IA06 - User Registration System

A complete User Registration System with NestJS backend and React frontend.

## Project Structure

```
IA06/
├── frontend/          # React frontend application
└── backend/           # NestJS backend API (to be implemented)
```

## Frontend Setup

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

The following packages will be installed:

-   `react-router-dom` - For routing
-   `react-hook-form` - For form handling and validation
-   `@tanstack/react-query` - For API state management
-   `zod` - For schema validation
-   `@hookform/resolvers` - To integrate Zod with React Hook Form
-   `axios` - For HTTP requests
-   `@radix-ui/react-label` & `@radix-ui/react-alert-dialog` - UI components

### Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your backend API URL.

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Frontend Features

### Pages

1. **Home** (`/`) - Landing page with navigation to Sign Up and Login
2. **Sign Up** (`/signup`) - User registration form with validation
3. **Login** (`/login`) - Login form (UI only, mock implementation)

### Components

-   **Form Validation**: Using React Hook Form with Zod schemas
-   **API Integration**: React Query for managing API requests and state
-   **UI Components**: shadcn/ui components (Button, Input, Label, Card, Alert)
-   **Error Handling**: Comprehensive error messages and visual feedback
-   **Responsive Design**: Mobile-friendly interface

### API Integration

The frontend is configured to communicate with the backend API at the `/user/register` endpoint:

-   **POST** `/user/register` - Register a new user
    -   Request body: `{ email: string, password: string }`
    -   Returns success message or error response

## Backend Setup

(To be implemented)

The backend should provide:

-   User registration endpoint at `/user/register`
-   User schema with email (unique), password, and createdAt fields
-   Password hashing
-   CORS enabled for frontend requests
-   Environment variables for configuration

## Development Notes

-   The frontend uses Vite as the build tool
-   Tailwind CSS is used for styling
-   TypeScript is enabled for type safety
-   ESLint is configured for code quality

## Requirements Checklist

### Frontend ✅

-   [x] Routing (Home, Login, Sign Up)
-   [x] Sign Up Page (Form, Validation, API Integration with React Query)
-   [x] Login Page (Form, Validation, UI with shadcn/ui)
-   [x] Styled with shadcn/ui and Tailwind CSS
-   [x] React Hook Form for validation
-   [x] React Query for API state management

### Backend (To be implemented)

-   [ ] Database setup with User schema
-   [ ] POST /user/register endpoint
-   [ ] Input validation
-   [ ] Password hashing
-   [ ] Error handling
-   [ ] CORS configuration
-   [ ] Environment variables

## Deployment

For deployment, ensure:

1. Set `VITE_API_BASE_URL` to your production backend URL
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to your hosting service
