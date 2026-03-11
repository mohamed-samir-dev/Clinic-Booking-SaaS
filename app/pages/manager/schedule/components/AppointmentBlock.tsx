interface Appointment {
  _id: string;
  doctorName: string;
  patientName: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface AppointmentBlockProps {
  appointment: Appointment;
  onClick: () => void;
  onDragStart: () => void;
  compact?: boolean;
}

export function AppointmentBlock({ appointment, onClick, onDragStart, compact = false }: AppointmentBlockProps) {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'confirmed': return 'border-green-500 bg-green-500/10';
      case 'pending': return 'border-yellow-500 bg-yellow-500/10';
      case 'cancelled': return 'border-red-500 bg-red-500/10';
      case 'completed': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'confirmed': return { text: 'Confirmed', color: 'bg-green-500' };
      case 'pending': return { text: 'Pending', color: 'bg-yellow-500' };
      case 'cancelled': return { text: 'Cancelled', color: 'bg-red-500' };
      case 'completed': return { text: 'Completed', color: 'bg-blue-500' };
      default: return { text: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const badge = getStatusBadge();

  if (compact) {
    return (
      <div
        draggable
        onDragStart={onDragStart}
        onClick={onClick}
        className={`border-l-4 ${getStatusColor()} rounded p-1 mb-1 cursor-move hover:shadow-lg transition-all`}
      >
        <div className="text-[10px] sm:text-xs text-white truncate">{appointment.time}</div>
        <div className="text-[10px] sm:text-xs text-gray-300 truncate">{appointment.patientName}</div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`border-l-4 ${getStatusColor()} rounded-lg p-2 sm:p-3 cursor-move hover:shadow-lg hover:scale-[1.02] transition-all`}
    >
      <div className="flex items-start justify-between mb-1 sm:mb-2">
        <div className="text-white font-medium text-xs sm:text-sm truncate pr-2">{appointment.doctorName}</div>
        <span className={`${badge.color} text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shrink-0`}>
          {badge.text}
        </span>
      </div>
      <div className="text-gray-300 text-xs sm:text-sm mb-1 truncate">Patient: {appointment.patientName}</div>
      <div className="text-gray-400 text-[10px] sm:text-xs">{appointment.time}</div>
    </div>
  );
}
