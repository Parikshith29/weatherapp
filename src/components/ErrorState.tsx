interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  theme: 'light' | 'dark';
}

/**
 * Error state component with retry option
 */
export function ErrorState({ message, onRetry, theme }: ErrorStateProps) {
  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const hoverClass = theme === 'light' ? 'hover:bg-slate-200/50' : 'hover:bg-slate-700/50';

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <p className={`${textClass} text-lg mb-4 font-medium`}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`px-6 py-2 ${glassClass} ${hoverClass} rounded-lg ${textClass} transition-all duration-300 font-medium`}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
