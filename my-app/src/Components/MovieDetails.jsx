import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { PlayArrow, Favorite, Bookmark } from "@mui/icons-material";
import axios from "axios";
import RatingCircle from "../Common/RatingCircle.jsx"; // Import the RatingCircle component
import API_BASE_URL from "../apiConfig.js";


const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [movie, setMovie] = useState(null); // Movie details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view this page.");
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    // Fetch movie details
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/movies/details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen bg-blue-50">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="text-center p-4 bg-blue-50">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-blue-100 text-black min-h-screen p-6 md:p-10 gap-8">
      {/* Poster */}
      <div className="md:w-1/3">
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-start md:w-2/3 gap-4">
        {/* Title & Meta */}
        <Typography variant="h4" fontWeight="bold" className="text-blue-900">
          {movie.title}{" "}
          <span className="text-blue-700">
            ({new Date(movie.release_date).getFullYear()})
          </span>
        </Typography>
        <Typography className="text-sm text-blue-600">
          <span className="px-2 py-0.5 border rounded border-blue-500 mr-2">
            {movie.certification || "NR"}
          </span>
          {movie.release_date} (
          {movie.production_countries?.[0]?.iso_3166_1 || "N/A"}) •{" "}
          {movie.genres?.map((genre) => genre.name).join(", ")} •{" "}
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </Typography>

        {/* User Score & Actions */}
        <div className="flex items-center gap-4 mt-2">
          <RatingCircle value={Math.round(movie.vote_average * 10)} />
          <Button variant="contained" color="primary" size="small">
            What's your Vibe?
          </Button>
          <div className="flex gap-2">
            <Button variant="outlined" color="primary">
              <Favorite fontSize="small" />
            </Button>
            <Button variant="outlined" color="primary">
              <Bookmark fontSize="small" />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PlayArrow />}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.title
                  )} trailer`,
                  "_blank"
                )
              }
            >
              Play Trailer
            </Button>
          </div>
        </div>

        {/* Tagline */}
        <Typography variant="subtitle1" className="italic text-blue-700 mt-4">
          {movie.tagline || "No tagline available."}
        </Typography>

        {/* Overview */}
        <Typography
          variant="h6"
          fontWeight="bold"
          className="mt-2 text-blue-900"
        >
          Overview
        </Typography>
        <Typography variant="body1" className="text-blue-800">
          {movie.overview}
        </Typography>

        {/* Crew */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {movie.credits?.crew.slice(0, 4).map((crewMember) => (
            <div key={crewMember.id}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                className="text-blue-900"
              >
                {crewMember.name}
              </Typography>
              <Typography variant="body2" className="text-blue-600">
                {crewMember.job}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
