import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { login, getCurrentUser, logout } from '../controllers/authController.js';

const router = express.Router();

// Validation rules
const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email/username is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Routes
router.post('/login', loginValidation, validate, login);
router.get('/me', getCurrentUser);
router.post('/logout', logout);

export default router;
