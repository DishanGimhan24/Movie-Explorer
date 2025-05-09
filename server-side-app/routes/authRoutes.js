const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route for getting user profile (protected)
router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

module.exports = router;