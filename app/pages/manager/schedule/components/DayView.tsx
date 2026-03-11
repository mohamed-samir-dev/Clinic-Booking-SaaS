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

interface DayViewProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  currentDate: Date;
  onAppointmentClick: (appointment: Appointment) => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
}

export function DayView({ appointments, blockedSlots, currentDate, onAppointmentClick, onReschedule }: DayViewProps) {
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

  const getAppointmentsForTime = (hour: number) => {
    const currentDateStr = currentDate.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptDateStr = new Date(apt.date).toISOString().split('T')[0];
      const aptHour = parseInt(apt.time.split(':')[0]);
      return aptDateStr === currentDateStr && aptHour === hour;
    });
  };

  const getBlockedSlotsForTime = (hour: number) => {
    const currentDateStr = currentDate.toISOString().split('T')[0];
    return blockedSlots.filter(slot => {
      const slotDateStr = new Date(slot.date).toISOString().split('T')[0];
      const startHour = parseInt(slot.startTime.split(':')[0]);
      const endHour = parseInt(slot.endTime.split(':')[0]);
      return slotDateStr === currentDateStr && hour >= startHour && hour < endHour;
    });
  };

  const handleDragStart = (appointment: Appointment) => {
    setDraggedAppointment(appointment);
  };

  const handleDrop = (hour: number) => {
    if (draggedAppointment) {
      const newTime = `${hour.toString().padStart(2, '0')}:00`;
      const newDate = currentDate.toISOString().split('T')[0];
      
      if (window.confirm(`Reschedule appointment to ${newTime}?`)) {
        onReschedule(draggedAppointment._id, newDate, newTime);
      }
      setDraggedAppointment(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      {hours.map(hour => {
        const hourAppointments = getAppointmentsForTime(hour);
        const hourBlocked = getBlockedSlotsForTime(hour);
        
        return (
          <div
            key={hour}
            className="flex flex-col sm:flex-row border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
            onDrop={() => handleDrop(hour)}
            onDragOver={handleDragOver}
          >
            <div className="w-full sm:w-16 md:w-20 py-2 sm:py-4 px-2 text-gray-400 text-xs sm:text-sm font-medium text-center sm:text-left">
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            <div className="flex-1 py-2 px-2 sm:px-4 min-h-[60px] sm:min-h-[80px]">
              {hourBlocked.length > 0 && (
                <div className="mb-2">
                  {hourBlocked.map(slot => (
                    <div
                      key={slot._id}
                      className="bg-gray-700/50 border border-gray-600 rounded-lg p-2 sm:p-3 mb-2"
                    >
                      <div className="text-gray-400 text-xs sm:text-sm font-medium">🚫 Blocked</div>
                      <div className="text-gray-300 text-xs sm:text-sm">{slot.doctorName}</div>
                      <div className="text-gray-500 text-xs">{slot.reason}</div>
                    </div>
                  ))}
                </div>
              )}
              {hourAppointments.length > 0 && (
                <div className="space-y-2">
                  {hourAppointments.map(apt => (
                    <AppointmentBlock
                      key={apt._id}
                      appointment={apt}
                      onClick={() => onAppointmentClick(apt)}
                      onDragStart={() => handleDragStart(apt)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
