import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true },
    title: String,
    poster: String,
    releaseDate: String,
});

export default mongoose.model('Favorite', favoriteSchema);
