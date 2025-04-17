import Product from '../models/product.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// get all product
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(
            products.map(product => ({
                name: product.name,
                image: product.image,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: product.price,
                countInStock: product.countInStock,
                rating: product.rating,
            }))
        );
    } catch (err) {
        res.status(500).json({ message: 'failed fetching product', error: err.message });
    }
};

// get one product
export const getProdutById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'failed fetching product by id', error: error.message });
    }
};

// create new product
export const createNewProduct = async (req, res) => {
    try {
        const { name, image, brand, category, description, price, countInStock, rating } = req.body;
        const product = new Product({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            user: req.user._id,
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'error creating new product', error: error.message });
    }
};

// update product
export const updateProduct = async (req, res) => {
    // 1. get product form db by id
    // 2. if (product) write updated values and fallback values
    // 3. update by product.save()
    // 4. res.send updated product
    // 5. else product not found
    // 6. catch - handle the err

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name?.trim() || product.name;
            product.image = req.body.image || product.image;
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            product.description = req.body.description || product.description;
            product.price = typeof req.body.price === 'number' ? req.body.price : product.price;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.rating = req.body.rating || product.rating;

            const updatedProduct = await product.save();
            res.json({
                message: 'product updated successfully',
                updatedProduct,
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'error deleting product', error: error.message });
    }
};
