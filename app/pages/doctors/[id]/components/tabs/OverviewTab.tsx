import { FaGraduationCap, FaBriefcase, FaLanguage } from 'react-icons/fa';
import { Doctor } from '../../../../../types';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import translations from '@/messages/translations';

interface OverviewTabProps {
  doctor: Doctor;
}

export default function OverviewTab({ doctor }: OverviewTabProps) {
  const { locale } = useLanguage();
  const t = translations[locale].doctors.profile.overview;

  const getText = (value: string | { en: string; ar: string } | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[locale] || value.en || value.ar || '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.about}</h3>
        <p className="text-gray-600 leading-relaxed">{getText(doctor.aboutUs) || t.noBio}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {doctor.education && doctor.education.length > 0 && (
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <FaGraduationCap className="text-blue-600 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">{t.education}</h3>
            </div>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-bold text-gray-900">{getText(edu.institution) || t.institution}</p>
                  <p className="text-sm text-gray-600">
                    {getText(edu.degree) || t.degree}{edu.year && ` • ${edu.year}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {doctor.experienceYears && (
          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <FaBriefcase className="text-purple-600 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">{t.experience}</h3>
            </div>
            <p className="text-gray-700">{doctor.experienceYears} {t.years}</p>
          </div>
        )}

        {doctor.languages && doctor.languages.length > 0 && (
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <FaLanguage className="text-green-600 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">{t.languages}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((lang: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-green-200">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
