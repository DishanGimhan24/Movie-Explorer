import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API_BASE_URL from '../apiConfig.js'; // Import API base URL

const TrendingMovies = ({ trendingType }) => {
  const [movies, setMovies] = useState([]);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view this page.");
        navigate("/login"); // Redirect to login page if not authenticated
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/movies/trending/${trendingType}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, [trendingType, navigate]);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/details/${id}`); // Navigate to the movie details page
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', py: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="white">
        Trending Movies
      </Typography>

      {/* Scroll Left Button */}
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
        aria-label="Scroll left"
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Movie List */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          scrollBehavior: 'smooth',
          padding: '1rem 0',
          '&::-webkit-scrollbar': { display: 'none' }, // Hides the scrollbar
        }}
      >
        {movies.map((movie, index) => (
          <Card
            key={`${movie.id}-${index}`} // Combine movie.id and index to ensure unique keys
            sx={{
              flexShrink: 0,
              width: 150,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              cursor: 'pointer', // Add pointer cursor for better UX
            }}
            onClick={() => handleMovieClick(movie.id)} // Navigate to movie details on click
          >
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              sx={{ height: 200, borderRadius: '4px 4px 0 0', objectFit: 'cover' }}
            />
            <CardContent sx={{ textAlign: 'center', padding: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                noWrap
                sx={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}
              >
                {movie.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {movie.release_date?.split('-')[0]}
              </Typography>
              <Typography variant="body2" color="warning.main" fontWeight="bold">
                ⭐ {movie.vote_average}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Scroll Right Button */}
      <IconButton
        onClick={scrollRight}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
        aria-label="Scroll right"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default TrendingMovies;