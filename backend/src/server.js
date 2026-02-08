import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'eMala API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
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
║   Pages:                                              ║
║   • /login.html         - Login page                  ║
║   • /dashboard.html     - Dashboard                   ║
║                                                       ║
║   Endpoints:                                          ║
║   • POST   /api/auth/login  - Login                   ║
║   • GET    /api/health      - Health check            ║
║   • GET    /api/users       - Get all users           ║
║   • POST   /api/users       - Create new user         ║
║   • PUT    /api/users/:id   - Update user             ║
║   • DELETE /api/users/:id   - Delete user             ║
║                                                       ║
║   Login: admin / admin                                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
