const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
};

// // Get order by ID - without asyncHandler
// export const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (order) {
//             res.status(200).json(order);
//         } else {
//             res.status(404).json({ message: 'Order not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching order', error: error.message });
//     }
// };

// // with asyncHandler
// import asyncHandler from '../utils/asyncHandler.js';

// // Get order by ID - with asyncHandler
// export const getOrderById = asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//         res.status(200).json(order);
//     } else {
//         res.status(404).json({ message: 'Order not found' });
//     }
// });
