import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';

export default function AvailabilityLegend() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="text-sm font-semibold text-gray-700">Availability Status:</span>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
            <FaCalendarCheck className="text-white text-xs" />
          </div>
          <span className="text-sm text-gray-600">Available Today</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-sm">
            <FaCalendarTimes className="text-white text-xs" />
          </div>
          <span className="text-sm text-gray-600">Not Available Today</span>
        </div>
      </div>
    </div>
  );
}
