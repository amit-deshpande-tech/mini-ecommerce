export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // user is authenticated and is an admin
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
