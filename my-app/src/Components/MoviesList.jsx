import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Button, Slider } from "@mui/material";
import Select from "react-select";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MoviesList = () => {
  const [movies, setMovies] = useState([]); // Movie data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Filters
  const [selectedGenres, setSelectedGenres] = useState([]); // Genre filter
  const [releaseYear, setReleaseYear] = useState(""); // Year filter
  const [minRating, setMinRating] = useState(0); // Minimum rating filter

  const genreOptions = [
    { value: "28", label: "Action" },
    { value: "12", label: "Adventure" },
    { value: "16", label: "Animation" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "99", label: "Documentary" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "14", label: "Fantasy" },
    { value: "36", label: "History" },
    { value: "27", label: "Horror" },
    { value: "10402", label: "Music" },
    { value: "9648", label: "Mystery" },
    { value: "10749", label: "Romance" },
    { value: "878", label: "Science Fiction" },
    { value: "10770", label: "TV Movie" },
    { value: "53", label: "Thriller" },
    { value: "10752", label: "War" },
    { value: "37", label: "Western" },
  ];

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);

    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view this page.");
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    try {
      const genreIds = selectedGenres.map((genre) => genre.value).join(",");
      const response = await axios.get(`http://localhost:5000/api/movies/all`, {
        params: {
          page,
          with_genres: genreIds || undefined, // Include only if selected
          primary_release_year: releaseYear || undefined, // Include only if selected
          "vote_average.gte": minRating || undefined, // Include only if selected
        },
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      if (response.data.results) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
        setTotalPages(response.data.total_pages || 1);
      } else {
        console.error("Unexpected API response:", response.data.results);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]); // Clear movies when filters change
    setCurrentPage(1); // Reset to the first page
    fetchMovies(1); // Fetch movies with updated filters
  }, [selectedGenres, releaseYear, minRating]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/details/${id}`); // Navigate to the movie details page
  };

  return (
    <Box sx={{ display: "flex", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      {/* Filter Card */}
      <Box
        sx={{
          width: "300px",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: 3,
          marginRight: "16px",
        }}
      >
        <Typography variant="h6" fontWeight="bold" marginBottom="16px" color="primary">
          Filters
        </Typography>

        {/* Genre Filter */}
        <Typography variant="subtitle1" marginBottom="8px" color="primary">
          Genres
        </Typography>
        <Select
          isClearable
          isMulti
          options={genreOptions}
          value={selectedGenres}
          onChange={(selectedOptions) => setSelectedGenres(selectedOptions || [])}
          placeholder="Select genres"
        />

        {/* Year Filter */}
        <Typography variant="subtitle1" marginTop="16px" marginBottom="8px" color="primary">
          Release Year
        </Typography>
        <Select
          options={Array.from({ length: 20 }, (_, i) => ({
            value: 2025 - i,
            label: 2025 - i,
          }))}
          value={releaseYear ? { value: releaseYear, label: releaseYear } : null}
          onChange={(selectedOption) => setReleaseYear(selectedOption ? selectedOption.value : "")}
          placeholder="Select year"
        />

        {/* Minimum Rating Filter */}
        <Typography variant="subtitle1" marginTop="16px" marginBottom="8px" color="primary">
          Minimum Rating
        </Typography>
        <Slider
          value={minRating}
          onChange={(e, newValue) => setMinRating(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10}
        />

        {/* Reset Filters Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px" }}
          onClick={() => {
            setSelectedGenres([]);
            setReleaseYear("");
            setMinRating(0);
          }}
        >
          Reset Filters
        </Button>
      </Box>

      {/* Movies List */}
      <Box sx={{ flex: 1 }}>
        {/* Error Message */}
        {error && (
          <Typography variant="body1" color="error" textAlign="center" sx={{ marginBottom: "16px" }}>
            {error}
          </Typography>
        )}

        {/* Movie Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 8,
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
              }}
              onClick={() => handleMovieClick(movie.id)} // Add click handler
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  height: 300,
                  borderRadius: "4px 4px 0 0",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ textAlign: "center", padding: 1 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  noWrap
                  sx={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {movie.release_date?.split("-")[0]}
                </Typography>
                <Typography variant="body2" color="warning.main" fontWeight="bold">
                  ⭐ {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100px" }}>
            <CircularProgress />
          </Box>
        )}

        {/* Load More Button */}
        {!loading && currentPage < totalPages && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button variant="contained" color="primary" onClick={handleLoadMore}>
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MoviesList;