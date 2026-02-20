import { Clock } from 'lucide-react';
import { Clinic } from '../types';

interface WorkingHoursSectionProps {
  workingHours: Clinic['workingHours'];
}

export default function WorkingHoursSection({ workingHours }: WorkingHoursSectionProps) {
  if (!workingHours || Object.keys(workingHours).length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <Clock className="text-teal-600" size={20} />
        Working Hours
      </h2>
      <div className="space-y-2">
        {Object.entries(workingHours).map(([day, hours]) => (
          <div key={day} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900 capitalize text-sm sm:text-base">{day}</span>
            {hours && hours.isOpen && hours.openTime && hours.closeTime ? (
              <span className="text-teal-600 font-semibold text-xs sm:text-sm">
                {hours.openTime} - {hours.closeTime}
              </span>
            ) : (
              <span className="text-gray-400 text-xs sm:text-sm">Closed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
