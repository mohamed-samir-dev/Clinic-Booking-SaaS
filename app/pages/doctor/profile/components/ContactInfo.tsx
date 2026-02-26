import { Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react';
import { ContactInfoProps } from '../types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';



export const ContactInfo = ({ profile, editingField, editData, setEditData, onEdit, onSave, onCancel, saving, theme }: ContactInfoProps) => {
  const { locale } = useLanguage();
  const t = translations[locale].doctor.profile;
  
  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center">
          <span className="material-icons text-white text-base sm:text-lg">contact_mail</span>
        </div>
        {t.contactInfo}
      </h3>
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">{t.email}</p>
              {editingField !== 'email' && (
                <button
                  onClick={() => onEdit('email')}
                  className="p-1.5 sm:p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group shrink-0"
                  title={t.edit}
                >
                  <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover:text-blue-700" />
                </button>
              )}
            </div>
            {editingField === 'email' ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className={`flex-1 min-w-0 px-3 py-2 sm:py-2.5 border-2 border-blue-400 rounded-lg text-sm sm:text-base font-semibold focus:outline-none focus:border-blue-600 shadow-md ${
                    theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                  }`}
                />
                <button
                  onClick={() => onSave('email')}
                  disabled={saving}
                  className="p-1.5 sm:p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 shrink-0"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => onCancel('email')}
                  disabled={saving}
                  className="p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ) : (
              <p className={`text-sm sm:text-base font-medium mt-1.5 break-all ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
              }`}>{profile.email}</p>
            )}
          </div>
        </div>

        {profile.phone && (
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">{t.phone}</p>
                {editingField !== 'phone' && (
                  <button
                    onClick={() => onEdit('phone')}
                    className="p-1.5 sm:p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors group shrink-0"
                    title={t.edit}
                  >
                    <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 group-hover:text-green-700" />
                  </button>
                )}
              </div>
              {editingField === 'phone' ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className={`flex-1 min-w-0 px-3 py-2 sm:py-2.5 border-2 border-green-400 rounded-lg text-sm sm:text-base font-semibold focus:outline-none focus:border-green-600 shadow-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    }`}
                  />
                  <button
                    onClick={() => onSave('phone')}
                    disabled={saving}
                    className="p-1.5 sm:p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 shrink-0"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => onCancel('phone')}
                    disabled={saving}
                    className="p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              ) : (
                <p className={`text-sm sm:text-base font-medium mt-1.5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>{profile.phone}</p>
              )}
            </div>
          </div>
        )}

        {profile.location?.address && (
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">{t.location}</p>
                {editingField !== 'location' && (
                  <button
                    onClick={() => onEdit('location')}
                    className="p-1.5 sm:p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors group shrink-0"
                    title={t.edit}
                  >
                    <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 group-hover:text-orange-700" />
                  </button>
                )}
              </div>
              {editingField === 'location' ? (
                <div className="space-y-2.5 mt-2">
                  <input
                    type="text"
                    value={editData.location.address}
                    onChange={(e) => setEditData({...editData, location: {...editData.location, address: e.target.value}})}
                    className={`w-full px-3 py-2 sm:py-2.5 border-2 border-orange-400 rounded-lg text-sm sm:text-base font-semibold focus:outline-none focus:border-orange-600 shadow-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    }`}
                    placeholder={t.address}
                  />
                  <input
                    type="text"
                    value={editData.location.city}
                    onChange={(e) => setEditData({...editData, location: {...editData.location, city: e.target.value}})}
                    className={`w-full px-3 py-2 sm:py-2.5 border-2 border-orange-400 rounded-lg text-sm sm:text-base font-semibold focus:outline-none focus:border-orange-600 shadow-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    }`}
                    placeholder={t.city}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSave('location')}
                      disabled={saving}
                      className="flex-1 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" /> 
                    </button>
                    <button
                      onClick={() => onCancel('location')}
                      disabled={saving}
                      className="flex-1 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" /> 
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={`text-sm sm:text-base font-medium mt-1.5 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                  }`}>{profile.location.address}</p>
                  {profile.location.city && (
                    <p className={`text-xs sm:text-sm mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{profile.location.city}</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
