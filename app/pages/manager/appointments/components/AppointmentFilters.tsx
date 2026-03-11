import { Filter } from 'lucide-react';

interface AppointmentFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  language: 'ar' | 'en';
}

const translations = {
  ar: {
    all: 'الكل',
    today: 'اليوم',
    tomorrow: 'غداً',
    week: 'هذا الأسبوع'
  },
  en: {
    all: 'All',
    today: 'Today',
    tomorrow: 'Tomorrow',
    week: 'This Week'
  }
};

export const AppointmentFilters = ({ currentFilter, onFilterChange, language }: AppointmentFiltersProps) => {
  const t = translations[language];
  
  const filters = [
    { label: t.all, value: 'all' },
    { label: t.today, value: 'today' },
    { label: t.tomorrow, value: 'tomorrow' },
    { label: t.week, value: 'week' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="text-gray-400 hidden sm:block" size={18} />
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};
