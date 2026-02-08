import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'eMala API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 eMala Backend API Server                         ║
║                                                       ║
║   Port: ${PORT}                                          ║
║   Mode: ${process.env.NODE_ENV || 'development'}                               ║
║                                                       ║
║   Endpoints:                                          ║
║   • GET    /api/health      - Health check            ║
║   • GET    /api/users       - Get all users           ║
║   • GET    /api/users/:id   - Get user by ID          ║
║   • POST   /api/users       - Create new user         ║
║   • PUT    /api/users/:id   - Update user             ║
║   • DELETE /api/users/:id   - Delete user             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
