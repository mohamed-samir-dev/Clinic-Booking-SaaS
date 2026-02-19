import { FaCalendarAlt, FaClock } from 'react-icons/fa';

interface TimeSlot {
  from: string;
  to: string;
}

interface Schedule {
  day: string;
  slots?: TimeSlot[];
  workingHours?: TimeSlot;
}

interface Doctor {
  availability?: Schedule[];
}

interface ScheduleTabProps {
  doctor: Doctor;
}

export default function ScheduleTab({ doctor }: ScheduleTabProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {doctor.availability && doctor.availability.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {doctor.availability.map((schedule, index: number) => (
            <div key={index} className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-teal-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-500 flex items-center justify-center">
                    <FaCalendarAlt className="text-white text-base sm:text-lg" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{schedule.day}</h3>
                </div>
                {schedule.slots && schedule.slots.length > 0 && (
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg">
                    <FaClock className="text-teal-600 text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      {schedule.slots[0].from} - {schedule.slots[schedule.slots.length - 1].to}
                    </span>
                  </div>
                )}
              </div>
              
             
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg sm:rounded-xl">
          <FaCalendarAlt className="text-gray-300 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
          <p className="text-sm sm:text-base text-gray-500">No schedule available</p>
        </div>
      )}
    </div>
  );
}
