import { UserPlus, Calendar, Clock } from 'lucide-react';

interface QuickActionsProps {
  onAddDoctor: () => void;
  onViewAppointments: () => void;
  onManageSchedule: () => void;
}

export const QuickActions = ({ onAddDoctor, onViewAppointments, onManageSchedule }: QuickActionsProps) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onAddDoctor}
          className="flex items-center gap-3 p-4 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
        >
          <UserPlus className="text-white" size={24} />
          <span className="text-white font-medium">Add Doctor</span>
        </button>
        <button
          onClick={onViewAppointments}
          className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Calendar className="text-white" size={24} />
          <span className="text-white font-medium">View Appointments</span>
        </button>
        <button
          onClick={onManageSchedule}
          className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Clock className="text-white" size={24} />
          <span className="text-white font-medium">Manage Schedule</span>
        </button>
      </div>
    </div>
  );
};
