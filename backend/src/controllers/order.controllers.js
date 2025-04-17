import Order from '../models/order.models.js';

// create new order
export const createNewOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            isPaid,
            paidAt,
            isDelivered,
            deliveredAt,
            totalPrice,
        } = req.body;
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            isPaid,
            paidAt,
            isDelivered,
            deliveredAt,
            totalPrice,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'error creating new order', error: error.message });
    }
};

// get order by id
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'error fetching product', error: error.message });
    }
};

// get all orders of user
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'orders not found', error: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'error fetching all orders', error: error.message });
    }
};

// get all orders - Admin only
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        if (orders.length === 0) {
            return res.status(404).json({ message: 'orders not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'error fetching all orders of all users',
            error: error.message,
        });
    }
};

// after successful payment mark order as paid
export const markOrderAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'error marking order as paid', error: error.message });
    }
};

// after successful delivery of product mark order as delivered - Admin only
export const markOrderAsDeliverd = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'error making order as delivered', error: error.message });
    }
};
