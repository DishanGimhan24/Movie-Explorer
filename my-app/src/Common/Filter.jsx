import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Slider, Button } from "@mui/material";

const Filter = ({ onApplyFilters }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState([0, 10]);

  const handleApplyFilters = () => {
    onApplyFilters({ genre: selectedGenre, year, rating });
  };

  return (
    <Box
      sx={{
        width: "250px",
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 3,
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" marginBottom="16px">
        Filters
      </Typography>

      {/* Genre Filter */}
      <Typography variant="subtitle1" marginBottom="8px">
        Genre
      </Typography>
      <Select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        fullWidth
        displayEmpty
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="28">Action</MenuItem>
        <MenuItem value="35">Comedy</MenuItem>
        <MenuItem value="18">Drama</MenuItem>
        <MenuItem value="27">Horror</MenuItem>
        <MenuItem value="10749">Romance</MenuItem>
      </Select>

      {/* Year Filter */}
      <Typography variant="subtitle1" marginTop="16px" marginBottom="8px">
        Year
      </Typography>
      <Select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
        displayEmpty
      >
        <MenuItem value="">All</MenuItem>
        {Array.from({ length: 20 }, (_, i) => (
          <MenuItem key={i} value={2025 - i}>
            {2025 - i}
          </MenuItem>
        ))}
      </Select>

      {/* Rating Filter */}
      <Typography variant="subtitle1" marginTop="16px" marginBottom="8px">
        Rating
      </Typography>
      <Slider
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
      />

      {/* Apply Filters Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "16px" }}
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filter;