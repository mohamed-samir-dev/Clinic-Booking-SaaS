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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FaHeartbeat className="text-red-600" />
          </div>
          Basic Health Information
        </h2>
        {editingSection !== 'basic' ? (
          <button onClick={() => setEditingSection('basic')} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all flex items-center gap-2">
            <FaEdit /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditingSection(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
              <FaTimes />
            </button>
            <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all flex items-center gap-2">
              <FaSave /> {loading ? '...' : 'Save'}
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaTint className="text-red-500" />
            Blood Type
          </label>
          {editingSection === 'basic' ? (
            <select value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900">
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
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold">{formData.bloodType || 'Not provided'}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaRulerVertical className="text-purple-500" />
            Height (cm)
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} placeholder="170" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold">{formData.height ? `${formData.height} cm` : 'Not provided'}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaWeight className="text-green-500" />
            Weight (kg)
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} placeholder="70" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900 font-semibold">{formData.weight ? `${formData.weight} kg` : 'Not provided'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
