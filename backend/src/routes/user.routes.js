import express from 'express';
import { registerUser } from '../controllers/user.controllers.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// public routes
router.post('/register', registerUser);
// router.post('/login', loginUser);

// private routes
// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

export default router;
