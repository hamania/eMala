import express from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Validation rules
const createUserValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Name must be between 2 and 255 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('role')
        .optional()
        .isIn(['admin', 'user', 'manager'])
        .withMessage('Role must be admin, user, or manager')
];

const updateUserValidation = [
    param('id')
        .isInt()
        .withMessage('User ID must be a valid integer'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage('Name must be between 2 and 255 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('role')
        .optional()
        .isIn(['admin', 'user', 'manager'])
        .withMessage('Role must be admin, user, or manager')
];

const idValidation = [
    param('id')
        .isInt()
        .withMessage('User ID must be a valid integer')
];

// Routes
router.get('/', getUsers);
router.get('/:id', idValidation, validate, getUserById);
router.post('/', createUserValidation, validate, createUser);
router.put('/:id', updateUserValidation, validate, updateUser);
router.delete('/:id', idValidation, validate, deleteUser);

export default router;
