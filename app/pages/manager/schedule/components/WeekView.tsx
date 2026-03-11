import { useState } from 'react';
import { AppointmentBlock } from './AppointmentBlock';

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
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface WeekViewProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  currentDate: Date;
  onAppointmentClick: (appointment: Appointment) => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
}

export function WeekView({ appointments, blockedSlots, currentDate, onAppointmentClick, onReschedule }: WeekViewProps) {
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  
  const getWeekDays = () => {
    const days = [];
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const hours = Array.from({ length: 14 }, (_, i) => i + 8);

  const getAppointmentsForDayAndTime = (day: Date, hour: number) => {
    const dayStr = day.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptDate = apt.date.split('T')[0];
      const aptHour = parseInt(apt.time.split(':')[0]);
      return aptDate === dayStr && aptHour === hour;
    });
  };

  const getBlockedSlotsForDayAndTime = (day: Date, hour: number) => {
    const dayStr = day.toISOString().split('T')[0];
    return blockedSlots.filter(slot => {
      const slotDate = slot.date.split('T')[0];
      const startHour = parseInt(slot.startTime.split(':')[0]);
      const endHour = parseInt(slot.endTime.split(':')[0]);
      return slotDate === dayStr && hour >= startHour && hour < endHour;
    });
  };

  const handleDragStart = (appointment: Appointment) => {
    setDraggedAppointment(appointment);
  };

  const handleDrop = (day: Date, hour: number) => {
    if (draggedAppointment) {
      const newDate = day.toISOString().split('T')[0];
      const newTime = `${hour.toString().padStart(2, '0')}:00`;
      
      if (window.confirm(`Reschedule appointment to ${day.toLocaleDateString()} at ${newTime}?`)) {
        onReschedule(draggedAppointment._id, newDate, newTime);
      }
      setDraggedAppointment(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="overflow-x-auto -mx-2 sm:mx-0">
      <div className="min-w-[600px] sm:min-w-[700px] md:min-w-[800px] px-2 sm:px-0">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-gray-700">
          <div className="p-1 sm:p-2"></div>
          {weekDays.map((day, i) => (
            <div key={i} className="p-1 sm:p-2 text-center border-l border-gray-700">
              <div className="text-gray-400 text-[10px] sm:text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-white text-sm sm:text-base font-semibold">{day.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-700 min-h-[80px] sm:min-h-[100px]">
            <div className="p-1 sm:p-2 text-gray-400 text-xs sm:text-sm">
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            {weekDays.map((day, i) => {
              const dayAppointments = getAppointmentsForDayAndTime(day, hour);
              const dayBlocked = getBlockedSlotsForDayAndTime(day, hour);
              
              return (
                <div
                  key={i}
                  className="p-1 sm:p-2 border-l border-gray-700 hover:bg-gray-700/30 transition-colors"
                  onDrop={() => handleDrop(day, hour)}
                  onDragOver={handleDragOver}
                >
                  {dayBlocked.length > 0 && (
                    <div className="bg-gray-700/50 rounded p-1 mb-1 text-[10px] sm:text-xs text-gray-400">
                      🚫 Blocked
                    </div>
                  )}
                  {dayAppointments.map(apt => (
                    <AppointmentBlock
                      key={apt._id}
                      appointment={apt}
                      onClick={() => onAppointmentClick(apt)}
                      onDragStart={() => handleDragStart(apt)}
                      compact
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
