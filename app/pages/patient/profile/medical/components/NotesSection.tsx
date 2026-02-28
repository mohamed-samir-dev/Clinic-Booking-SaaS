import { FaUserMd, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';

interface NotesSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
}

export const NotesSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit }: NotesSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FaUserMd className="text-teal-600 text-sm sm:text-base" />
          </div>
          Notes for Doctor
        </h2>
        {editingSection !== 'notes' ? (
          <button onClick={() => setEditingSection('notes')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
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
      
      {editingSection === 'notes' ? (
        <textarea value={formData.notesForDoctor} onChange={(e) => setFormData({...formData, notesForDoctor: e.target.value})} placeholder="Any additional information you'd like to share with your doctor..." rows={5} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-900 resize-none" />
      ) : (
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-xl border border-gray-200 min-h-[100px] sm:min-h-[120px]">
          <p className="text-gray-900 text-sm sm:text-base whitespace-pre-wrap">{formData.notesForDoctor || 'No additional notes'}</p>
        </div>
      )}
    </div>
  );
};
