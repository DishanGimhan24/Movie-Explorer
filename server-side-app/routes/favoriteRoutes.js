const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a favorite movie
router.post('/', authMiddleware.verifyToken, favoriteController.addFavorite);

// Route to remove a favorite movie
router.delete('/:id', authMiddleware.verifyToken, favoriteController.removeFavorite);

// Route to get all favorite movies for a user
router.get('/', authMiddleware.verifyToken, favoriteController.getFavorites);

module.exports = router;