interface CityTileGridProps {
  cities: string[];
  onCityClick: (city: string) => void;
  theme: 'light' | 'dark';
}

/**
 * Grid of city tiles for country-based searches
 */
export function CityTileGrid({ cities, onCityClick, theme }: CityTileGridProps) {
  if (cities.length === 0) return null;

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const hoverClass = theme === 'light' ? 'hover:bg-white/50' : 'hover:bg-slate-700/50';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {cities.map((city, index) => (
        <button
          key={index}
          onClick={() => onCityClick(city)}
          className={`${glassClass} ${hoverClass} rounded-xl p-6 hover:scale-105 transition-all duration-300 text-left group`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-xl font-semibold ${textClass} mb-1`}>{city}</h3>
              <p className={`${subtextClass} text-sm`}>Click to view weather</p>
            </div>
            <div className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
              🌤️
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
