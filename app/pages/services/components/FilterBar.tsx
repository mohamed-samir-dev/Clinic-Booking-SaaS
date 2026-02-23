'use client';

import { IconType } from 'react-icons';
import { useTheme } from '@/app/contexts/ThemeContext';

interface FilterBarProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
  getIcon: (category: string) => IconType;
}

export default function FilterBar({ categories, activeFilter, onFilterChange, getIcon }: FilterBarProps) {
  const { theme } = useTheme();
  return (
    <div className={`border-b sticky top-0 z-10 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex overflow-x-auto gap-2 sm:gap-3 justify-start sm:justify-center pb-2 sm:pb-0 scrollbar-hide">
          {categories.map((category) => {
            const Icon = getIcon(category);
            return (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 text-sm sm:text-base shrink-0 ${
                  activeFilter === category
                    ? 'bg-teal-500 text-white'
                    : (theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                <Icon className="text-base sm:text-lg" />
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
