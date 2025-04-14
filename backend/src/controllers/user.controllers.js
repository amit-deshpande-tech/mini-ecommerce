import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// Generate jwt token
const generateToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate input
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All feilds are required' });
        }

        // 2. check if user exists

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
        }

        // 3. Create new user
        const user = await User.create({ name, email, password });

        // 4. send a success res with token
        const token = generateToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
