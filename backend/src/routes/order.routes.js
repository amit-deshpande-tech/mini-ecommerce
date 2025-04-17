import express from 'express';
import protect from '../middlewares/auth.middlewares';
import { isAdmin } from '../middlewares/isadmin.middlewares';
import {
    createNewOrder,
    getOrderById,
    getMyOrders,
    getAllOrders,
    markOrderAsPaid,
    markOrderAsDeliverd,
} from '../controllers/order.controllers.js';

const router = express.Router();

router.post('/', protect, createNewOrder);
router.get('/:id', protect, getOrderById);
router.get('/myorders', protect, getMyOrders);
router.get('/orders', protect, isAdmin, getAllOrders);
router.put('/:id/pay', protect, markOrderAsPaid);
router.put('/:id/deliver', protect, isAdmin, markOrderAsDeliverd);

export default router;
