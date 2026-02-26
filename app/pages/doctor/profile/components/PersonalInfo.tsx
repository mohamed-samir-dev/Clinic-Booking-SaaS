import { Edit2, Check, X } from 'lucide-react';
import { DoctorProfile, EditData } from '../types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface PersonalInfoProps {
  profile: DoctorProfile;
  editingField: 'name' | 'fees' | 'duration' | 'email' | 'phone' | 'location' | 'password' | 'about' | 'education' | null;
  editData: EditData;
  setEditData: (data: EditData) => void;
  onEdit: (field: 'password') => void;
  onSave: (field: 'password') => void;
  onCancel: (field: 'password') => void;
  saving: boolean;
  theme: 'light' | 'dark';
}

export const PersonalInfo = ({ profile, editingField, editData, setEditData, onEdit, onSave, onCancel, saving, theme }: PersonalInfoProps) => {
  const { locale } = useLanguage();
  const t = translations[locale].doctor.profile;
  
  return (
    <>
      <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center">
            <span className="material-icons text-white text-base sm:text-lg">person</span>
          </div>
          {t.personalInfo}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <span className={`text-xs sm:text-sm font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Gender</span>
            <span className={`text-sm sm:text-base font-bold capitalize ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{profile.gender}</span>
          </div>
          {profile.bloodType && (
            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <span className={`text-xs sm:text-sm font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Blood Type</span>
              <span className={`text-sm sm:text-base font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{profile.bloodType}</span>
            </div>
          )}
          {profile.followUpFees && (
            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <span className={`text-xs sm:text-sm font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Follow-up Fee</span>
              <span className={`text-sm sm:text-base font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>${profile.followUpFees}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-5 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <h3 className={`text-sm sm:text-base lg:text-lg font-bold flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center">
              <span className="material-icons text-white text-sm sm:text-base">lock</span>
            </div>
            {t.changePassword}
          </h3>
          {editingField !== 'password' && (
            <button
              onClick={() => onEdit('password')}
              className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group shrink-0"
              title={t.edit}
            >
              <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 group-hover:text-red-700" />
            </button>
          )}
        </div>
        {editingField === 'password' ? (
          <div className="space-y-2.5 sm:space-y-3">
            <input
              type="password"
              value={editData.password}
              onChange={(e) => setEditData({...editData, password: e.target.value})}
              className={`w-full px-3 py-2 border-2 border-red-400 rounded-lg text-sm font-semibold focus:outline-none focus:border-red-600 shadow-md ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              }`}
              placeholder={t.newPassword}
            />
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{locale === 'ar' ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password'}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onSave('password')}
                disabled={saving}
                className="flex-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" /> <span className="hidden sm:inline">{t.save}</span><span className="sm:hidden">{t.save}</span>
              </button>
              <button
                onClick={() => onCancel('password')}
                disabled={saving}
                className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <X className="w-4 h-4" /> {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{locale === 'ar' ? 'انقر على أيقونة التعديل لتغيير كلمة المرور' : 'Click the edit icon to change your password'}</p>
        )}
      </div>
    </>
  );
};
