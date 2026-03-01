import { FaSave } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';

interface ProfileHeaderProps {
  name: string;
  email: string;
  isEditing: boolean;
  loading: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
}

export const ProfileHeader = ({ name, email, isEditing, loading, onEdit, onCancel, onSave }: ProfileHeaderProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  
  return (
    <div className={`rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-xl relative ${
      theme === 'dark' ? 'bg-linear-to-r from-teal-700 to-teal-800' : 'bg-linear-to-r from-teal-600 to-teal-700'
    }`}>
      
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl sm:text-4xl font-bold text-teal-600">{name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{name || 'Patient Name'}</h1>
            <p className="text-teal-100 text-base sm:text-lg">{email || 'email@example.com'}</p>
          </div>
        </div>
        {!isEditing ? (
          <button onClick={onEdit} className="w-full sm:w-auto px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all shadow-lg">
            {t.editProfile}
          </button>
        ) : (
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={onCancel} className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
              {t.cancel}
            </button>
            <button onClick={onSave} disabled={loading} className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all shadow-lg flex items-center justify-center gap-2">
              <FaSave /> {loading ? t.saving : t.save}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
