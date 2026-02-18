interface LoaderProps {
  theme: 'light' | 'dark';
}

/**
 * Loading spinner component with glassmorphic design
 */
export function Loader({ theme }: LoaderProps) {
  const borderClass = theme === 'light' 
    ? 'border-slate-300 border-t-slate-700' 
    : 'border-slate-600 border-t-white';

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className={`absolute inset-0 border-4 ${borderClass} opacity-20 rounded-full`}></div>
        <div className={`absolute inset-0 border-4 border-transparent ${borderClass} rounded-full animate-spin`}></div>
      </div>
    </div>
  );
}
