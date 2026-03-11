import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '../types';

interface CalendarViewProps {
  appointments: Appointment[];
  viewMode: 'daily' | 'weekly';
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    week: 'أسبوع',
    sun: 'الأحد',
    mon: 'الإثنين',
    tue: 'الثلاثاء',
    wed: 'الأربعاء',
    thu: 'الخميس',
    fri: 'الجمعة',
    sat: 'السبت',
    am: 'ص',
    pm: 'م',
    dr: 'د.'
  },
  en: {
    week: 'Week of',
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    am: 'AM',
    pm: 'PM',
    dr: 'Dr.'
  }
};

export const CalendarView = ({ appointments, viewMode, language = 'ar' }: CalendarViewProps) => {
  const t = translations[language];
  const [currentDate, setCurrentDate] = useState(new Date());

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600 border-green-500';
      case 'pending': return 'bg-yellow-600 border-yellow-500';
      case 'cancelled': return 'bg-red-600 border-red-500';
      case 'completed': return 'bg-blue-600 border-blue-500';
      case 'rescheduled': return 'bg-purple-600 border-purple-500';
      case 'no-show': return 'bg-orange-600 border-orange-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const formatHour = (hour: number) => {
    if (language === 'ar') {
      return hour > 12 ? `${hour - 12}:00 ${t.pm}` : `${hour}:00 ${t.am}`;
    }
    return hour > 12 ? `${hour - 12}:00 ${t.pm}` : `${hour}:00 ${t.am}`;
  };

  const getDayName = (date: Date) => {
    const dayNames = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
    return dayNames[date.getDay()];
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const filterAppointmentsByDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-750 border-b border-gray-700 p-3 sm:p-4 flex items-center justify-between">
        <button
          onClick={() => navigateDate('prev')}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="text-gray-400" size={18} />
        </button>
        
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white text-center px-2">
          {viewMode === 'daily' 
            ? currentDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            : `${t.week} ${currentDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}`
          }
        </h3>

        <button
          onClick={() => navigateDate('next')}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight className="text-gray-400" size={18} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        {viewMode === 'daily' ? (
          // Daily View
          <div className="p-3 sm:p-4">
            <div className="space-y-2">
              {hours.map(hour => {
                const hourAppointments = filterAppointmentsByDate(currentDate).filter(apt => {
                  const aptHour = parseInt(apt.time.split(':')[0]);
                  return aptHour === hour;
                });

                return (
                  <div key={hour} className="flex gap-2 sm:gap-4 min-h-[60px]">
                    <div className="w-16 sm:w-20 text-gray-400 text-xs sm:text-sm pt-1 shrink-0">
                      {formatHour(hour)}
                    </div>
                    <div className="flex-1 border-l border-gray-700 pl-2 sm:pl-4 space-y-2">
                      {hourAppointments.map(apt => (
                        <div
                          key={apt._id}
                          className={`p-2 sm:p-3 rounded-lg border-l-4 ${getStatusColor(apt.status)}`}
                        >
                          <p className="text-white font-medium text-xs sm:text-sm">{getName(apt.patientName)}</p>
                          <p className="text-gray-300 text-xs">{t.dr} {getName(apt.doctorName)}</p>
                          <p className="text-gray-400 text-xs">{apt.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Weekly View
          <div className="overflow-x-auto">
            <div className="min-w-[600px] sm:min-w-[800px]">
              {/* Week Days Header */}
              <div className="grid grid-cols-8 border-b border-gray-700">
                <div className="p-2 sm:p-3 text-gray-400 text-xs sm:text-sm"></div>
                {getWeekDays().map((day, index) => (
                  <div key={index} className="p-2 sm:p-3 text-center border-l border-gray-700">
                    <p className="text-gray-400 text-xs">{getDayName(day)}</p>
                    <p className="text-white font-medium text-sm">{day.getDate()}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-700 min-h-[60px] sm:min-h-[80px]">
                  <div className="p-2 sm:p-3 text-gray-400 text-xs sm:text-sm">
                    {formatHour(hour)}
                  </div>
                  {getWeekDays().map((day, dayIndex) => {
                    const dayAppointments = filterAppointmentsByDate(day).filter(apt => {
                      const aptHour = parseInt(apt.time.split(':')[0]);
                      return aptHour === hour;
                    });

                    return (
                      <div key={dayIndex} className="p-1 sm:p-2 border-l border-gray-700">
                        {dayAppointments.map(apt => (
                          <div
                            key={apt._id}
                            className={`p-1 sm:p-2 rounded-lg border-l-2 ${getStatusColor(apt.status)} mb-1`}
                          >
                            <p className="text-white text-xs font-medium truncate">{getName(apt.patientName)}</p>
                            <p className="text-gray-300 text-xs truncate">{apt.time}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
