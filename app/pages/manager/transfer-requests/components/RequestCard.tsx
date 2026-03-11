import { Send } from 'lucide-react';
import { TransferRequest } from '../types';
import { getStatusIcon, getStatusColor, getStatusText } from '../utils';

interface RequestCardProps {
  request: TransferRequest;
  locale: 'en' | 'ar';
  onReply: (requestId: string) => void;
}

const translations = {
  ar: {
    yourMessage: 'رسالتك:',
    doctorResponse: 'رد الطبيب:',
    yourReply: 'ردك:',
    sent: 'تم الإرسال:',
    responded: 'تم الرد:',
    replyToDoctor: 'الرد على الطبيب',
    doctor: 'د.'
  },
  en: {
    yourMessage: 'Your Message:',
    doctorResponse: 'Doctor Response:',
    yourReply: 'Your Reply:',
    sent: 'Sent:',
    responded: 'Responded:',
    replyToDoctor: 'Reply to Doctor',
    doctor: 'Dr.'
  }
};

export default function RequestCard({ request, locale, onReply }: RequestCardProps) {
  const t = translations[locale];
  
  // استخدام الاسم من حقل name حسب اللغة، وإلا استخدام firstName و lastName
  const getDoctorName = () => {
    if (request.doctorId.name) {
      if (typeof request.doctorId.name === 'object') {
        // إذا كان name عبارة عن object، استخدم اللغة المناسبة
        return request.doctorId.name[locale] || request.doctorId.name.en || `${request.doctorId.firstName} ${request.doctorId.lastName}`;
      }
      return request.doctorId.name;
    }
    // إذا لم يكن name موجوداً، استخدم firstName و lastName
    return `${t.doctor} ${request.doctorId.firstName} ${request.doctorId.lastName}`;
  };
  
  const doctorName = getDoctorName();

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          {getStatusIcon(request.status)}
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold text-base sm:text-lg truncate">
              {doctorName}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm truncate">
              {typeof request.doctorId.specialty === 'object' 
                ? request.doctorId.specialty[locale] 
                : request.doctorId.specialty}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm border whitespace-nowrap ${getStatusColor(
            request.status
          )}`}
        >
          {getStatusText(request.status, locale)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
          <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.yourMessage}</p>
          <p className="text-white text-sm sm:text-base wrap-break-word">{request.message}</p>
        </div>

        {request.doctorResponse && (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3 sm:p-4">
            <p className="text-teal-400 text-xs sm:text-sm mb-1">{t.doctorResponse}</p>
            <p className="text-white text-sm sm:text-base wrap-break-word">{request.doctorResponse}</p>
          </div>
        )}

        {request.managerResponse && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
            <p className="text-blue-400 text-xs sm:text-sm mb-1">{t.yourReply}</p>
            <p className="text-white text-sm sm:text-base wrap-break-word">{request.managerResponse}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-xs sm:text-sm text-gray-500">
          <span>{t.sent} {new Date(request.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}</span>
          {request.respondedAt && (
            <span>{t.responded} {new Date(request.respondedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}</span>
          )}
        </div>
      </div>

      {request.doctorResponse && (
        <button
          onClick={() => onReply(request._id)}
          className="w-full mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Send size={16} />
          {t.replyToDoctor}
        </button>
      )}
    </div>
  );
}
