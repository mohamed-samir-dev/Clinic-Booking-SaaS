import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface DeleteModalProps {
  show: boolean;
  deletePassword: string;
  showPassword: boolean;
  showError: boolean;
  errorMsg: string;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
}

export const DeleteModal = ({
  show,
  deletePassword,
  showPassword,
  showError,
  errorMsg,
  loading,
  onClose,
  onSubmit,
  onPasswordChange,
  onTogglePassword
}: DeleteModalProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl border max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`} onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{t.deleteModal.title}</h2>
          <p className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{t.deleteModal.subtitle}</p>
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
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{t.deleteModal.enterPassword}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={deletePassword} onChange={(e) => onPasswordChange(e.target.value)} className={`w-full ${isRTL ? 'pr-3 sm:pr-4 pl-10 sm:pl-12' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none transition-colors ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-red-400 placeholder-gray-500' : 'bg-white border-gray-300 text-black focus:border-red-500'
              }`} placeholder={t.deleteModal.passwordPlaceholder} required />
              <button type="button" onClick={onTogglePassword} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              {t.deleteModal.cancel}
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50">
              {loading ? t.deleteModal.deleting : t.deleteModal.delete}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
