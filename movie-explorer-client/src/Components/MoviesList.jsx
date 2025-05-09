import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/all?page=1'); // Adjust this API call as per your backend setup
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
      }}
    >
     

      {/* Movie List */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 8, // Reduced gap between cards
        }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }, // Hover effect for scaling
            }}
          >
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              sx={{
                height: 300, // Adjusted height for the poster
                borderRadius: '4px 4px 0 0',
                objectFit: 'cover',
              }}
            />
            <CardContent sx={{ textAlign: 'center', padding: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                noWrap
                sx={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
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
    </Box>
  );
};

export default MoviesList;