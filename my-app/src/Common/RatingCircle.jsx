import { CircularProgress, Box, Typography } from "@mui/material";

const RatingCircle = ({ value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={60}
        thickness={5}
        sx={{
          color: value >= 75 ? "green" : value >= 50 ? "orange" : "red",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="bold"
          sx={{ color: value >= 75 ? "green" : value >= 50 ? "orange" : "red" }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default RatingCircle;