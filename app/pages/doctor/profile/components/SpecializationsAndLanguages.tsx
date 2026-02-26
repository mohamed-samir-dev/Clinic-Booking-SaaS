import { Award, Languages } from 'lucide-react';
import { DoctorProfile } from '../types';

interface SpecializationsProps {
  specializations: DoctorProfile['specializations'];
  theme: 'light' | 'dark';
}

export const Specializations = ({ specializations, theme }: SpecializationsProps) => {
  if (!specializations || specializations.length === 0) return null;

  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        Specializations
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {specializations.map((spec, index) => {
          const displayText = typeof spec === 'string' ? spec : spec.en;
          
          return (
            <span 
              key={index}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-xs sm:text-sm font-semibold border border-purple-200"
            >
              {displayText}
            </span>
          );
        })}
      </div>
    </div>
  );
};

interface LanguagesSectionProps {
  languages: DoctorProfile['languages'];
  theme: 'light' | 'dark';
}

export const LanguagesSection = ({ languages, theme }: LanguagesSectionProps) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
          <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        Languages
      </h3>
      <div className="space-y-2.5 sm:space-y-3">
        {languages.map((lang, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
          >
            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-gray-900">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
