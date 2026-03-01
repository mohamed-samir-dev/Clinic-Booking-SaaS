import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface PasswordModalProps {
  show: boolean;
  passwordData: PasswordData;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
  showError: boolean;
  errorMsg: string;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: PasswordData) => void;
  onToggleCurrent: () => void;
  onToggleNew: () => void;
  onToggleConfirm: () => void;
}

export const PasswordModal = ({
  show,
  passwordData,
  showCurrent,
  showNew,
  showConfirm,
  showError,
  errorMsg,
  loading,
  onClose,
  onSubmit,
  onChange,
  onToggleCurrent,
  onToggleNew,
  onToggleConfirm
}: PasswordModalProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl border max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`} onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <FaLock className="text-blue-600 text-xl sm:text-2xl" />
          </div>
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{t.passwordModal.title}</h2>
          <p className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{t.passwordModal.subtitle}</p>
        </div>
        {showError && (
          <div className="mb-4 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-700 font-semibold text-xs sm:text-sm">{errorMsg}</p>
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{t.passwordModal.currentPassword}</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => onChange({...passwordData, currentPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className={`w-full ${isRTL ? 'pr-3 sm:pr-4 pl-10 sm:pl-12' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none transition-colors ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'
              }`} required />
              <button type="button" onClick={onToggleCurrent} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}>
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{t.passwordModal.newPassword}</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => onChange({...passwordData, newPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className={`w-full ${isRTL ? 'pr-3 sm:pr-4 pl-10 sm:pl-12' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none transition-colors ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'
              }`} required />
              <button type="button" onClick={onToggleNew} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}>
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{t.passwordModal.confirmPassword}</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => onChange({...passwordData, confirmPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className={`w-full ${isRTL ? 'pr-3 sm:pr-4 pl-10 sm:pl-12' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none transition-colors ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'
              }`} required />
              <button type="button" onClick={onToggleConfirm} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              {t.passwordModal.cancel}
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50">
              {loading ? t.passwordModal.changing : t.passwordModal.change}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
