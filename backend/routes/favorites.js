const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { protect } = require('../middleware/auth');

// @route   GET /api/favorites
// @desc    Get user favorites
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: favorites });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// @route   POST /api/favorites
// @desc    Add a movie to favorites
// @access  Private
router.post('/', protect, async (req, res) => {
    const { movieId, title, posterPath } = req.body;

    try {
        const exists = await prisma.favorite.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: String(movieId)
                }
            }
        });

        if (exists) {
            return res.status(400).json({ success: false, error: 'Movie already in favorites' });
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.user.id,
                movieId: String(movieId),
                title,
                posterPath
            }
        });

        res.status(201).json({ success: true, data: favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// @route   DELETE /api/favorites/:movieId
// @desc    Remove a movie from favorites
// @access  Private
router.delete('/:movieId', protect, async (req, res) => {
    try {
        const deleted = await prisma.favorite.deleteMany({
            where: {
                userId: req.user.id,
                movieId: String(req.params.movieId)
            }
        });

        if (deleted.count === 0) {
            return res.status(404).json({ success: false, error: 'Favorite not found' });
        }

        res.json({ success: true, message: 'Movie removed from favorites' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
