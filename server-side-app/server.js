import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import tmdbRoutes from './routes/tmdbRoutes.js';

// Load environment variables from .env


const app = express();
const PORT = process.env.PORT || 5000;

// Debugging: Log environment variables
console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Validate environment variables
if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
}


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Public routes
app.use('/api/favorites', authMiddleware, favoriteRoutes); // Protected routes
app.use('/api/movies', authMiddleware,tmdbRoutes); // TMDb routes

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Database connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Database connection error:', err);
    });
