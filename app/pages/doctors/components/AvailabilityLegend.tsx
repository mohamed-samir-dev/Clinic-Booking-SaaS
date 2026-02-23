'use client';

import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function AvailabilityLegend() {
  const { theme } = useTheme();
  return (
    <div className={`rounded-lg shadow-sm border p-4 mb-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Availability Status:</span>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
            <FaCalendarCheck className="text-white text-xs" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Available Today</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-sm">
            <FaCalendarTimes className="text-white text-xs" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Not Available Today</span>
        </div>
      </div>
    </div>
  );
}
