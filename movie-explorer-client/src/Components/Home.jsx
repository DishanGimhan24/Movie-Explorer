import { useState } from 'react';
import TrendingMovies from './TrendingMovies';
import SearchBar from '../Common/SearchBar';

export default function Home() {
  const [search, setSearch] = useState('');
  const [trendingType, setTrendingType] = useState('day');

  const handleSearch = () => {
    if (search.trim()) {
      console.log('Searching for:', search);
    }
  };

  return (
    <div className="bg-blue-900 text-white min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Hero Section */}
      <div
        className="text-center py-12 bg-cover bg-center w-full"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <h1 className="text-4xl font-bold">Welcome.</h1>
        <p className="text-lg mt-4">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap px-4">
          <SearchBar />
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4 sm:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="flex items-center mb-4 flex-wrap">
          <h2 className="text-2xl font-bold mr-4">Trending</h2>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setTrendingType('day')}
              className={`px-4 py-2 rounded-lg ${
                trendingType === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTrendingType('week')}
              className={`px-2 py-2 rounded-lg ${
                trendingType === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        <TrendingMovies trendingType={trendingType} />
      </div>
    </div>
  );
}