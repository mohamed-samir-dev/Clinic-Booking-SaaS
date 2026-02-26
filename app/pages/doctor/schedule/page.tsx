'use client';

import { useState, useEffect } from 'react';
import { useAppointments } from './hooks/useAppointments';
import { ScheduleHeader } from './components/ScheduleHeader';
import { StatusLegend } from './components/StatusLegend';
import { Calendar } from './components/Calendar';
import { DayDetailsSidebar } from './components/DayDetailsSidebar';
import { getDaysInMonth, getAppointmentsForDate } from './utils/calendarHelpers';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const appointments = useAppointments(currentDate);

  const days = getDaysInMonth(currentDate);
  const selectedDayAppointments = selectedDate ? getAppointmentsForDate(selectedDate, appointments) : [];

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  return (
    <div className={`h-screen overflow-y-auto p-3 sm:p-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <ScheduleHeader theme={theme} locale={locale} />
        <StatusLegend theme={theme} locale={locale} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Calendar 
            currentDate={currentDate}
            days={days}
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onMonthChange={changeMonth}
            theme={theme}
            locale={locale}
          />
          
          <DayDetailsSidebar 
            selectedDate={selectedDate}
            appointments={selectedDayAppointments}
            theme={theme}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
