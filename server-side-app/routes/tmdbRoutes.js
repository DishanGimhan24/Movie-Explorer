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
    const { page, with_genres, primary_release_year, 'vote_average.gte': minRating, 'vote_average.lte': maxRating } = req.query;

    try {
        // Build filters object
        const filters = {};
        if (with_genres) filters.with_genres = with_genres; // Filter by genre
        if (primary_release_year) filters.primary_release_year = primary_release_year; // Filter by release year
        if (minRating) filters['vote_average.gte'] = minRating; // Filter by minimum rating
        if (maxRating) filters['vote_average.lte'] = maxRating; // Filter by maximum rating

        // Fetch movies with filters
        const movies = await fetchAllMovies(page || 1, filters);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get movies filtered by multiple genres
router.get('/filter-by-genres', async (req, res) => {
    const { page, genre_ids } = req.query;

    if (!genre_ids) {
        return res.status(400).json({ message: 'Genre IDs parameter is required' });
    }

    try {
        const filters = { with_genres: genre_ids }; // Add genre filter as a comma-separated list
        const movies = await fetchAllMovies(page || 1, filters);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;