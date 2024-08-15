import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { registerUser } from '../controllers/userController.js';
import { validateUser } from '../middlewares/validateUser.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
    next();
}, upload.single('profile_image'), validateUser, registerUser);



export default router;
