import { useState, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { useTheme } from './hooks/useTheme';
import { getCurrentWeather, searchLocations, type CurrentWeatherData } from './services/weatherService';
import { SearchBar } from './components/SearchBar';
import { SuggestionDropdown } from './components/SuggestionDropdown';
import { WeatherCard } from './components/WeatherCard';
import { HistoricalCard } from './components/HistoricalCard';
import { MarineCard } from './components/MarineCard';
import { TabNavigation } from './components/TabNavigation';
import { ThemeToggle } from './components/ThemeToggle';
import { Loader } from './components/Loader';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'historical' | 'marine'>('current');
  const [isCelsius, setIsCelsius] = useState(true);
  const [isKmh, setIsKmh] = useState(true);
  const [showCityTiles, setShowCityTiles] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 400);

  // Fetch suggestions when search query changes
  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      setIsSearching(true);
      setShowCityTiles(false); // Hide tiles while searching
      searchLocations(debouncedSearch)
        .then((results) => {
          setSuggestions(results);
          // Show tiles only if we have many results (country search)
          if (results.length > 3) {
            setShowCityTiles(true);
          }
        })
        .finally(() => setIsSearching(false));
    } else {
      setSuggestions([]);
      setShowCityTiles(false);
    }
  }, [debouncedSearch]);

  // Fetch weather data for selected city
  const fetchWeather = async (city: string) => {
    setIsLoadingWeather(true);
    setError(null);
    setSelectedCity(city);

    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchWeather(query);
    setSearchQuery('');
    setSuggestions([]);
    setShowCityTiles(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    fetchWeather(suggestion);
    setSearchQuery('');
    setSuggestions([]);
    setShowCityTiles(false);
  };

  // Generate random stars for dark mode
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  // Get background gradient based on theme
  const backgroundClass = theme === 'light'
    ? 'bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-100'
    : 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-700 relative overflow-hidden`}>
      {/* Animated Clouds for Light Mode */}
      {theme === 'light' && (
        <>
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </>
      )}

      {/* Animated Stars for Dark Mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {generateStars()}
        </div>
      )}

      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🌤️</span>
            <h1 className={`text-5xl md:text-6xl font-bold drop-shadow-lg ${
              theme === 'light' ? 'text-slate-800' : 'text-white'
            }`}>
              Weather
            </h1>
          </div>
          <p className={`text-lg mb-6 ${
            theme === 'light' ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Real-time weather for any city on Earth
          </p>

          {/* Unit Toggles */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="unit-toggle">
              <span className={`text-sm font-medium ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                °C
              </span>
              <input
                type="checkbox"
                checked={!isCelsius}
                onChange={() => setIsCelsius(!isCelsius)}
                aria-label="Toggle temperature unit"
              />
              <span className={`text-sm font-medium ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                °F
              </span>
            </div>

            <div className="unit-toggle">
              <span className={`text-sm font-medium ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                km/h
              </span>
              <input
                type="checkbox"
                checked={!isKmh}
                onChange={() => setIsKmh(!isKmh)}
                aria-label="Toggle wind speed unit"
              />
              <span className={`text-sm font-medium ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                mph
              </span>
            </div>
          </div>
        </div>

        {/* Search Section with City Tiles on Right */}
        <div className="w-full mx-auto mb-12 px-4">
          <div className="flex gap-6 items-start justify-center">
            {/* Left: Search Bar with Dropdown */}
            <div className="relative w-full max-w-2xl">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                theme={theme}
              />
              <SuggestionDropdown
                suggestions={suggestions}
                isLoading={isSearching}
                onSelect={handleSuggestionSelect}
                searchQuery={searchQuery}
                theme={theme}
              />
            </div>

            {/* Right: City Tiles (for country searches) */}
            {showCityTiles && suggestions.length > 3 && !isSearching && (
              <div className="w-full max-w-sm">
                <p className={`${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-sm font-medium mb-3`}>
                  Popular Cities
                </p>
                <div className="space-y-3">
                  {suggestions.slice(0, 5).map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(city)}
                      className={`w-full ${theme === 'light' ? 'glass-light-mode hover:bg-white/50' : 'glass-dark-mode hover:bg-slate-700/50'} rounded-xl p-4 transition-all duration-300 text-left group flex items-center justify-between shadow-lg hover:scale-102`}
                    >
                      <div>
                        <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{city}</h3>
                        <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} text-sm`}>Click to view weather</p>
                      </div>
                      <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                        🌤️
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {selectedCity && (
          <div className="max-w-4xl mx-auto">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} theme={theme} />

            {/* Current Weather Tab */}
            {activeTab === 'current' && (
              <>
                {isLoadingWeather && <Loader theme={theme} />}
                {error && <ErrorState message={error} onRetry={() => fetchWeather(selectedCity)} theme={theme} />}
                {!isLoadingWeather && !error && weatherData && (
                  <WeatherCard 
                    data={weatherData} 
                    theme={theme}
                    isCelsius={isCelsius}
                    isKmh={isKmh}
                  />
                )}
              </>
            )}

            {/* Historical Weather Tab */}
            {activeTab === 'historical' && (
              <HistoricalCard 
                city={selectedCity} 
                theme={theme}
                isCelsius={isCelsius}
                isKmh={isKmh}
              />
            )}

            {/* Marine Weather Tab */}
            {activeTab === 'marine' && (
              <MarineCard 
                city={selectedCity} 
                theme={theme}
                isCelsius={isCelsius}
                isKmh={isKmh}
              />
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedCity && !searchQuery && (
          <EmptyState 
            message="Search for a city to get started"
            icon="🌍"
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

export default App;
