import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
    const userId = req.userId;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
};

export const addFavorite = async (req, res) => {
    const { movieId, title, poster, releaseDate } = req.body;
    const userId = req.userId;
    const exists = await Favorite.findOne({ userId, movieId });
    if (exists) {
        return res.status(400).json({ error: 'Already in favorites' });
    }
    const favorite = new Favorite({ userId, movieId, title, poster, releaseDate });
    await favorite.save();
    res.status(201).json(favorite);
};

export const removeFavorite = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.userId;
    await Favorite.findOneAndDelete({ userId, movieId });
    res.json({ message: 'Favorite removed' });
};
