import { Send } from 'lucide-react';
import { TransferRequest, ActionType } from '../types';
import { getStatusIcon, getStatusColor } from '../utils/statusHelpers';

interface RequestCardProps {
  request: TransferRequest;
  theme: string;
  locale: string;
  onOpenModal: (requestId: string, type: ActionType) => void;
}

const translations = {
  ar: {
    from: 'من',
    managerMessage: 'رسالة المدير:',
    yourResponse: 'ردك:',
    managerReply: 'رد المدير:',
    contact: 'التواصل:',
    phone: 'الهاتف:',
    accept: 'قبول',
    reject: 'رفض',
    sendMessage: 'إرسال رسالة',
    received: 'استلمت:',
    responded: 'تم الرد:',
    pending: 'قيد الانتظار',
    accepted: 'مقبول',
    rejected: 'مرفوض'
  },
  en: {
    from: 'From:',
    managerMessage: 'Manager Message:',
    yourResponse: 'Your Response:',
    managerReply: 'Manager Reply:',
    contact: 'Contact:',
    phone: 'Phone:',
    accept: 'Accept',
    reject: 'Reject',
    sendMessage: 'Send Message',
    received: 'Received:',
    responded: 'Responded:',
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected'
  }
};

export const RequestCard = ({ request, theme, locale, onOpenModal }: RequestCardProps) => {
  const t = translations[locale as 'ar' | 'en'] || translations.en;
  
  const getStatusText = (status: string) => {
    if (status === 'pending') return t.pending;
    if (status === 'accepted') return t.accepted;
    if (status === 'rejected') return t.rejected;
    return status;
  };
  
  return (
    <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon(request.status)}
          <div>
            <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {typeof request.toClinicId.name === 'object' ? request.toClinicId.name[locale as 'en' | 'ar'] : request.toClinicId.name}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.from} {typeof request.managerId.name === 'object' ? request.managerId.name[locale as 'en' | 'ar'] : request.managerId.name}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm border capitalize ${getStatusColor(request.status)}`}>
          {getStatusText(request.status)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-100'}`}>
          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.managerMessage}</p>
          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{request.message}</p>
        </div>

        {request.doctorResponse && (
          <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-50 border-teal-200'}`}>
            <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-700'}`}>{t.yourResponse}</p>
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{request.doctorResponse}</p>
          </div>
        )}

        {request.managerResponse && (
          <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>{t.managerReply}</p>
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{request.managerResponse}</p>
          </div>
        )}

        <div className={`rounded-lg p-3 text-sm ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-100'}`}>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{t.contact} {request.managerId.email}</p>
          {request.managerId.phone && (
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{t.phone} {request.managerId.phone}</p>
          )}
        </div>
      </div>

      {request.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => onOpenModal(request._id, 'accept')}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
          >
            {t.accept}
          </button>
          <button
            onClick={() => onOpenModal(request._id, 'reject')}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            {t.reject}
          </button>
          <button
            onClick={() => onOpenModal(request._id, 'message')}
            className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
          >
            <Send size={16} />
            {t.sendMessage}
          </button>
        </div>
      )}

      <div className={`flex items-center justify-between text-sm mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
        <span>{t.received} {new Date(request.createdAt).toLocaleDateString()}</span>
        {request.respondedAt && (
          <span>{t.responded} {new Date(request.respondedAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};
