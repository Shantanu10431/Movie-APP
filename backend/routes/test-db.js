const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    try {
        await prisma.$connect();
        const userCount = await prisma.user.count();
        res.json({
            success: true,
            message: 'Database connection successful',
            userCount,
            env: {
                keys: Object.keys(process.env).sort(),
                hasDbUrl: !!process.env.DATABASE_URL,
                nodeEnv: process.env.NODE_ENV
            }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({
            success: false,
            error: 'Database connection failed',
            details: error.message,
            env: {
                keys: Object.keys(process.env).sort(),
                hasDbUrl: !!process.env.DATABASE_URL
            },
            code: error.code,
            meta: error.meta
        });
    } finally {
        await prisma.$disconnect();
    }
});

module.exports = router;
