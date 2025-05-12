import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Pagination from "../Common/Pagination.jsx";
import  API_BASE_URL  from "../apiConfig.js"; // Import API base URL

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("example"); // Replace with actual query logic
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null); // Error state
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Extract the query parameter from the URL
  const queryParam = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setError(null);

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view this page.");
        navigate("/login"); // Redirect to login page if not authenticated
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/movies/search`,
          {
            params: {
              query: queryParam,
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again later.");
      }
    };

    if (queryParam) {
      setQuery(queryParam);
      fetchSearchResults();
    }
  }, [queryParam, currentPage, navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for "{query}"
      </h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card mb-4 p-3 shadow-sm border rounded flex items-center justify-center"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Poster */}
              <div className="col-span-2 flex items-center justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
              </div>

              {/* Name, Ratings, and Release Date */}
              <div className="col-span-3 flex flex-col items-start justify-center p-4">
                <h5 className="font-bold text-lg text-left">{movie.title}</h5>
                <p className="text-yellow-500 mb-1 text-left">
                  ⭐ {movie.vote_average}
                </p>
                <p className="text-gray-500">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Description */}
              <div className="col-span-7 flex items-center justify-center">
                <p className="text-gray-600 text-left">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchResults;
