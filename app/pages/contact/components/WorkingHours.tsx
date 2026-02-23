'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function WorkingHours() {
  const { theme } = useTheme();
  const schedule = [
    { day: 'Sunday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Monday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Tuesday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Wednesday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Thursday', hours: '09:00 AM - 06:00 PM' },
    { day: 'Friday', hours: 'Closed', closed: true },
    { day: 'Saturday', hours: '10:00 AM - 04:00 PM' }
  ];

  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Working Hours</h3>
      <div className="space-y-2 sm:space-y-3">
        {schedule.map((item) => (
          <div key={item.day} className={`flex justify-between items-center py-2 sm:py-3 border-b last:border-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <span className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.day}</span>
            <span className={`text-sm sm:text-base ${item.closed ? 'text-red-600 font-bold' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}`}>
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
