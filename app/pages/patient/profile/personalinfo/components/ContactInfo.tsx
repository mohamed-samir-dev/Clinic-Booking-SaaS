import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FormData } from '../types';

interface ContactInfoProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const ContactInfo = ({ formData, isEditing, onChange }: ContactInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <FaUser className="text-teal-600 text-sm sm:text-base" />
        </div>
        Contact Information
      </h2>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
            <FaUser className="text-teal-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium mb-1">Full Name</p>
            {isEditing ? (
              <input type="text" value={formData.name} onChange={(e) => onChange({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base" />
            ) : (
              <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">{formData.name || 'Not provided'}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <FaEnvelope className="text-blue-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium mb-1">Email Address</p>
            {isEditing ? (
              <input type="email" value={formData.email} onChange={(e) => onChange({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base" />
            ) : (
              <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">{formData.email || 'Not provided'}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <FaPhone className="text-green-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium mb-1">Phone Number</p>
            {isEditing ? (
              <input type="text" value={formData.phone} onChange={(e) => onChange({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base" />
            ) : (
              <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">{formData.phone || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
