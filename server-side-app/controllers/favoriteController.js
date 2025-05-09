const Favorite = require('../models/Favorite');

// Add a favorite movie
exports.addFavorite = async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        const favorite = new Favorite({ userId, movieId });
        await favorite.save();
        res.status(201).json({ message: 'Favorite added successfully', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error });
    }
};

// Remove a favorite movie
exports.removeFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        await Favorite.findByIdAndDelete(id);
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error });
    }
};

// Get all favorite movies for a user
exports.getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await Favorite.find({ userId });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving favorites', error });
    }
};