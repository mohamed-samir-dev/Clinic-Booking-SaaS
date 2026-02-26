'use client';

import { Appointment } from '../types';
import { getStatusColor } from '../utils/calendarHelpers';

interface DayDetailsSidebarProps {
  selectedDate: Date | null;
  appointments: Appointment[];
  theme: 'light' | 'dark';
}

export const DayDetailsSidebar = ({ selectedDate, appointments, theme }: DayDetailsSidebarProps) => {
  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-5 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
          <span className="material-icons text-white text-base sm:text-lg">event_note</span>
        </div>
        <div>
          <h3 className={`text-sm sm:text-base font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select a Date'}
          </h3>
          <p className={`text-[10px] sm:text-xs font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-2.5 max-h-[300px] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div
              key={apt._id}
              className={`rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 ${getStatusColor(apt.status)}`}
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0">
                  <span className="material-icons text-white text-sm sm:text-base">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-black' : 'text-gray-900'
                  }`}>
                    {apt.patientId?.name || apt.guestData?.fullName || 'Guest Patient'}
                  </h4>
                  <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
                    <div className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-600'
                    }`}>
                      <span className="material-icons text-[10px] sm:text-xs">schedule</span>
                      <span className="font-bold">{apt.startTime} - {apt.endTime}</span>
                    </div>
                    {apt.patientId?.phone || apt.guestData?.phone ? (
                      <div className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-600'
                      }`}>
                        <span className="material-icons text-[10px] sm:text-xs">phone</span>
                        <span>{apt.patientId?.phone || apt.guestData?.phone}</span>
                      </div>
                    ) : null}
                    <div className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-600'
                    }`}>
                      <span className="material-icons text-[10px] sm:text-xs">medical_services</span>
                      <span className="capitalize">{apt.type}</span>
                    </div>
                    {apt.reason && (
                      <div className="mt-1 sm:mt-2 p-1.5 sm:p-2 bg-white/60 rounded-lg">
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-gray-900' : 'text-gray-700'
                        }`}>{apt.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-400">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-2 sm:mb-3">
              <span className="material-icons text-2xl sm:text-3xl text-gray-300">event_available</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-500">No appointments</p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Select a date to view details</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};
