import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FormData } from '../types';

interface ContactInfoProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const ContactInfo = ({ formData, isEditing, onChange }: ContactInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <FaUser className="text-teal-600" />
        </div>
        Contact Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
            <FaUser className="text-teal-600 text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium mb-1">Full Name</p>
            {isEditing ? (
              <input type="text" value={formData.name} onChange={(e) => onChange({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
            ) : (
              <p className="text-gray-900 font-semibold">{formData.name || 'Not provided'}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <FaEnvelope className="text-blue-600 text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium mb-1">Email Address</p>
            {isEditing ? (
              <input type="email" value={formData.email} onChange={(e) => onChange({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
            ) : (
              <p className="text-gray-900 font-semibold">{formData.email || 'Not provided'}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <FaPhone className="text-green-600 text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium mb-1">Phone Number</p>
            {isEditing ? (
              <input type="text" value={formData.phone} onChange={(e) => onChange({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
            ) : (
              <p className="text-gray-900 font-semibold">{formData.phone || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
