import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrendingMovies from './TrendingMovies';
import SearchBar from '../Common/SearchBar';
import MoviesList from './MoviesList';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Home() {
  const [search, setSearch] = useState('');
  const [trendingType, setTrendingType] = useState('day');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      console.log('Searching for:', search);
      // Add your search logic here
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-50 text-gray-900'} min-h-screen w-screen flex flex-col transition-colors duration-300`}>
      {/* Header with Dark Mode Toggle and Logout */}
      <div className="relative">
        <header 
          className={`relative text-center py-12 bg-cover bg-center w-full ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'}`}
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome.
            </h1>
            <p className="text-base sm:text-lg mt-4 text-white/90">
              Millions of movies, TV shows, and people to discover. Explore now.
            </p>
          </div>
        </header>

        {/* Dark Mode Toggle and Logout - Fixed to Top Right */}
        <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-white">
              {isDarkMode ? 'Dark' : 'Light'}
            </span>
          </label>

          <button
            onClick={handleLogout}
            className="text-white hover:text-red-300 transition-colors"
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Search Section */}
        <section className="mb-12">
          <SearchBar 
            search={search} 
            setSearch={setSearch} 
            handleSearch={handleSearch} 
            darkMode={isDarkMode}
          />
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Trending
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTrendingType('day')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  trendingType === 'day'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTrendingType('week')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  trendingType === 'week'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
          <TrendingMovies trendingType={trendingType} darkMode={isDarkMode} />
        </section>

        {/* All Movies Section */}
        <section>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            All Movies
          </h2>
          <MoviesList darkMode={isDarkMode} />
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-blue-800 text-blue-200'} py-6 mt-12 w-full`}>
        <div className="px-4 sm:px-6 lg:px-8 text-center w-full">
          <p className="text-sm">© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}