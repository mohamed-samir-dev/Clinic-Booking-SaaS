import { Appointment } from '../types';
import { monthNames, dayNames, getAppointmentsForDate, getStatusColor } from '../utils/calendarHelpers';

interface CalendarProps {
  currentDate: Date;
  days: (Date | null)[];
  appointments: Appointment[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (delta: number) => void;
}

export const Calendar = ({ 
  currentDate, 
  days, 
  appointments, 
  selectedDate, 
  onDateSelect, 
  onMonthChange 
}: CalendarProps) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-teal-500 to-cyan-600 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onMonthChange(-1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <span className="material-icons text-white text-xl">chevron_left</span>
          </button>
          <h2 className="text-lg font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => onMonthChange(1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <span className="material-icons text-white text-xl">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center font-bold text-gray-600 text-xs">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day, index) => {
          const dayAppointments = day ? getAppointmentsForDate(day, appointments) : [];
          const isToday = day && day.toDateString() === new Date().toDateString();
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();
          const isPast = day && day < new Date(new Date().setHours(0, 0, 0, 0));
          
          return (
            <div
              key={index}
              onClick={() => day && onDateSelect(day)}
              className={`min-h-[100px] bg-white p-2 cursor-pointer transition-all hover:bg-gray-50 relative ${
                !day ? 'bg-gray-50 cursor-default' : ''
              } ${isSelected ? 'ring-2 ring-teal-500' : ''} ${isPast ? 'opacity-60' : ''}`}
            >
              {day && (
                <>
                  {isPast && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-0.5 bg-gray-400 rotate-[-20deg]"></div>
                    </div>
                  )}
                  <div className={`text-xs font-bold mb-1 ${
                    isToday ? 'bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'
                  }`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((apt, i) => (
                      <div
                        key={i}
                        className={`text-[10px] px-1.5 py-0.5 rounded-md border truncate ${getStatusColor(apt.status)}`}
                      >
                        {apt.startTime} - {apt.patientId?.name || apt.guestData?.fullName || 'Guest'}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-[10px] text-gray-500 font-bold px-1.5">
                        +{dayAppointments.length - 2} more
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
