import { GraduationCap } from 'lucide-react';
import { DoctorProfile } from '../types';

interface EducationSectionProps {
  education: DoctorProfile['education'];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        Education
      </h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-4 p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{edu.degree}</h4>
              <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
              <p className="text-xs text-teal-600 font-semibold mt-1">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
