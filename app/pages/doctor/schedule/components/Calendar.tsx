'use client';

import { Appointment } from '../types';
import { getMonthNames, getDayNames, getAppointmentsForDate, getStatusColor } from '../utils/calendarHelpers';

interface CalendarProps {
  currentDate: Date;
  days: (Date | null)[];
  appointments: Appointment[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (delta: number) => void;
  theme: 'light' | 'dark';
  locale: 'en' | 'ar';
}

export const Calendar = ({ 
  currentDate, 
  days, 
  appointments, 
  selectedDate, 
  onDateSelect, 
  onMonthChange,
  theme,
  locale
}: CalendarProps) => {
  const monthNames = getMonthNames(locale);
  const dayNames = getDayNames(locale);
  
  return (
    <div className={`lg:col-span-2 rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="bg-linear-to-r from-teal-500 to-cyan-600 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onMonthChange(-1)}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <span className="material-icons text-white text-lg sm:text-xl">{locale === 'ar' ? 'chevron_right' : 'chevron_left'}</span>
          </button>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => onMonthChange(1)}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <span className="material-icons text-white text-lg sm:text-xl">{locale === 'ar' ? 'chevron_left' : 'chevron_right'}</span>
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-7 border-b ${
        theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
      }`}>
        {dayNames.map(day => (
          <div key={day} className={`p-1 sm:p-2 text-center font-bold text-[10px] sm:text-xs ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {day}
          </div>
        ))}
      </div>

      <div className={`grid grid-cols-7 gap-px ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        {days.map((day, index) => {
          const dayAppointments = day ? getAppointmentsForDate(day, appointments) : [];
          const isToday = day && day.toDateString() === new Date().toDateString();
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();
          const isPast = day && day < new Date(new Date().setHours(0, 0, 0, 0));
          
          return (
            <div
              key={index}
              onClick={() => day && onDateSelect(day)}
              className={`min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 cursor-pointer transition-all relative ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              } ${
                !day ? (theme === 'dark' ? 'bg-gray-900 cursor-default' : 'bg-gray-50 cursor-default') : ''
              } ${isSelected ? 'ring-2 ring-teal-500' : ''} ${isPast ? 'opacity-60' : ''}`}
            >
              {day && (
                <>
                  {isPast && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-0.5 bg-gray-400 rotate-[-20deg]"></div>
                    </div>
                  )}
                  <div className={`text-[10px] sm:text-xs font-bold mb-0.5 sm:mb-1 ${
                    isToday ? 'bg-teal-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                  }`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    {dayAppointments.slice(0, 2).map((apt, i) => (
                      <div
                        key={i}
                        className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-md border truncate ${getStatusColor(apt.status)}`}
                      >
                        <span className="hidden sm:inline">{apt.startTime} - </span>
                        {apt.patientId?.name || apt.guestData?.fullName || 'Guest'}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className={`text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{dayAppointments.length - 2}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
