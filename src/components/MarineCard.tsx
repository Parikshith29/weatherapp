import { useState } from 'react';
import { getMarineWeather, type MarineWeatherData } from '../services/weatherService';
import { Loader } from './Loader';
import { ErrorState } from './ErrorState';

interface MarineCardProps {
  city: string;
  theme: 'light' | 'dark';
  isCelsius: boolean;
  isKmh: boolean;
}

/**
 * Marine weather data card for coastal locations
 */
export function MarineCard({ city, theme, isCelsius, isKmh }: MarineCardProps) {
  const [data, setData] = useState<MarineWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!city) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await getMarineWeather(city);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marine data');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert units
  const convertTemp = (temp: number) => isCelsius ? temp : Math.round(temp * 9/5 + 32);
  const convertWind = (speed: number) => isKmh ? speed : Math.round(speed * 0.621371);

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const buttonClass = theme === 'light'
    ? 'bg-blue-500 hover:bg-blue-600 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white';
  const cardGlassClass = theme === 'light' 
    ? 'bg-white/40 backdrop-blur-md border-2 border-white/60' 
    : 'bg-slate-800/40 backdrop-blur-md border-2 border-slate-700/40';

  return (
    <div className={`${glassClass} rounded-3xl p-8 shadow-2xl`}>
      <h3 className={`text-2xl font-bold ${textClass} mb-6`}>Marine Weather</h3>
      
      {/* Search Button */}
      {!hasSearched && (
        <div className="text-center py-8">
          <p className={`${subtextClass} mb-4 font-medium`}>Get marine weather data for coastal locations</p>
          <button
            onClick={handleSearch}
            disabled={!city}
            className={`px-8 py-3 ${buttonClass} rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg`}
          >
            Get Marine Data
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && <Loader theme={theme} />}

      {/* Error State */}
      {error && (
        <ErrorState 
          message={error.includes('upgrade') || error.includes('not available') 
            ? 'Marine weather data requires upgraded plan.' 
            : error
          }
          onRetry={handleSearch}
          theme={theme}
        />
      )}

      {/* Marine Data Display */}
      {!isLoading && !error && data?.marine && (
        <div className="space-y-4">
          <div className={`${cardGlassClass} rounded-xl p-6 shadow-lg`}>
            <div className="text-center mb-6">
              <h4 className={`text-xl font-semibold ${textClass} mb-2`}>
                {data.location.name}, {data.location.country}
              </h4>
              <p className={`${subtextClass} capitalize font-medium`}>
                {data.marine.weather_descriptions?.[0]}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${cardGlassClass} rounded-xl p-4 text-center shadow-md`}>
                <div className="text-3xl mb-2">🌊</div>
                <p className={`${subtextClass} text-sm mb-1 font-medium`}>Wave Height</p>
                <p className={`${textClass} text-xl font-bold`}>{data.marine.wave_height} m</p>
              </div>
              
              <div className={`${cardGlassClass} rounded-xl p-4 text-center shadow-md`}>
                <div className="text-3xl mb-2">🌡️</div>
                <p className={`${subtextClass} text-sm mb-1 font-medium`}>Water Temp</p>
                <p className={`${textClass} text-xl font-bold`}>
                  {convertTemp(data.marine.water_temperature)}°{isCelsius ? 'C' : 'F'}
                </p>
              </div>
              
              <div className={`${cardGlassClass} rounded-xl p-4 text-center col-span-2 shadow-md`}>
                <div className="text-3xl mb-2">💨</div>
                <p className={`${subtextClass} text-sm mb-1 font-medium`}>Wind Speed</p>
                <p className={`${textClass} text-xl font-bold`}>
                  {convertWind(data.marine.wind_speed)} {isKmh ? 'km/h' : 'mph'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className={`w-full px-6 py-3 ${buttonClass} rounded-xl transition-all duration-300 font-semibold shadow-lg`}
          >
            Refresh Data
          </button>
        </div>
      )}
    </div>
  );
}
