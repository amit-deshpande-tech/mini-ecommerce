import express from 'express';
import protect from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/isadmin.middlewares.js';
import { reviewProduct } from '../controllers/review.controller.js';
import {
    getAllProducts,
    getProdutById,
    createNewProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controllers.js';

const router = express.Router();

// public routes
router.get('/', getAllProducts);
router.get('/:id', getProdutById);

// protected routes
router.post('/', protect, isAdmin, createNewProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.post('/products/:id/reviews', protect, reviewProduct);

export default router;
