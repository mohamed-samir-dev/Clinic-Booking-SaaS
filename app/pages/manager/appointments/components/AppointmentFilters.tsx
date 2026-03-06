import { Filter } from 'lucide-react';

interface AppointmentFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const AppointmentFilters = ({ currentFilter, onFilterChange }: AppointmentFiltersProps) => {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'week' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="text-gray-400" size={20} />
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
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
