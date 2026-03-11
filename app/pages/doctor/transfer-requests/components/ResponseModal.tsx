import { XCircle } from 'lucide-react';
import { ActionType } from '../types';

interface ResponseModalProps {
  show: boolean;
  theme: string;
  locale: string;
  actionType: ActionType;
  responseMessage: string;
  onClose: () => void;
  onMessageChange: (message: string) => void;
  onSubmit: () => void;
}

const translations = {
  ar: {
    acceptRequest: 'قبول الطلب',
    rejectRequest: 'رفض الطلب',
    sendMessage: 'إرسال رسالة',
    yourMessage: 'رسالتك *',
    acceptPlaceholder: 'اكتب رسالة تؤكد قبولك...',
    rejectPlaceholder: 'اكتب رسالة توضح سبب الرفض...',
    messagePlaceholder: 'اكتب رسالتك للمدير...',
    cancel: 'إلغاء',
    accept: 'قبول',
    reject: 'رفض',
    send: 'إرسال'
  },
  en: {
    acceptRequest: 'Accept Request',
    rejectRequest: 'Reject Request',
    sendMessage: 'Send Message',
    yourMessage: 'Your Message *',
    acceptPlaceholder: 'Write a message confirming your acceptance...',
    rejectPlaceholder: 'Write a message explaining your rejection...',
    messagePlaceholder: 'Write your message to the manager...',
    cancel: 'Cancel',
    accept: 'Accept',
    reject: 'Reject',
    send: 'Send'
  }
};

export const ResponseModal = ({
  show,
  theme,
  locale,
  actionType,
  responseMessage,
  onClose,
  onMessageChange,
  onSubmit,
}: ResponseModalProps) => {
  if (!show) return null;

  const t = translations[locale as 'ar' | 'en'] || translations.en;
  
  const getTitle = () => {
    if (actionType === 'accept') return t.acceptRequest;
    if (actionType === 'reject') return t.rejectRequest;
    return t.sendMessage;
  };
  
  const getPlaceholder = () => {
    if (actionType === 'accept') return t.acceptPlaceholder;
    if (actionType === 'reject') return t.rejectPlaceholder;
    return t.messagePlaceholder;
  };
  
  const getButtonText = () => {
    if (actionType === 'accept') return t.accept;
    if (actionType === 'reject') return t.reject;
    return t.send;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-xl border max-w-lg w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <XCircle size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        <div className="p-6">
          <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.yourMessage}
          </label>
          <textarea
            value={responseMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder={getPlaceholder()}
            rows={5}
            maxLength={1000}
            className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:border-teal-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {responseMessage.length}/1000
          </p>
        </div>

        <div className={`flex justify-end gap-3 p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {t.cancel}
          </button>
          <button
            onClick={onSubmit}
            disabled={!responseMessage.trim()}
            className={`px-6 py-2 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              actionType === 'accept'
                ? 'bg-green-600 hover:bg-green-700'
                : actionType === 'reject'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};
