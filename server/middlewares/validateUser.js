import { body } from 'express-validator';

export const validateUser = [
    body('first_name').trim().isLength({ min: 2 }).withMessage('First Name is required'),
    body('last_name').trim().isLength({ min: 2 }).withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('phone')
        .isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits')
        .isNumeric().withMessage('Phone number must contain only digits')
];
