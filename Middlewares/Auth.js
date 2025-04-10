import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const isAuthenticated = async (req, res, next) => {
    const token = req.header('Auth');

    if (!token) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);  // throws if expired or invalid

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
};
