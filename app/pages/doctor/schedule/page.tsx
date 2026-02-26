'use client';

import { useState, useEffect } from 'react';
import { useAppointments } from './hooks/useAppointments';
import { ScheduleHeader } from './components/ScheduleHeader';
import { StatusLegend } from './components/StatusLegend';
import { Calendar } from './components/Calendar';
import { DayDetailsSidebar } from './components/DayDetailsSidebar';
import { getDaysInMonth, getAppointmentsForDate } from './utils/calendarHelpers';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const appointments = useAppointments(currentDate);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const newTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (newTheme) setTheme(newTheme);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const days = getDaysInMonth(currentDate);
  const selectedDayAppointments = selectedDate ? getAppointmentsForDate(selectedDate, appointments) : [];

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  return (
    <div className={`h-screen overflow-y-auto p-3 sm:p-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <ScheduleHeader theme={theme} />
        <StatusLegend theme={theme} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Calendar 
            currentDate={currentDate}
            days={days}
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onMonthChange={changeMonth}
            theme={theme}
          />
          
          <DayDetailsSidebar 
            selectedDate={selectedDate}
            appointments={selectedDayAppointments}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
