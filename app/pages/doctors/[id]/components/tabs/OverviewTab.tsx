import { FaGraduationCap, FaBriefcase, FaLanguage } from 'react-icons/fa';
import { Doctor } from '../../../../../types';

interface OverviewTabProps {
  doctor: Doctor;
}

export default function OverviewTab({ doctor }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
        <p className="text-gray-600 leading-relaxed">{doctor.aboutUs || 'No bio available'}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {doctor.education && doctor.education.length > 0 && (
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <FaGraduationCap className="text-blue-600 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">Education</h3>
            </div>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-bold text-gray-900">{edu.institution || 'Institution'}</p>
                  <p className="text-sm text-gray-600">
                    {edu.degree || 'Degree'}{edu.year && ` • ${edu.year}`}
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
              <h3 className="text-lg font-bold text-gray-900">Experience</h3>
            </div>
            <p className="text-gray-700">{doctor.experienceYears} years</p>
          </div>
        )}

        {doctor.languages && doctor.languages.length > 0 && (
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <FaLanguage className="text-green-600 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">Languages</h3>
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
