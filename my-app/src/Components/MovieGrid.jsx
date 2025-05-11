import { Box, Card, CardMedia, Typography } from '@mui/material';

export default function MovieGrid({ movies }) {
  return (
    <Box sx={{ display: 'flex', overflowX: 'scroll', gap: 2 }}>
      {movies.map((movie) => (
        <Card key={movie.id} sx={{ minWidth: 160 }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2">{movie.title}</Typography>
            <Typography variant="caption">{movie.release_date?.split('-')[0]}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
