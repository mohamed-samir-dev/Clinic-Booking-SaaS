import { Appointment } from '../types';
import { getStatusColor } from '../utils/calendarHelpers';

interface DayDetailsSidebarProps {
  selectedDate: Date | null;
  appointments: Appointment[];
}

export const DayDetailsSidebar = ({ selectedDate, appointments }: DayDetailsSidebarProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
          <span className="material-icons text-white text-lg">event_note</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select a Date'}
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[500px] overflow-y-auto custom-scrollbar">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div
              key={apt._id}
              className={`rounded-xl p-3 border-2 ${getStatusColor(apt.status)}`}
            >
              <div className="flex items-start gap-2">
                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0">
                  <span className="material-icons text-white text-base">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    {apt.patientId?.name || apt.guestData?.fullName || 'Guest Patient'}
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="material-icons text-xs">schedule</span>
                      <span className="font-bold">{apt.startTime} - {apt.endTime}</span>
                    </div>
                    {apt.patientId?.phone || apt.guestData?.phone ? (
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="material-icons text-xs">phone</span>
                        <span>{apt.patientId?.phone || apt.guestData?.phone}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="material-icons text-xs">medical_services</span>
                      <span className="capitalize">{apt.type}</span>
                    </div>
                    {apt.reason && (
                      <div className="mt-2 p-2 bg-white/60 rounded-lg">
                        <p className="text-gray-700 font-medium">{apt.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3">
              <span className="material-icons text-3xl text-gray-300">event_available</span>
            </div>
            <p className="text-sm font-bold text-gray-500">No appointments</p>
            <p className="text-xs text-gray-400 mt-1">Select a date to view details</p>
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
