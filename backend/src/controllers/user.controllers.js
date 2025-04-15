/*
Todo - use generate token all over this file
*/
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcryptjs';

// Generate jwt token
const generateToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// register user controller
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
            return res.status(400).json({ message: 'User already exists' });
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
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// login use controller
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        console.log('password form body', password);
        console.log('password form user', user.password);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

// get user profile controller
export const getUserProfile = async (req, res) => {
    try {
        // req.user is already set by protect middleware
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            console.log(user);
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// update user profile controller
export const updateUserProfile = async (req, res) => {
    try {
        //1. get user from db
        //2. check for any feild update, if yes then change it
        //3. save the changes
        //4. generate jwt
        //5. send user profile + token in res.json
        //6. handle else and catch case

        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
            }

            const updatedUser = await user.save();

            const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Profile update failed', error: err.message });
    }
};

// get all user controller - Admins only
export const getAllUsers = async (req, res) => {
    // 1. fetch all the user excluding their password
    // 2. return the json res
    // 3. handle error and catch

    try {
        const users = await User.find({}).select('-password');
        res.json(
            users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }))
        );
    } catch (err) {
        res.status(500).json({ message: 'error fetching all users', err });
    }
};

// delete user controller -Admins only
export const deleteUser = async (req, res) => {
    // 1. find the user by using req.params.id
    // 2. if user exist delete it
    // 3. else 404 user not found
    // 4. handle error in catch
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: 'user deleted successfully' });
        } else {
            return res.status(404).json({ message: 'user not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'error deleting user', error: err.message });
    }
};
