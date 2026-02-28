import { FaFileMedical, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';

interface ChronicConditionsSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
  handleChronicConditionToggle: (condition: string) => void;
}

const chronicConditionsList = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid', 'Other'];

export const ChronicConditionsSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit, handleChronicConditionToggle }: ChronicConditionsSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FaFileMedical className="text-teal-600" />
          </div>
          Chronic Conditions
        </h2>
        {editingSection !== 'chronic' ? (
          <button onClick={() => setEditingSection('chronic')} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all flex items-center gap-2">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {chronicConditionsList.map((condition) => (
          <label key={condition} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.chronicConditions.includes(condition) ? 'bg-teal-50 border-teal-500' : 'bg-gray-50 border-gray-200 hover:border-teal-300'} ${editingSection !== 'chronic' && 'cursor-default'}`}>
            <input type="checkbox" checked={formData.chronicConditions.includes(condition)} onChange={() => editingSection === 'chronic' && handleChronicConditionToggle(condition)} disabled={editingSection !== 'chronic'} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
            <span className={`font-medium ${formData.chronicConditions.includes(condition) ? 'text-teal-900' : 'text-gray-700'}`}>{condition}</span>
          </label>
        ))}
      </div>

      {formData.chronicConditions.includes('Other') && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Specify Other Condition</label>
          {editingSection === 'chronic' ? (
            <input type="text" value={formData.chronicConditionsOther} onChange={(e) => setFormData({...formData, chronicConditionsOther: e.target.value})} placeholder="Describe the condition" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-900">{formData.chronicConditionsOther || 'Not specified'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
