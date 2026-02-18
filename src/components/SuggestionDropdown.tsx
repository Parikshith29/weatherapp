import { useEffect, useRef } from 'react';

interface SuggestionDropdownProps {
  suggestions: string[];
  isLoading: boolean;
  onSelect: (suggestion: string) => void;
  searchQuery: string;
  theme: 'light' | 'dark';
}

/**
 * Dropdown component for search suggestions with keyboard navigation
 */
export function SuggestionDropdown({ 
  suggestions, 
  isLoading, 
  onSelect,
  searchQuery,
  theme
}: SuggestionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dropdownRef.current) return;
      
      const items = dropdownRef.current.querySelectorAll('[role="option"]');
      const activeElement = document.activeElement;
      const currentIndex = Array.from(items).indexOf(activeElement as HTMLElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        (items[nextIndex] as HTMLElement).focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        (items[prevIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!searchQuery) return null;

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const hoverClass = theme === 'light' ? 'hover:bg-slate-200/50' : 'hover:bg-slate-700/50';
  const focusClass = theme === 'light' ? 'focus:bg-slate-200/70' : 'focus:bg-slate-700/70';

  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-full left-0 right-0 mt-2 ${glassClass} rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300 shadow-2xl`}
    >
      {isLoading ? (
        <div className={`p-4 text-center ${textClass}`}>
          <div className={`inline-block w-5 h-5 border-2 ${
            theme === 'light' ? 'border-slate-300 border-t-slate-700' : 'border-slate-600 border-t-white'
          } rounded-full animate-spin`}></div>
          <span className="ml-2">Searching...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              role="option"
              onClick={() => onSelect(suggestion)}
              className={`w-full px-6 py-3 text-left ${textClass} ${hoverClass} ${focusClass} transition-colors duration-200 focus:outline-none font-medium`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : (
        <div className={`p-4 text-center ${textClass}`}>
          No results found
        </div>
      )}
    </div>
  );
}
