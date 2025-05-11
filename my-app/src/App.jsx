import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import SearchResults from './Components/SearchResults';
import MovieDetails from './Components/MovieDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movies/details/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
