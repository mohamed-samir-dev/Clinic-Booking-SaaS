import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '../types';

interface CalendarViewProps {
  appointments: Appointment[];
  viewMode: 'daily' | 'weekly';
}

export const CalendarView = ({ appointments, viewMode }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

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
      <div className="bg-gray-750 border-b border-gray-700 p-4 flex items-center justify-between">
        <button
          onClick={() => navigateDate('prev')}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="text-gray-400" size={20} />
        </button>
        
        <h3 className="text-lg font-semibold text-white">
          {viewMode === 'daily' 
            ? currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            : `Week of ${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
          }
        </h3>

        <button
          onClick={() => navigateDate('next')}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight className="text-gray-400" size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        {viewMode === 'daily' ? (
          // Daily View
          <div className="p-4">
            <div className="space-y-2">
              {hours.map(hour => {
                const hourAppointments = filterAppointmentsByDate(currentDate).filter(apt => {
                  const aptHour = parseInt(apt.time.split(':')[0]);
                  return aptHour === hour;
                });

                return (
                  <div key={hour} className="flex gap-4 min-h-[60px]">
                    <div className="w-20 text-gray-400 text-sm pt-1">
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </div>
                    <div className="flex-1 border-l border-gray-700 pl-4 space-y-2">
                      {hourAppointments.map(apt => (
                        <div
                          key={apt._id}
                          className={`p-3 rounded-lg border-l-4 ${getStatusColor(apt.status)}`}
                        >
                          <p className="text-white font-medium text-sm">{getName(apt.patientName)}</p>
                          <p className="text-gray-300 text-xs">Dr. {getName(apt.doctorName)}</p>
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
            <div className="min-w-[800px]">
              {/* Week Days Header */}
              <div className="grid grid-cols-8 border-b border-gray-700">
                <div className="p-3 text-gray-400 text-sm"></div>
                {getWeekDays().map((day, index) => (
                  <div key={index} className="p-3 text-center border-l border-gray-700">
                    <p className="text-gray-400 text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-white font-medium">{day.getDate()}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-700 min-h-[80px]">
                  <div className="p-3 text-gray-400 text-sm">
                    {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                  </div>
                  {getWeekDays().map((day, dayIndex) => {
                    const dayAppointments = filterAppointmentsByDate(day).filter(apt => {
                      const aptHour = parseInt(apt.time.split(':')[0]);
                      return aptHour === hour;
                    });

                    return (
                      <div key={dayIndex} className="p-2 border-l border-gray-700">
                        {dayAppointments.map(apt => (
                          <div
                            key={apt._id}
                            className={`p-2 rounded-lg border-l-2 ${getStatusColor(apt.status)} mb-1`}
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
