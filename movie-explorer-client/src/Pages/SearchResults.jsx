import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Search Results for "{query}"</h1>
      <div className="flex flex-col gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="flex bg-white rounded-lg shadow p-4">
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-md mr-4"
            />
            {/* Movie Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p className="text-gray-700 text-sm line-clamp-3">{movie.overview}</p>
              </div>
              <p className="text-yellow-500 font-medium mt-2">⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
