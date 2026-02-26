import Image from 'next/image';
import { Star, Briefcase, DollarSign, Clock, Award, Edit2, Check, X } from 'lucide-react';
import { DoctorProfile, EditData } from '../types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface ProfileCardProps {
  profile: DoctorProfile;
  editingField: 'name' | 'fees' | 'duration' | 'email' | 'phone' | 'location' | 'password' | 'about' | 'education' | null;
  editData: EditData;
  setEditData: (data: EditData) => void;
  onEdit: (field: 'name' | 'fees' | 'duration') => void;
  onSave: (field: 'name' | 'fees' | 'duration') => void;
  onCancel: (field: 'name' | 'fees' | 'duration') => void;
  saving: boolean;
  theme: 'light' | 'dark';
}

export const ProfileCard = ({ profile, editingField, editData, setEditData, onEdit, onSave, onCancel, saving, theme }: ProfileCardProps) => {
  const { locale } = useLanguage();
  const t = translations[locale];

  const getText = (value: string | { en: string; ar: string } | undefined): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value[locale] || value.en || value.ar || '';
    }
    return String(value || '');
  };

  return (
    <div className={`rounded-2xl shadow-lg border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="h-20 sm:h-28 md:h-32 bg-linear-to-r from-teal-500 via-teal-600 to-cyan-600 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
        <div className="flex flex-col min-[870px]:flex-row gap-3 sm:gap-5 md:gap-6 -mt-10 sm:-mt-14 md:-mt-16 relative">
          <div className="shrink-0 mx-auto min-[870px]:mx-0">
            <div className={`w-32 h-32 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl p-2 shadow-xl ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              {profile.photoUrl ? (
                <Image 
                  src={profile.photoUrl} 
                  alt={profile.name.en}
                  width={128}
                  height={128}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-2 sm:pt-3 md:pt-4">
            <div className="flex flex-col gap-3">
              <div className="flex-1">
                {editingField === 'name' ? (
                  <div className="w-full space-y-2">
                    <div className="flex flex-col min-[670px]:flex-row gap-2 items-stretch min-[670px]:items-center w-full">
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-teal-400 rounded-xl font-semibold text-sm sm:text-base text-gray-900 focus:outline-none focus:border-teal-600 bg-white shadow-md"
                        placeholder="First Name (English)"
                      />
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-teal-400 rounded-xl font-semibold text-sm sm:text-base text-gray-900 focus:outline-none focus:border-teal-600 bg-white shadow-md"
                        placeholder="Last Name (English)"
                      />
                    </div>
                    <div className="flex flex-col min-[670px]:flex-row gap-2 items-stretch min-[670px]:items-center w-full">
                      <input
                        type="text"
                        value={editData.firstNameAr || ''}
                        onChange={(e) => setEditData({...editData, firstNameAr: e.target.value})}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-teal-400 rounded-xl font-semibold text-sm sm:text-base text-gray-900 focus:outline-none focus:border-teal-600 bg-white shadow-md"
                        placeholder="الاسم الأول (عربي)"
                        dir="rtl"
                      />
                      <input
                        type="text"
                        value={editData.lastNameAr || ''}
                        onChange={(e) => setEditData({...editData, lastNameAr: e.target.value})}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-teal-400 rounded-xl font-semibold text-sm sm:text-base text-gray-900 focus:outline-none focus:border-teal-600 bg-white shadow-md"
                        placeholder="الاسم الأخير (عربي)"
                        dir="rtl"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSave('name')}
                        disabled={saving}
                        className="flex-1 p-1.5 sm:p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onCancel('name')}
                        disabled={saving}
                        className="flex-1 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="flex items-center gap-2 min-w-max">
                      <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {profile.title}. {getText(profile.name)}
                      </h2>
                      <button
                        onClick={() => onEdit('name')}
                        className="p-1.5 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors group shrink-0"
                        title={locale === 'ar' ? 'تعديل الاسم' : 'Edit Name'}
                      >
                        <Edit2 className="w-4 h-4 text-teal-600 group-hover:text-teal-700" />
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-sm sm:text-base md:text-lg text-teal-600 font-semibold mt-1">{getText(profile.specialty)}</p>
                {profile.brief && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2 line-clamp-2">{getText(profile.brief)}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-yellow-50 to-amber-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-yellow-200 self-start">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{profile.ratingAvg.toFixed(1)}</span>
                <span className="text-xs sm:text-sm text-gray-600">({profile.ratingCount})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[300px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-2.5 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 text-blue-600 mb-0.5 sm:mb-1">
                  <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-semibold">{locale === 'ar' ? 'الخبرة' : 'Experience'}</span>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{profile.experienceYears}<span className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">{locale === 'ar' ? 'سنوات' : 'Years'}</span></p>
              </div>
              
              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-2.5 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 text-green-600 mb-0.5 sm:mb-1">
                  <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-semibold">{locale === 'ar' ? 'الرسوم' : 'Fee'}</span>
                  {editingField !== 'fees' && (
                    <button
                      onClick={() => onEdit('fees')}
                      className="ml-auto p-1 bg-green-200 hover:bg-green-300 rounded-lg transition-colors group"
                      title={locale === 'ar' ? 'تعديل الرسوم' : 'Edit Fee'}
                    >
                      <Edit2 className="w-3 h-3 text-green-700 group-hover:text-green-800" />
                    </button>
                  )}
                </div>
                {editingField === 'fees' ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={editData.fees}
                      onChange={(e) => setEditData({...editData, fees: Number(e.target.value)})}
                      className="w-full px-1.5 py-0.5 sm:px-2 sm:py-1 border-2 border-green-400 rounded-lg font-semibold text-sm sm:text-base text-gray-900 focus:outline-none focus:border-green-600 bg-white shadow-md"
                    />
                    <button
                      onClick={() => onSave('fees')}
                      disabled={saving}
                      className="p-0.5 sm:p-1 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50 shrink-0"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => onCancel('fees')}
                      disabled={saving}
                      className="p-0.5 sm:p-1 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50 shrink-0"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">${profile.fees}</p>
                )}
              </div>
              
              <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-2.5 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 text-purple-600 mb-0.5 sm:mb-1">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-semibold">{locale === 'ar' ? 'المدة' : 'Duration'}</span>
                  {editingField !== 'duration' && (
                    <button
                      onClick={() => onEdit('duration')}
                      className="ml-auto p-1 bg-purple-200 hover:bg-purple-300 rounded-lg transition-colors group"
                      title={locale === 'ar' ? 'تعديل المدة' : 'Edit Duration'}
                    >
                      <Edit2 className="w-3 h-3 text-purple-700 group-hover:text-purple-800" />
                    </button>
                  )}
                </div>
                {editingField === 'duration' ? (
                  <div className="flex items-center gap-1.5">
                    <select
                      value={editData.consultationDuration}
                      onChange={(e) => setEditData({...editData, consultationDuration: Number(e.target.value)})}
                      className="w-full px-1.5 py-0.5 sm:px-2 sm:py-1 border-2 border-purple-400 rounded-lg font-semibold text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-purple-600 bg-white shadow-md"
                    >
                      <option value={15}>15 {locale === 'ar' ? 'دقيقة' : 'min'}</option>
                      <option value={20}>20 {locale === 'ar' ? 'دقيقة' : 'min'}</option>
                      <option value={30}>30 {locale === 'ar' ? 'دقيقة' : 'min'}</option>
                      <option value={45}>45 {locale === 'ar' ? 'دقيقة' : 'min'}</option>
                      <option value={60}>60 {locale === 'ar' ? 'دقيقة' : 'min'}</option>
                    </select>
                    <button
                      onClick={() => onSave('duration')}
                      disabled={saving}
                      className="p-0.5 sm:p-1 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50 shrink-0"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => onCancel('duration')}
                      disabled={saving}
                      className="p-0.5 sm:p-1 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50 shrink-0"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{profile.consultationDuration}<span className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">{locale === 'ar' ? 'دقيقة' : 'min'}</span></p>
                )}
              </div>
              
              <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-2.5 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 text-orange-600 mb-0.5 sm:mb-1">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-semibold">{locale === 'ar' ? 'الحالة' : 'Status'}</span>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 capitalize">{profile.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
