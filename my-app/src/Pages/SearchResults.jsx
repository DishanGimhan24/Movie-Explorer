import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  // Extract the query parameter from the URL
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/search?query=${query}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for "{query}"
      </h1>
      <div className="space-y-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card mb-4 p-3 shadow-sm border rounded"
          >
            <div className="row g-4 align-items-start">
              {/* Poster: 2 columns on md+ screens */}
              <div className="col-12 col-md-2">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded"
                />
              </div>

              {/* Movie Details: 10 columns on md+ screens */}
              <div className="col-12 col-md-10">
                <h5 className="card-title fw-bold">{movie.title}</h5>
                <p className="card-text text-muted mb-2">{movie.overview}</p>
                <p className="text-warning mb-1">⭐ {movie.vote_average}</p>
                <p className="text-secondary mb-0">
                  Release Date:{" "}
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click Me
</button>



    </div>
  );
};

export default SearchResults;
