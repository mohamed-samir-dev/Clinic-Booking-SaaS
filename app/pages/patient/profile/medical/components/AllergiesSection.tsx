import { FaAllergies, FaEdit, FaTimes, FaSave, FaPlus } from 'react-icons/fa';
import { MedicalFormData } from '../types';

interface AllergiesSectionProps {
  formData: MedicalFormData;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
  newAllergy: string;
  setNewAllergy: (value: string) => void;
  handleAddAllergy: () => void;
  handleRemoveAllergy: (index: number) => void;
}

export const AllergiesSection = ({ formData, editingSection, setEditingSection, loading, handleSubmit, newAllergy, setNewAllergy, handleAddAllergy, handleRemoveAllergy }: AllergiesSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <FaAllergies className="text-orange-600" />
          </div>
          Allergies
        </h2>
        {editingSection !== 'allergies' ? (
          <button onClick={() => setEditingSection('allergies')} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all flex items-center gap-2">
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
      
      {editingSection === 'allergies' && (
        <div className="mb-4 flex gap-2">
          <input type="text" value={newAllergy} onChange={(e) => setNewAllergy(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())} placeholder="Add allergy (e.g., Penicillin, Peanuts)" className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          <button type="button" onClick={handleAddAllergy} className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all flex items-center gap-2">
            <FaPlus /> Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {formData.allergies.length > 0 ? (
          formData.allergies.map((allergy, index) => (
            <div key={index} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200 flex items-center gap-2">
              {allergy}
              {editingSection === 'allergies' && (
                <button type="button" onClick={() => handleRemoveAllergy(index)} className="text-orange-600 hover:text-orange-800">
                  <FaTimes />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No allergies recorded</p>
        )}
      </div>
    </div>
  );
};
