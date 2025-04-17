import Review from '../models/review.models';
import Product from '../models/product.models';

// review product
export const reviewProduct = async (req, res) => {
    try {
        const { rating, comments } = req.body;
        const productId = req.params.productId;
        const userId = req.params.userId;

        // 1. Find the product
        // 2. chech if user already reviewed thid product
        // 3. create new review
        // 4. update product's avg ratings and nemReviews

        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ message: 'product not found' });
        }

        const alreadyReviewed = await Review.findOne({ product: productId, user: userId });
        if (alreadyReviewed) {
            res.status(400).json({ messsage: 'Your already have reviewed this product' });
        }

        const review = new Review({
            name: req.user.name,
            rating: Number(rating),
            comments,
            user: userId,
            product: productId,
        });

        await review.save();

        // updating product's avg rating and numReviews
        const reviews = await Review.find({ product: productId });
        product.numReviews = reviews.length;
        product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await product.save();

        res.status(201).json({ message: 'review added', review });
    } catch (error) {
        res.status(500).json({ message: 'error adding review to product', error: error.message });
    }
};
