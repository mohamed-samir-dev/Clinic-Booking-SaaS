import { FaHeartbeat, FaTint, FaRulerVertical, FaWeight, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';

interface BasicHealthSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
}

export const BasicHealthSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit }: BasicHealthSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FaHeartbeat className="text-red-600 text-sm sm:text-base" />
          </div>
          Basic Health Information
        </h2>
        {editingSection !== 'basic' ? (
          <button onClick={() => setEditingSection('basic')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
            <FaEdit /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditingSection(null)} className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-all">
              <FaTimes />
            </button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
              <FaSave /> {loading ? '...' : 'Save'}
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaTint className="text-red-500" />
            Blood Type
          </label>
          {editingSection === 'basic' ? (
            <select value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900">
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold text-sm sm:text-base">{formData.bloodType || 'Not provided'}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaRulerVertical className="text-purple-500" />
            Height (cm)
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} placeholder="170" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          ) : (
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold text-sm sm:text-base">{formData.height ? `${formData.height} cm` : 'Not provided'}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaWeight className="text-green-500" />
            Weight (kg)
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} placeholder="70" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          ) : (
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold text-sm sm:text-base">{formData.weight ? `${formData.weight} kg` : 'Not provided'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
