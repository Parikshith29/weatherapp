interface TabNavigationProps {
  activeTab: 'current' | 'historical' | 'marine';
  onTabChange: (tab: 'current' | 'historical' | 'marine') => void;
  theme: 'light' | 'dark';
}

/**
 * Tab navigation component with animated underline indicator
 */
export function TabNavigation({ activeTab, onTabChange, theme }: TabNavigationProps) {
  const tabs = [
    { id: 'current' as const, label: 'Current Weather' },
    { id: 'historical' as const, label: 'Historical Weather' },
    { id: 'marine' as const, label: 'Marine Weather' },
  ];

  const glassClass = theme === 'light' ? 'glass-light-mode' : 'glass-dark-mode';
  const textClass = theme === 'light' ? 'text-slate-800' : 'text-white';
  const inactiveTextClass = theme === 'light' ? 'text-slate-600 hover:text-slate-800' : 'text-slate-400 hover:text-white';
  const hoverClass = theme === 'light' ? 'hover:bg-slate-200/30' : 'hover:bg-slate-700/30';
  const underlineClass = theme === 'light' ? 'bg-blue-600' : 'bg-blue-400';

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap font-medium
            ${activeTab === tab.id
              ? `${glassClass} ${textClass}`
              : `${inactiveTextClass} ${hoverClass}`
            }
          `}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${underlineClass} rounded-full`}></div>
          )}
        </button>
      ))}
    </div>
  );
}
