import { Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: { doctorId: string; status: string; dateFrom: string; dateTo: string }) => void;
  language?: 'ar' | 'en';
}

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
  specialty: string;
}

const translations = {
  ar: {
    advancedFilters: 'فلاتر متقدمة',
    filters: 'فلاتر',
    filterAppointments: 'تصفية المواعيد',
    doctor: 'الطبيب',
    allDoctors: 'جميع الأطباء',
    status: 'الحالة',
    allStatuses: 'جميع الحالات',
    pending: 'معلق',
    confirmed: 'مؤكد',
    cancelled: 'ملغي',
    completed: 'مكتمل',
    rescheduled: 'تم إعادة الجدولة',
    noShow: 'لم يحضر',
    dateFrom: 'من تاريخ',
    dateTo: 'إلى تاريخ',
    reset: 'إعادة تعيين',
    apply: 'تطبيق'
  },
  en: {
    advancedFilters: 'Advanced Filters',
    filters: 'Filters',
    filterAppointments: 'Filter Appointments',
    doctor: 'Doctor',
    allDoctors: 'All Doctors',
    status: 'Status',
    allStatuses: 'All Statuses',
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
    noShow: 'No-show',
    dateFrom: 'Date From',
    dateTo: 'Date To',
    reset: 'Reset',
    apply: 'Apply'
  }
};

export const AdvancedFilters = ({ onApplyFilters, language = 'ar' }: AdvancedFiltersProps) => {
  const t = translations[language];
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
    { value: '', label: t.allStatuses },
    { value: 'pending', label: t.pending },
    { value: 'confirmed', label: t.confirmed },
    { value: 'cancelled', label: t.cancelled },
    { value: 'completed', label: t.completed },
    { value: 'rescheduled', label: t.rescheduled },
    { value: 'no-show', label: t.noShow }
  ];

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

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
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors w-full sm:w-auto justify-center"
      >
        <Filter size={18} />
        <span className="hidden sm:inline">{t.advancedFilters}</span>
        <span className="sm:hidden">{t.filters}</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed md:absolute top-1/2 left-1/2 md:top-full md:left-auto md:right-0 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:mt-2 w-[90%] max-w-sm md:w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm sm:text-base">{t.filterAppointments}</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
                <X className="text-gray-400" size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[60vh] md:max-h-none overflow-y-auto">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">{t.doctor}</label>
                <select
                  value={filters.doctorId}
                  onChange={(e) => setFilters({ ...filters, doctorId: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">{t.allDoctors}</option>
                  {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor._id}>
                      {getName(doctor.name)} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">{t.status}</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">{t.dateFrom}</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">{t.dateTo}</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {t.reset}
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                {t.apply}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
