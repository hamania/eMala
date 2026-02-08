import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Default admin credentials (for demo purposes)
const DEFAULT_ADMIN = {
    email: 'admin',
    password: 'admin'
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for default admin credentials
        if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: 0,
                        name: 'Administrator',
                        email: 'admin@emala.com',
                        role: 'admin'
                    },
                    token: 'admin-demo-token'
                }
            });
        }

        // Check database for user
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, password, role')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: userWithoutPassword,
                token: `user-token-${user.id}` // In production, use JWT
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
    try {
        // In a real app, extract user from JWT token
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        // Demo: return admin for admin token
        if (token === 'admin-demo-token') {
            return res.status(200).json({
                success: true,
                data: {
                    id: 0,
                    name: 'Administrator',
                    email: 'admin@emala.com',
                    role: 'admin'
                }
            });
        }

        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
