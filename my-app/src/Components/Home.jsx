import { useState } from 'react';
import TrendingMovies from './TrendingMovies';
import SearchBar from '../Common/SearchBar';
import MoviesList from './MoviesList';

export default function Home() {
  const [search, setSearch] = useState('');
  const [trendingType, setTrendingType] = useState('day');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = () => {
    if (search.trim()) {
      console.log('Searching for:', search);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-300 text-black'} min-h-screen flex flex-col relative`}>
      <label className="absolute top-4 right-4 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      </label>

      <header
        className={`text-center py-12 bg-cover bg-center w-full ${isDarkMode ? 'bg-gray-800' : ''}`}
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-blue-100'}`}>Welcome.</h1>
        <p className={`text-lg mt-4 ${isDarkMode ? 'text-gray-300' : 'text-blue-200'}`}>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
      </header>

      <section>
        <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </section>

      <section className="px-4 sm:px-8 py-8 w-full">
        <div className="flex items-center mb-4 flex-wrap">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-blue-100'} mr-4`}>Trending</h2>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setTrendingType('day')}
              className={`px-4 py-2 rounded-lg ${
                trendingType === 'day'
                  ? isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-500 text-gray-300'
                  : 'bg-blue-200 text-black'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTrendingType('week')}
              className={`px-2 py-2 rounded-lg ${
                trendingType === 'week'
                  ? isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-500 text-gray-300'
                  : 'bg-blue-200 text-black'
              }`}
            >
              This Week
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <TrendingMovies trendingType={trendingType} />
        </div>
      </section>

      <section className="px-4 sm:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-blue-100'} mb-4`}>All Movies</h2>
        <div className="space-y-6">
          <MoviesList />
        </div>
      </section>

      <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-blue-800 text-blue-300'} text-center py-4 mt-auto`}>
        <p className="text-sm">© 2025 Movie Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}
