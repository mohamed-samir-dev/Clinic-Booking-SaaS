'use client';

import { Appointment } from '../types';
import { getStatusConfig, getTimeAgo } from '../utils/helpers';

interface RequestCardProps {
  request: Appointment;
  onStatusUpdate: (id: string, status: string) => void;
}

export const RequestCard = ({ request, onStatusUpdate }: RequestCardProps) => {
  const config = getStatusConfig(request.status);
  const patientName = request.patientId?.name || request.guestData?.fullName || 'Guest Patient';
  const patientPhone = request.patientId?.phone || request.guestData?.phone;
  const patientEmail = request.patientId?.email || request.guestData?.email;

  return (
    <div className={`group bg-linear-to-br ${config.bgColor} rounded-lg sm:rounded-xl border ${config.borderColor} overflow-hidden transition-all hover:shadow-lg`}>
      <div className="p-3 sm:p-4">
        {/* Header Section */}
        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br ${config.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
            <span className="material-icons text-white text-base sm:text-xl">person</span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-xs sm:text-base mb-1 truncate">{patientName}</h4>
            <div className="flex items-center gap-1 flex-wrap">
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] sm:text-xs font-bold ${config.textColor} bg-white/60 flex items-center gap-0.5`}>
                <span className="material-icons text-[10px] sm:text-xs">{config.icon}</span>
                <span className="whitespace-nowrap">{config.label}</span>
              </span>
              <span className="text-[9px] sm:text-xs text-gray-500 font-medium whitespace-nowrap">
                {getTimeAgo(request.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-white/40 rounded-lg p-1.5 sm:p-2">
            <span className="material-icons text-gray-500 text-sm sm:text-base shrink-0">calendar_today</span>
            <span className="font-bold text-gray-700">
              {new Date(request.appointmentDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-white/40 rounded-lg p-1.5 sm:p-2">
            <span className="material-icons text-gray-500 text-sm sm:text-base shrink-0">schedule</span>
            <span className="font-bold text-gray-700">{request.startTime} - {request.endTime}</span>
          </div>

          {patientPhone && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-white/40 rounded-lg p-1.5 sm:p-2">
              <span className="material-icons text-gray-500 text-sm sm:text-base shrink-0">phone</span>
              <span className="text-gray-700 break-all">{patientPhone}</span>
            </div>
          )}

          {patientEmail && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-white/40 rounded-lg p-1.5 sm:p-2">
              <span className="material-icons text-gray-500 text-sm sm:text-base shrink-0">email</span>
              <span className="text-gray-700 break-all">{patientEmail}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-white/40 rounded-lg p-1.5 sm:p-2">
            <span className="material-icons text-gray-500 text-sm sm:text-base shrink-0">medical_services</span>
            <span className="text-gray-700 capitalize font-medium">{request.type}</span>
          </div>
        </div>

        {/* Reason Section */}
        {request.reason && (
          <div className="mb-2 sm:mb-3 p-1.5 sm:p-2.5 bg-white/60 rounded-lg">
            <p className="text-[9px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Reason</p>
            <p className="text-[10px] sm:text-sm text-gray-700 font-medium break-words">{request.reason}</p>
          </div>
        )}

        {/* Action Buttons */}
        {request.status === 'pending' && (
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <button
              onClick={() => onStatusUpdate(request._id, 'confirmed')}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-lg text-[10px] sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
            >
              <span className="material-icons text-xs sm:text-sm">check_circle</span>
              <span>Confirm</span>
            </button>
            <button
              onClick={() => onStatusUpdate(request._id, 'cancelled')}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg text-[10px] sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
            >
              <span className="material-icons text-xs sm:text-sm">cancel</span>
              <span>Decline</span>
            </button>
          </div>
        )}

        {request.status === 'confirmed' && (
          <button
            onClick={() => onStatusUpdate(request._id, 'completed')}
            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-lg text-[10px] sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
          >
            <span className="material-icons text-xs sm:text-sm">task_alt</span>
            <span>Mark Completed</span>
          </button>
        )}
      </div>
    </div>
  );
};
