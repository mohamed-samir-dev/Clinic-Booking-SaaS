import { GraduationCap } from 'lucide-react';
import { DoctorProfile } from '../types';

interface EducationSectionProps {
  education: DoctorProfile['education'];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        Education
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base break-words">{edu.degree}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">{edu.institution}</p>
              <p className="text-xs text-teal-600 font-semibold mt-1">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
