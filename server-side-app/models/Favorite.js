const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movieId: {
        type: String,
        required: true
    },
    movieDetails: {
        title: {
            type: String,
            required: true
        },
        releaseDate: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true
        },
        posterPath: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;