import { validationResult } from 'express-validator';
import { createUser } from '../models/userModel.js';

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { first_name, last_name, middle_name, email, phone } = req.body;
        const profile_image = req.file ? req.file.filename : null;

        await createUser({ first_name, last_name, middle_name, email, phone, profile_image });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

