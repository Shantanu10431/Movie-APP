const express = require('express');
const router = express.Router();
const axios = require('axios'); // We need to install axios in backend too or use fetch
const { protect } = require('../middleware/auth');

// We need to install axios: npm install axios
// For now, let's assume we'll run that or use fetch. Let's stick to axios as per prompt.

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

const fetchFromTmdb = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// @route   GET /api/movies/trending
// @access  Public
router.get('/trending', async (req, res) => {
    try {
        const data = await fetchFromTmdb('/trending/movie/week');
        res.json({ success: true, data: data.results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch trending movies' });
    }
});

// @route   GET /api/movies/popular
// @access  Public
router.get('/popular', async (req, res) => {
    try {
        const data = await fetchFromTmdb('/movie/popular');
        res.json({ success: true, data: data.results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch popular movies' });
    }
});

// @route   GET /api/movies/top-rated
// @access  Public
router.get('/top-rated', async (req, res) => {
    try {
        const data = await fetchFromTmdb('/movie/top_rated');
        res.json({ success: true, data: data.results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch top rated movies' });
    }
});

// @route   GET /api/movies/upcoming
// @access  Public
router.get('/upcoming', async (req, res) => {
    try {
        const data = await fetchFromTmdb('/movie/upcoming');
        res.json({ success: true, data: data.results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch upcoming movies' });
    }
});

// @route   GET /api/movies/search?q=query
// @access  Public
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const data = await fetchFromTmdb('/search/movie', { query: q });
        res.json({ success: true, data: data.results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to search movies' });
    }
});

// @route   GET /api/movies/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const data = await fetchFromTmdb(`/movie/${req.params.id}`, { append_to_response: 'credits,videos,similar' });
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movie details' });
    }
});

module.exports = router;
