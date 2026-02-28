import { FaPills, FaEdit, FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { MedicalFormData, Medication } from '../types';

interface MedicationsSectionProps {
  formData: MedicalFormData;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
  newMedication: Medication;
  setNewMedication: (med: Medication) => void;
  handleAddMedication: () => void;
  handleRemoveMedication: (index: number) => void;
}

export const MedicationsSection = ({ formData, editingSection, setEditingSection, loading, handleSubmit, newMedication, setNewMedication, handleAddMedication, handleRemoveMedication }: MedicationsSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <FaPills className="text-purple-600 text-sm sm:text-base" />
          </div>
          Current Medications
        </h2>
        {editingSection !== 'medications' ? (
          <button onClick={() => setEditingSection('medications')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
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
      
      {editingSection === 'medications' && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Add New Medication</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
            <input type="text" value={newMedication.name} onChange={(e) => setNewMedication({...newMedication, name: e.target.value})} placeholder="Medication name" className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
            <input type="text" value={newMedication.dosage} onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})} placeholder="Dosage (e.g., 500mg)" className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
            <input type="text" value={newMedication.frequency} onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})} placeholder="Frequency (e.g., Twice daily)" className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
            <input type="text" value={newMedication.notes} onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})} placeholder="Notes (optional)" className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900" />
          </div>
          <button type="button" onClick={handleAddMedication} className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
            <FaPlus /> Add Medication
          </button>
        </div>
      )}

      <div className="space-y-3">
        {formData.currentMedications.length > 0 ? (
          formData.currentMedications.map((med, index) => (
            <div key={index} className="p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-purple-900 text-base sm:text-lg">{med.name}</h4>
                  <div className="mt-2 space-y-1">
                    {med.dosage && <p className="text-xs sm:text-sm text-purple-700"><span className="font-medium">Dosage:</span> {med.dosage}</p>}
                    {med.frequency && <p className="text-xs sm:text-sm text-purple-700"><span className="font-medium">Frequency:</span> {med.frequency}</p>}
                    {med.notes && <p className="text-xs sm:text-sm text-purple-700"><span className="font-medium">Notes:</span> {med.notes}</p>}
                  </div>
                </div>
                {editingSection === 'medications' && (
                  <button type="button" onClick={() => handleRemoveMedication(index)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all shrink-0">
                    <FaTrash className="text-sm sm:text-base" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-sm sm:text-base">No current medications recorded</p>
        )}
      </div>
    </div>
  );
};
