'use client';

import { Appointment } from '../types';
import { getStatusConfig, getTimeAgo } from '../utils/helpers';
import translations from '@/messages/translations';

interface RequestCardProps {
  request: Appointment;
  onStatusUpdate: (id: string, status: string) => void;
  theme: 'light' | 'dark';
  locale: 'en' | 'ar';
}

export const RequestCard = ({ request, onStatusUpdate, theme, locale }: RequestCardProps) => {
  const t = translations[locale].doctor.requests;
  const config = getStatusConfig(request.status, locale, theme);
  const patientName = request.patientId?.name || request.guestData?.fullName || (locale === 'ar' ? 'ضيف' : 'Guest Patient');
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
            <h4 className={`font-bold text-xs sm:text-base mb-1 truncate ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{patientName}</h4>
            <div className="flex items-center gap-1 flex-wrap">
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] sm:text-xs font-bold ${config.textColor} ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-white/60'} flex items-center gap-0.5`}>
                <span className="material-icons text-[10px] sm:text-xs">{config.icon}</span>
                <span className="whitespace-nowrap">{config.label}</span>
              </span>
              <span className={`text-[9px] sm:text-xs font-medium whitespace-nowrap ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {getTimeAgo(request.createdAt, locale)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
          <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm rounded-lg p-1.5 sm:p-2 ${
            theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'
          }`}>
            <span className={`material-icons text-sm sm:text-base shrink-0 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>calendar_today</span>
            <span className={`font-bold ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {new Date(request.appointmentDate).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm rounded-lg p-1.5 sm:p-2 ${
            theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'
          }`}>
            <span className={`material-icons text-sm sm:text-base shrink-0 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>schedule</span>
            <span className={`font-bold ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>{request.startTime} - {request.endTime}</span>
          </div>

          {patientPhone && (
            <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm rounded-lg p-1.5 sm:p-2 ${
              theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'
            }`}>
              <span className={`material-icons text-sm sm:text-base shrink-0 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>phone</span>
              <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{patientPhone}</span>
            </div>
          )}

          {patientEmail && (
            <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm rounded-lg p-1.5 sm:p-2 ${
              theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'
            }`}>
              <span className={`material-icons text-sm sm:text-base shrink-0 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>email</span>
              <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{patientEmail}</span>
            </div>
          )}

          <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm rounded-lg p-1.5 sm:p-2 ${
            theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'
          }`}>
            <span className={`material-icons text-sm sm:text-base shrink-0 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>medical_services</span>
            <span className={`capitalize font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>{request.type}</span>
          </div>
        </div>

        {/* Reason Section */}
        {request.reason && (
          <div className={`mb-2 sm:mb-3 p-1.5 sm:p-2.5 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/60' : 'bg-white/60'
          }`}>
            <p className={`text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{t.reason}</p>
            <p className={`text-[10px] sm:text-sm font-medium break-words ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>{request.reason}</p>
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
              <span>{t.accept}</span>
            </button>
            <button
              onClick={() => onStatusUpdate(request._id, 'cancelled')}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg text-[10px] sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
            >
              <span className="material-icons text-xs sm:text-sm">cancel</span>
              <span>{t.reject}</span>
            </button>
          </div>
        )}

        {request.status === 'confirmed' && (
          <button
            onClick={() => onStatusUpdate(request._id, 'completed')}
            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-lg text-[10px] sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
          >
            <span className="material-icons text-xs sm:text-sm">task_alt</span>
            <span>{locale === 'ar' ? 'تم الإنجاز' : 'Mark Completed'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
