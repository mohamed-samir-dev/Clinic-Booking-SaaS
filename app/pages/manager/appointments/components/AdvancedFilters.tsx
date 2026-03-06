import { Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: { doctorId: string; status: string; dateFrom: string; dateTo: string }) => void;
}

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
  specialty: string;
}

export const AdvancedFilters = ({ onApplyFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({
    doctorId: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/manager/doctors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || []);
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'rescheduled', label: 'Rescheduled' },
    { value: 'no-show', label: 'No-show' }
  ];

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = { doctorId: '', status: '', dateFrom: '', dateTo: '' };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
      >
        <Filter size={20} />
        <span>Advanced Filters</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-semibold">Filter Appointments</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
              <X className="text-gray-400" size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Doctor</label>
              <select
                value={filters.doctorId}
                onChange={(e) => setFilters({ ...filters, doctorId: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              >
                <option value="">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor._id} value={doctor._id}>
                    {getName(doctor.name)} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="p-4 border-t border-gray-700 flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
