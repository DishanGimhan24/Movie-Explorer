import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      alert('Error fetching search results');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-bold">{movie.title}</h3>
            <p className="text-gray-600">{movie.release_date.split('-')[0]}</p>
            <p className="text-yellow-500">⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;