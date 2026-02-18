interface EmptyStateProps {
  message: string;
  icon?: string;
  theme: 'light' | 'dark';
}

/**
 * Empty state component for when no data is available
 */
export function EmptyState({ message, icon = '🌤️', theme }: EmptyStateProps) {
  const textClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <p className={`${textClass} text-lg font-medium`}>{message}</p>
    </div>
  );
}
