const express = require('express');
const router = express.Router();
const axios = require('axios');

const OMDB_BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = process.env.OMDB_API_KEY;

const fetchFromOmdb = async (params) => {
    try {
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: API_KEY,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error("OMDB Request Failed:", error.message);
        throw error;
    }
};

// @route   GET /api/movies/trending
// @desc    Get 2024 movies (Search 'movie' in 2024 to avoid "Too many results")
router.get('/trending', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'movie', y: '2024', type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/popular
// @desc    Get 2023 movies (Search 'love' in 2023)
router.get('/popular', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'love', y: '2023', type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/top-rated
// @desc    Get Oscar movies from 2023/2024
router.get('/top-rated', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'killers', y: '2023', type: 'movie' });
        const data2 = await fetchFromOmdb({ s: 'oppenheimer', type: 'movie' });

        let combined = [];
        if (data.Response === 'True') combined = [...combined, ...data.Search];
        if (data2.Response === 'True') combined = [...combined, ...data2.Search];

        const valid = combined.filter(m => m.Poster && m.Poster !== 'N/A');
        res.json({ success: true, data: valid });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/upcoming
// @desc    Get 2025 movies
router.get('/upcoming', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'american', y: '2025', type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/action
router.get('/action', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'civil', y: '2024', type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/comedy
router.get('/comedy', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ s: 'comedy', y: '2024', type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/series
router.get('/series', async (req, res) => {
    try {
        // 'house' returns House of Dragon, House of Ninjas etc
        const data = await fetchFromOmdb({ s: 'house', y: '2024', type: 'series' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
});

// @route   GET /api/movies/search?q=query
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const data = await fetchFromOmdb({ s: q, type: 'movie' });
        if (data.Response === 'True') {
            const valid = data.Search.filter(m => m.Poster && m.Poster !== 'N/A');
            res.json({ success: true, data: valid });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to search movies' });
    }
});

// @route   GET /api/movies/:id
// @desc    Get details by IMDb ID
router.get('/:id', async (req, res) => {
    try {
        const data = await fetchFromOmdb({ i: req.params.id, plot: 'full' });
        if (data.Response === 'True') {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movie details' });
    }
});

module.exports = router;
