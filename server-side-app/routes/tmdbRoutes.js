import express from 'express';
import { fetchTrendingMovies, searchMovies, fetchMovieDetails, fetchAllMovies } from '../services/tmdbService.js';

const router = express.Router();

// Get trending movies
router.get('/trending', async (req, res) => {
    try {
        const movies = await fetchTrendingMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search for movies
router.get('/search', async (req, res) => {
    const { query, page } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const results = await searchMovies(query, page || 1);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get movie details
router.get('/details/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await fetchMovieDetails(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all movies (using Discover API)
router.get('/all', async (req, res) => {
    const { page } = req.query; // Optional pagination
    try {
        const movies = await fetchAllMovies(page || 1);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;