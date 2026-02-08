# eMala Backend API

A RESTful API backend for the eMala application with user management CRUD operations.

## 🚀 Features

- **User Management CRUD** - Create, Read, Update, Delete users
- **Supabase Integration** - PostgreSQL database via Supabase
- **Input Validation** - Request validation using express-validator
- **Password Hashing** - Secure password storage with bcrypt
- **Error Handling** - Global error handling middleware
- **CORS Support** - Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account with a project

## 🛠️ Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

## ⚙️ Configuration

1. Copy the `.env` file and update with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
PORT=3000
NODE_ENV=development
```

2. Create the `users` table in your Supabase database:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🏃 Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Request/Response Examples

**Create User:**
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2026-02-08T22:00:00.000Z"
  }
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js      # Supabase client configuration
│   ├── controllers/
│   │   └── userController.js # User CRUD operations
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handling
│   │   └── validate.js       # Validation middleware
│   ├── routes/
│   │   └── userRoutes.js     # User API routes
│   └── server.js             # Express app entry point
├── .env                       # Environment variables
├── package.json
└── README.md
```

## 🔒 Security Notes

- Passwords are hashed using bcrypt before storage
- Service role key should never be exposed to clients
- Add authentication middleware for protected routes

## 📝 License

MIT
