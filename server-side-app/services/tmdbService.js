import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Add your TMDb API key to the .env file
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Debugging: Log environment variables
console.log('TMDB_API_KEY in tmdbService:', TMDB_API_KEY);
console.log('MONGODB_URI in tmdbService:', process.env.MONGODB_URI);

// Fetch trending movies
export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
            params: { api_key: TMDB_API_KEY },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error.response?.data || error.message);
        throw new Error('Failed to fetch trending movies. Please try again later.');
    }
};

// Search for movies
export const searchMovies = async (query, page = 1, filters = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
                page,
                ...filters, // Spread additional filters into the request
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error.response?.data || error.message);
        throw new Error('Failed to fetch search results. Please try again later.');
    }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: { api_key: TMDB_API_KEY },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error.response?.data || error.message);
        throw new Error('Failed to fetch movie details. Please try again later.');
    }
};

// Fetch all movies (using Discover API with genre filter)
export const fetchAllMovies = async (page = 1, filters = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                sort_by: 'popularity.desc', // Default sorting by popularity
                page, // Pagination
                ...filters, // Spread additional filters into the request
            },
        });
        return {
            results: response.data.results, // Movie results
            total_pages: response.data.total_pages, // Total number of pages
            total_results: response.data.total_results, // Total number of results
        };
    } catch (error) {
        console.error('Error fetching all movies:', error.response?.data || error.message);
        throw new Error('Failed to fetch all movies. Please try again later.');
    }
};