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
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
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
    setCurrentPage(1); // Reset to first page
    fetchMovies(1);
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
    navigate(`/movies/details/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        margin: 0,
        padding: { xs: "8px", sm: "16px" }, // Responsive padding
        overflow: "hidden", // Prevent outer scrollbars
      }}
    >
      {/* Filter Card */}
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "25%", lg: "20%" }, // Responsive width
          maxWidth: { md: "300px" }, // Cap filter panel width
          minWidth: { xs: "auto", md: "200px" }, // Prevent collapse on medium screens
          padding: { xs: "12px", sm: "16px" },
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: 3,
          marginBottom: { xs: "16px", md: 0 },
          marginRight: { md: "16px" },
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
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "0.875rem",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999, // Ensure dropdown is not clipped
            }),
          }}
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
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "0.875rem",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
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
          sx={{ width: "100%" }}
        />

        {/* Reset Filters Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px", fontSize: "0.875rem" }}
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
          padding: { xs: "8px", sm: "16px" },
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
              xs: "repeat(auto-fit, minmax(120px, 1fr))", // Smaller cards on mobile
              sm: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(180px, 1fr))",
            },
            gap: { xs: 2, sm: 4, md: 8 }, // Responsive gap
          }}
        >
          {movies.map((movie, index) => (
            <Card
              key={`${movie.id}-${index}`}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
                margin: "auto", // Center cards
                maxWidth: "200px", // Cap card width
              }}
              onClick={() => handleMovieClick(movie.id)}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  aspectRatio: "2/3", // Maintain poster aspect ratio
                  width: "100%",
                  borderRadius: "4px 4px 0 0",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ textAlign: "center", padding: { xs: 1, sm: 2 } }}>
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
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.625rem", sm: "0.75rem" } }}
                >
                  {movie.release_date?.split("-")[0] || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  color="warning.main"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
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
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
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