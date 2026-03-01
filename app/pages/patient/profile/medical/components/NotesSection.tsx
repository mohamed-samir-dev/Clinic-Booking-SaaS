import { FaUserMd, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface NotesSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
}

export const NotesSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit }: NotesSectionProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.patient.medical : messages.patient.medical;
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FaUserMd className="text-teal-600 text-sm sm:text-base" />
          </div>
          {t.notes.title}
        </h2>
        {editingSection !== 'notes' ? (
          <button onClick={() => setEditingSection('notes')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
            <FaEdit /> {t.actions.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditingSection(null)} className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-all">
              <FaTimes />
            </button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
              <FaSave /> {loading ? '...' : t.actions.save}
            </button>
          </div>
        )}
      </div>
      
      {editingSection === 'notes' ? (
        <textarea value={formData.notesForDoctor} onChange={(e) => setFormData({...formData, notesForDoctor: e.target.value})} placeholder={t.notes.placeholder} rows={5} className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none resize-none ${
          theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
        }`} />
      ) : (
        <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border min-h-[100px] sm:min-h-[120px] ${
          theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
        }`}>
          <p className={`text-sm sm:text-base whitespace-pre-wrap ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{formData.notesForDoctor || t.notes.noNotes}</p>
        </div>
      )}
    </div>
  );
};
