import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SearchResults from "./Components/SearchResults";
import MovieDetails from "./Components/MovieDetails";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ProtectedRoute from "./ProtectedRoute.jsx"; // Import ProtectedRoute

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/details/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
