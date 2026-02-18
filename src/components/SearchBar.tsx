import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  theme: 'light' | 'dark';
}

/**
 * Search bar component with glassmorphic design
 */
export function SearchBar({ value, onChange, onSearch, placeholder = 'Search any city...', theme }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const placeholderClass = theme === 'light' ? 'placeholder-slate-500' : 'placeholder-slate-400';

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div
        className={`
          ${glassClass} rounded-2xl overflow-hidden transition-all duration-300 shadow-lg
          ${isFocused ? 'ring-2 ring-blue-400' : ''}
        `}
      >
        <div className="flex items-center px-6 py-4">
          <span className="text-2xl mr-3">🔍</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`flex-1 bg-transparent ${textClass} ${placeholderClass} outline-none text-lg font-medium`}
          />
        </div>
      </div>
    </form>
  );
}
