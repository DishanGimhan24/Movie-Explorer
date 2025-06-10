import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Button, Slider } from "@mui/material";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiConfig.js";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [minRating, setMinRating] = useState(0);

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

  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view this page.");
      navigate("/login");
      return;
    }

    try {
      const genreIds = selectedGenres.map((genre) => genre.value).join(",");
      const response = await axios.get(`${API_BASE_URL}/api/movies/all`, {
        params: {
          page,
          with_genres: genreIds || undefined,
          primary_release_year: releaseYear || undefined,
          "vote_average.gte": minRating || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.results) {
        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(
            (movie) => !prevMovies.some((prev) => prev.id === movie.id)
          );
          return page === 1 ? newMovies : [...prevMovies, ...newMovies];
        });
        setTotalPages(response.data.total_pages || 1);
      } else {
        console.error("Unexpected API response:", response.data.results);
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    fetchMovies(1);
  }, [selectedGenres, releaseYear, minRating]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies(currentPage);
    }
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/details/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%", // Changed from 100vw to 100%
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      {/* Filter Card */}
      <Box
        sx={{
          width: { xs: "100%", md: "300px" },
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: 3,
          marginBottom: { xs: "16px", md: "0" },
          marginRight: { md: "16px" },
          flexShrink: 0, // Prevent filter panel from shrinking
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
          isClearable
          options={Array.from({ length: 100 }, (_, i) => ({
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
          step={0.1}
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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            gridTemplateColumns: {
              xs: "repeat(auto-fit, minmax(120px, 1fr))",
              sm: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(180px, 1fr))",
            },
            gap: 2,
            paddingBottom: "16px",
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
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => handleMovieClick(movie.id)}
            >
              <CardMedia
                component="img"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                sx={{
                  height: { xs: 180, sm: 200, md: 220 },
                  borderRadius: "4px 4px 0 0",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  padding: 1,
                  flex: "1 0 auto",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  noWrap
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    marginBottom: "0.5rem",
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {movie.release_date?.split("-")[0] || "N/A"}
                </Typography>
                <Typography variant="body2" color="warning.main" fontWeight="bold">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
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
          <Box sx={{ display: "flex", justifyContent: "center", margin: "16px 0", flexShrink: 0 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              disabled={loading}
              sx={{ padding: "8px 24px" }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MoviesList;