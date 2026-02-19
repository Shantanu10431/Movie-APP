const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

console.log('Server starting...');
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const favoriteRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins for now to fix Vercel deployment
        // In production, you would whitelist specific domains
        callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting (Login only)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: { success: false, error: "Too many login attempts, please try again after 15 minutes" }
});
app.use('/api/auth/login', loginLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/test-db', require('./routes/test-db'));

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'API is running', timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});

// Export the app for Vercel
module.exports = app;

// Only listen if not running in a serverless environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
