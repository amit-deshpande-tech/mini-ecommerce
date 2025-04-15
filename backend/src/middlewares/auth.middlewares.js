import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Getting token from the header
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // attach user to the req excluding password
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token was failed' });
    }
};

export default protect;
