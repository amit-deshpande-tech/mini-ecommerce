import mongoose from 'mongoose';
import Product from './product.models';

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comments: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: Product,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
