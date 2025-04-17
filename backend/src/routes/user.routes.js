import express from 'express';
import protect from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/isadmin.middlewares.js';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
} from '../controllers/user.controllers.js';

const router = express.Router();

// public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// private routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);

export default router;
