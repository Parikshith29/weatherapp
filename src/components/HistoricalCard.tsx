import { useState } from 'react';
import { getHistoricalWeather, type HistoricalWeatherData } from '../services/weatherService';
import { Loader } from './Loader';
import { ErrorState } from './ErrorState';

interface HistoricalCardProps {
  city: string;
  theme: 'light' | 'dark';
  isCelsius: boolean;
  isKmh: boolean;
}

/**
 * Historical weather data card with date picker
 */
export function HistoricalCard({ city, theme, isCelsius, isKmh }: HistoricalCardProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState<HistoricalWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    if (!date || !city) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getHistoricalWeather(city, date);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const historicalData = data?.historical?.[selectedDate];

  // Convert temperatures
  const convertTemp = (temp: number) => isCelsius ? temp : Math.round(temp * 9/5 + 32);
  const convertWind = (speed: number) => isKmh ? speed : Math.round(speed * 0.621371);

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const inputClass = theme === 'light'
    ? 'bg-white/50 text-slate-800 border-slate-300'
    : 'bg-slate-800/50 text-white border-slate-600';
  const cardGlassClass = theme === 'light' 
    ? 'bg-white/40 backdrop-blur-md border-2 border-white/60' 
    : 'bg-slate-800/40 backdrop-blur-md border-2 border-slate-700/40';

  return (
    <div className={`${glassClass} rounded-3xl p-8 shadow-2xl`}>
      <h3 className={`text-2xl font-bold ${textClass} mb-6`}>Historical Weather</h3>
      
      {/* Date Picker */}
      <div className="mb-6">
        <label className={`block ${subtextClass} mb-2 font-medium`}>Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className={`w-full px-4 py-3 ${inputClass} rounded-xl border-2 focus:ring-2 focus:ring-blue-400 outline-none font-medium`}
        />
      </div>

      {/* Loading State */}
      {isLoading && <Loader theme={theme} />}

      {/* Error State */}
      {error && (
        <ErrorState 
          message={error.includes('upgrade') ? 'Historical data requires upgraded plan.' : error}
          onRetry={() => handleDateChange(selectedDate)}
          theme={theme}
        />
      )}

      {/* Historical Data Display */}
      {!isLoading && !error && historicalData && (
        <div className="space-y-4">
          <div className={`${cardGlassClass} rounded-xl p-6 shadow-lg`}>
            <div className="text-center mb-4">
              <div className={`text-5xl font-bold ${textClass} mb-2`}>
                {convertTemp(historicalData.avgtemp)}°{isCelsius ? 'C' : 'F'}
              </div>
              <p className={`${subtextClass} font-medium`}>Average Temperature</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className={`${subtextClass} text-sm mb-1 font-medium`}>Min</p>
                <p className={`${textClass} text-2xl font-bold`}>
                  {convertTemp(historicalData.mintemp)}°{isCelsius ? 'C' : 'F'}
                </p>
              </div>
              <div className="text-center">
                <p className={`${subtextClass} text-sm mb-1 font-medium`}>Max</p>
                <p className={`${textClass} text-2xl font-bold`}>
                  {convertTemp(historicalData.maxtemp)}°{isCelsius ? 'C' : 'F'}
                </p>
              </div>
            </div>

            <p className={`${textClass} text-center capitalize mb-4 font-semibold`}>
              {historicalData.weather_descriptions?.[0]}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-1">💧</div>
                <p className={`${subtextClass} text-sm font-medium`}>Humidity</p>
                <p className={`${textClass} font-bold`}>{historicalData.humidity}%</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">💨</div>
                <p className={`${subtextClass} text-sm font-medium`}>Wind Speed</p>
                <p className={`${textClass} font-bold`}>
                  {convertWind(historicalData.wind_speed)} {isKmh ? 'km/h' : 'mph'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && !data && selectedDate && (
        <div className={`text-center ${subtextClass} py-8 font-medium`}>
          No data available for this date
        </div>
      )}
    </div>
  );
}
