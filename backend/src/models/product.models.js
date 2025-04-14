import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String },
        category: { type: String },
        description: { type: String },
        price: { type: Number, requird: true },
        countInStock: { type: Number, required: true, default: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
