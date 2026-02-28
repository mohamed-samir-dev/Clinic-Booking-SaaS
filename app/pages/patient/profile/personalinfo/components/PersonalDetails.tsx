import { FaCalendar, FaVenusMars } from 'react-icons/fa';
import { FormData } from '../types';

interface PersonalDetailsProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const PersonalDetails = ({ formData, isEditing, onChange }: PersonalDetailsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <FaCalendar className="text-purple-600 text-sm sm:text-base" />
        </div>
        Personal Details
      </h2>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
            <FaCalendar className="text-purple-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium mb-1">Date of Birth</p>
            {isEditing ? (
              <input type="date" value={formData.dateOfBirth} onChange={(e) => onChange({...formData, dateOfBirth: e.target.value})} max={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base" />
            ) : (
              <p className="text-gray-900 font-semibold text-sm sm:text-base">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
            <FaVenusMars className="text-pink-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium mb-1">Gender</p>
            {isEditing ? (
              <select value={formData.gender} onChange={(e) => onChange({...formData, gender: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-900 font-semibold text-sm sm:text-base">{formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
