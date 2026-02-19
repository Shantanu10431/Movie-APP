const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // HARDCODED FALLBACK for Vercel env issue
            const secret = process.env.JWT_SECRET || 'supersecretjwtkey123456789';
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
