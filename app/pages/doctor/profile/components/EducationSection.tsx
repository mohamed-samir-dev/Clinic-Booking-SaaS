import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { DoctorProfile } from '../types';
import { useState } from 'react';

interface EducationSectionProps {
  education: DoctorProfile['education'];
  theme: 'light' | 'dark';
  editData: Array<{ degree: string; institution: string; year: string }>;
  onUpdate: (education: Array<{ degree: string; institution: string; year: string }>) => void;
  onSave: () => void;
  saving: boolean;
}

export const EducationSection = ({ education, theme, editData, onUpdate, onSave, saving }: EducationSectionProps) => {
  const [editing, setEditing] = useState(false);

  const handleAdd = () => {
    onUpdate([...editData, { degree: '', institution: '', year: '' }]);
  };

  const handleRemove = (index: number) => {
    onUpdate(editData.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: 'degree' | 'institution' | 'year', value: string) => {
    const updated = [...editData];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleSave = async () => {
    await onSave();
    setEditing(false);
  };

  const handleCancel = () => {
    onUpdate(education || []);
    setEditing(false);
  };

  return (
    <div className={`rounded-2xl shadow-lg border p-4 sm:p-6 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          Education
        </h3>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            title="Edit Education"
          >
            <span className="material-icons text-sm text-blue-600">edit</span>
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-3">
          {editData.map((edu, index) => (
            <div key={index} className={`p-3 rounded-xl border space-y-2 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-100'
            }`}>
              <div className="flex justify-between items-start">
                <span className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>#{index + 1}</span>
                <button
                  onClick={() => handleRemove(index)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="Degree (e.g., MBBS)"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' 
                    : 'bg-white border-blue-200 text-gray-900 focus:border-blue-600'
                } border-2`}
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                placeholder="Institution"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' 
                    : 'bg-white border-blue-200 text-gray-900 focus:border-blue-600'
                } border-2`}
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleChange(index, 'year', e.target.value)}
                placeholder="Year (e.g., 2020)"
                className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' 
                    : 'bg-white border-blue-200 text-gray-900 focus:border-blue-600'
                } border-2`}
              />
            </div>
          ))}
          
          <button
            onClick={handleAdd}
            className={`w-full py-2 px-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400'
                : 'border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700'
            }`}
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-icons text-sm">check</span> Save
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-icons text-sm">close</span> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {(!education || education.length === 0) ? (
            <p className={`text-sm text-center py-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>No education added yet</p>
          ) : (
            education.map((edu, index) => (
              <div key={index} className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-linear-to-r from-blue-50 to-cyan-50 border-blue-100'
              }`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm sm:text-base break-words ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{edu.degree}</h4>
                  <p className={`text-xs sm:text-sm mt-1 break-words ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{edu.institution}</p>
                  <p className={`text-xs font-semibold mt-1 ${
                    theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                  }`}>{edu.year}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
