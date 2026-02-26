import { Award, Languages } from 'lucide-react';
import { DoctorProfile } from '../types';

interface SpecializationsProps {
  specializations: DoctorProfile['specializations'];
}

export const Specializations = ({ specializations }: SpecializationsProps) => {
  if (!specializations || specializations.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <Award className="w-4 h-4 text-white" />
        </div>
        Specializations
      </h3>
      <div className="flex flex-wrap gap-2">
        {specializations.map((spec, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-linear-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-sm font-semibold border border-purple-200"
          >
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
};

interface LanguagesSectionProps {
  languages: DoctorProfile['languages'];
}

export const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
          <Languages className="w-4 h-4 text-white" />
        </div>
        Languages
      </h3>
      <div className="space-y-2">
        {languages.map((lang, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 p-3 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
          >
            <Languages className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-900">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
