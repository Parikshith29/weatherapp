import { useEffect, useState } from 'react';
import type { CurrentWeatherData } from '../services/weatherService';

interface WeatherCardProps {
  data: CurrentWeatherData;
  theme: 'light' | 'dark';
  isCelsius: boolean;
  isKmh: boolean;
}

/**
 * Current weather display card with animated temperature
 */
export function WeatherCard({ data, theme, isCelsius, isKmh }: WeatherCardProps) {
  const [displayTemp, setDisplayTemp] = useState(0);
  
  // Convert temperature
  const temperature = isCelsius 
    ? data.current.temperature 
    : Math.round(data.current.temperature * 9/5 + 32);
  
  const feelsLike = isCelsius
    ? data.current.feelslike
    : Math.round(data.current.feelslike * 9/5 + 32);
  
  // Convert wind speed
  const windSpeed = isKmh
    ? data.current.wind_speed
    : Math.round(data.current.wind_speed * 0.621371);

  // Animate temperature count-up
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = temperature / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= temperature) {
        setDisplayTemp(temperature);
        clearInterval(timer);
      } else {
        setDisplayTemp(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [temperature]);

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const cardGlassClass = theme === 'light' 
    ? 'bg-white/40 backdrop-blur-md border-2 border-white/60' 
    : 'bg-slate-800/40 backdrop-blur-md border-2 border-slate-700/40';

  return (
    <div className={`${glassClass} rounded-3xl p-8 animate-float shadow-2xl`}>
      {/* Location */}
      <div className="text-center mb-6">
        <h2 className={`text-3xl font-bold ${textClass} mb-2`}>
          {data.location.name}
        </h2>
        <p className={`${subtextClass} text-lg font-medium`}>{data.location.country}</p>
        <p className={`${subtextClass} text-sm mt-1`}>{data.location.localtime}</p>
      </div>

      {/* Main Temperature Section with Icon and RealFeel */}
      <div className="flex items-start justify-center gap-8 mb-8">
        {/* Left: Icon and Temperature */}
        <div className="flex flex-col items-center">
          <img 
            src={data.current.weather_icons[0]} 
            alt={data.current.weather_descriptions[0]}
            className="w-32 h-32 mb-4 drop-shadow-lg"
          />
          <div className={`text-7xl font-bold ${textClass}`}>
            {displayTemp}°{isCelsius ? 'C' : 'F'}
          </div>
        </div>

        {/* Right: RealFeel */}
        <div className="flex flex-col justify-center pt-8">
          <p className={`${subtextClass} text-sm font-medium mb-2`}>RealFeel®</p>
          <p className={`${textClass} text-4xl font-bold mb-4`}>
            {feelsLike}°{isCelsius ? 'C' : 'F'}
          </p>
        </div>
      </div>

      {/* Weather Description */}
      <p className={`${textClass} text-xl capitalize font-semibold text-center mb-8`}>
        {data.current.weather_descriptions[0]}
      </p>

      {/* Comprehensive Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Max UV Index */}
        {data.current.uv_index !== undefined && (
          <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
            <p className={`${subtextClass} text-sm mb-1 font-medium`}>Max UV Index</p>
            <p className={`${textClass} text-xl font-bold`}>{data.current.uv_index}</p>
          </div>
        )}

        {/* Pressure */}
        <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
          <p className={`${subtextClass} text-sm mb-1 font-medium`}>Pressure</p>
          <p className={`${textClass} text-xl font-bold`}>↓ {data.current.pressure} mb</p>
        </div>

        {/* Wind */}
        <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
          <p className={`${subtextClass} text-sm mb-1 font-medium`}>Wind</p>
          <p className={`${textClass} text-xl font-bold`}>
            {data.current.wind_dir} {windSpeed} {isKmh ? 'km/h' : 'mph'}
          </p>
        </div>

        {/* Cloud Cover */}
        <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
          <p className={`${subtextClass} text-sm mb-1 font-medium`}>Cloud Cover</p>
          <p className={`${textClass} text-xl font-bold`}>{data.current.cloudcover}%</p>
        </div>

        {/* Humidity */}
        <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
          <p className={`${subtextClass} text-sm mb-1 font-medium`}>Humidity</p>
          <p className={`${textClass} text-xl font-bold`}>{data.current.humidity}%</p>
        </div>

        {/* Visibility */}
        <div className={`${cardGlassClass} rounded-xl p-4 shadow-lg`}>
          <p className={`${subtextClass} text-sm mb-1 font-medium`}>Visibility</p>
          <p className={`${textClass} text-xl font-bold`}>{data.current.visibility} km</p>
        </div>
      </div>
    </div>
  );
}
