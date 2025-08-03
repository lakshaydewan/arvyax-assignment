# Arvyax - Wellness Session Management Platform

A full-stack web application for managing wellness sessions with user authentication and session tracking capabilities.

## 🚀 Project Overview

Arvyax is a modern web application built with React and Express.js that allows users to create, manage, and track wellness sessions. The platform features user authentication, session management, and a responsive UI built with modern design principles.

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript development
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
Arvyax/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React client application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Arvyax
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/arvyax
   JWT_SECRET=your_jwt_secret_here
   ```

2. **Frontend Environment Variables**
   No `.env` file needed for `frontend` directory:
   ```
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API server will start on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The React app will start on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Session Endpoints

- `GET /api/session` - Get all sessions for current user (protected)
- `POST /api/session` - Create a new session (protected)
- `PUT /api/session/:id` - Update a session (protected)
- `DELETE /api/session/:id` - Delete a session (protected)

### Health Check

- `GET /api/health` - Server health status

## 🗄️ Database Models

### User Model
```typescript
{
  email: String (unique),
  password_hash: String,
  createdAt: Date
}
```

### Session Model
```typescript
{
  title: String,
  tags: [String],
  jsonUrl: String,
  status: "draft" | "published",
  user: ObjectId (ref: User),
  updatedAt: Date
}
```

## 🎨 Features

### Frontend Features
- **User Authentication** - Login and signup pages
- **Dashboard** - Main application interface
- **Session Management** - Create, edit, and delete sessions
- **Responsive Design** - Mobile-friendly interface
- **Modern UI** - Clean and intuitive user experience
- **Toast Notifications** - User feedback for actions

### Backend Features
- **RESTful API** - Clean and consistent API design
- **JWT Authentication** - Secure user authentication
- **Password Hashing** - Secure password storage with bcrypt
- **Error Handling** - Comprehensive error management
- **Request Logging** - HTTP request monitoring
- **Security Middleware** - Helmet for security headers

## 🛠️ Development Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run clean    # Clean build directory
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
