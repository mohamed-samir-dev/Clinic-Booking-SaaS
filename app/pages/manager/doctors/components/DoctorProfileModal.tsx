import { X, Mail, Phone, Award, Calendar, CheckCircle, Star, UserX } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '../page';

interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'ملف الطبيب',
    yearsExperience: 'سنوات خبرة',
    rating: 'تقييم',
    biography: 'السيرة الذاتية',
    statistics: 'الإحصائيات',
    total: 'الإجمالي',
    completed: 'مكتمل',
    avgRating: 'متوسط التقييم',
    noShow: 'عدم الحضور',
    workingSchedule: 'جدول العمل',
    close: 'إغلاق'
  },
  en: {
    title: 'Doctor Profile',
    yearsExperience: 'years experience',
    rating: 'rating',
    biography: 'Biography',
    statistics: 'Statistics',
    total: 'Total',
    completed: 'Completed',
    avgRating: 'Avg Rating',
    noShow: 'No-show',
    workingSchedule: 'Working Schedule',
    close: 'Close'
  }
};

const daysTranslations = {
  ar: {
    Sunday: 'الأحد',
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت'
  },
  en: {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday'
  }
};

export const DoctorProfileModal = ({ doctor, onClose, language = 'en' }: DoctorProfileModalProps) => {
  const t = translations[language];
  const days = daysTranslations[language];
  
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Doctor Info */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
            {doctor.image ? (
              <Image src={doctor.image} alt={getName(doctor.name)} width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto sm:mx-0" />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto sm:mx-0 shrink-0">
                <span className="text-teal-400 text-2xl sm:text-3xl font-semibold">
                  {getName(doctor.name).charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1 text-center sm:text-left w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{getName(doctor.name)}</h3>
              <p className="text-teal-400 text-base sm:text-lg mb-3">{doctor.specialty}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {doctor.phone && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm">
                    <Phone size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{doctor.phone}</span>
                  </div>
                )}
                
                {doctor.email && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm">
                  <Award size={14} className="text-gray-400 shrink-0" />
                  <span>{doctor.experience} {t.yearsExperience}</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
                  <span>{doctor.rating.toFixed(1)} {t.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          {doctor.bio && (
            <div className="mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{t.biography}</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{doctor.bio}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">{t.statistics}</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-400 shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">{t.total}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{doctor.totalAppointments || 0}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-400 shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">{t.completed}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{doctor.completedAppointments || 0}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-yellow-400 shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">{t.avgRating}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{doctor.rating.toFixed(1)}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <UserX size={16} className="text-red-400 shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">{t.noShow}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{doctor.noShowRate || 0}%</div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          {doctor.schedule && doctor.schedule.length > 0 && (
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4">{t.workingSchedule}</h4>
              <div className="space-y-2">
                {doctor.schedule.map((slot, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-750 rounded-lg p-3 border border-gray-700 gap-2">
                    <span className="text-white font-medium text-sm sm:text-base">{days[slot.day as keyof typeof days]}</span>
                    <span className="text-gray-300 text-sm sm:text-base">{slot.startTime} → {slot.endTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
