interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

/**
 * Theme toggle button for switching between light and dark modes
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 p-3 glass rounded-full hover:scale-110 transition-all duration-300 z-50"
      aria-label="Toggle theme"
    >
      <div className="text-2xl">
        {theme === 'light' ? '🌙' : '☀️'}
      </div>
    </button>
  );
}
