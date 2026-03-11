interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  endTime?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface BlockedSlot {
  _id: string;
  date: string;
}

interface MonthViewProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  currentDate: Date;
  onAppointmentClick: (appointment: Appointment) => void;
}

export function MonthView({ appointments, blockedSlots, currentDate, onAppointmentClick }: MonthViewProps) {
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const monthDays = getMonthDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getAppointmentsForDay = (day: Date | null) => {
    if (!day) return [];
    const dayStr = day.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date.split('T')[0] === dayStr);
  };

  const getBlockedSlotsForDay = (day: Date | null) => {
    if (!day) return [];
    const dayStr = day.toISOString().split('T')[0];
    return blockedSlots.filter(slot => slot.date.split('T')[0] === dayStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div>
      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-700 mb-2">
        {weekDays.map(day => (
          <div key={day} className="p-1 sm:p-2 text-center text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {monthDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const dayBlocked = getBlockedSlotsForDay(day);
          const isToday = day && day.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 rounded-lg border ${
                day ? 'bg-gray-700/30 border-gray-700 hover:border-gray-600' : 'bg-transparent border-transparent'
              } ${isToday ? 'ring-1 sm:ring-2 ring-teal-500' : ''} transition-all`}
            >
              {day && (
                <>
                  <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${isToday ? 'text-teal-400' : 'text-white'}`}>
                    {day.getDate()}
                  </div>
                  
                  {dayBlocked.length > 0 && (
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1">
                      🚫 {dayBlocked.length} blocked
                    </div>
                  )}

                  <div className="space-y-1">
                    {dayAppointments.slice(0, 3).map(apt => (
                      <div
                        key={apt._id}
                        onClick={() => onAppointmentClick(apt)}
                        className="text-[10px] sm:text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: getStatusColor(apt.status) + '40' }}
                      >
                        <div className="text-white truncate">{apt.time}</div>
                        <div className="text-gray-300 truncate hidden sm:block">{apt.patientName}</div>
                      </div>
                    ))}
                    {dayAppointments.length > 3 && (
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        +{dayAppointments.length - 3} more
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
}
