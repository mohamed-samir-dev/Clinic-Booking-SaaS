import { useState } from 'react';
import { Building2, Save, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ClinicData } from '../types';

interface ClinicInfoSectionProps {
  clinicData: ClinicData;
  setClinicData: (data: ClinicData) => void;
  fetchData: () => void;
}

export const ClinicInfoSection = ({ clinicData, setClinicData, fetchData }: ClinicInfoSectionProps) => {
  const [editingSection, setEditingSection] = useState(false);
  const [savingSection, setSavingSection] = useState(false);

  const handleSaveClinic = async () => {
    setSavingSection(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/owner/main-clinic', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(clinicData),
      });

      toast.success('Clinic information updated successfully');
      setEditingSection(false);
    } catch {
      toast.error('Failed to update clinic information');
    } finally {
      setSavingSection(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 size={28} className="text-white" />
          <h3 className="text-xl font-semibold text-white">Main Clinic Information</h3>
        </div>
        {!editingSection ? (
          <button
            onClick={() => setEditingSection(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Edit2 size={18} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSaveClinic}
              disabled={savingSection}
              className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
            >
              <Save size={18} />
              {savingSection ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setEditingSection(false);
                fetchData();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Name (English)</label>
            <input
              type="text"
              value={clinicData.name.en}
              onChange={(e) => setClinicData({ ...clinicData, name: { ...clinicData.name, en: e.target.value } })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">اسم العيادة (عربي)</label>
            <input
              type="text"
              value={clinicData.name.ar}
              onChange={(e) => setClinicData({ ...clinicData, name: { ...clinicData.name, ar: e.target.value } })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
              dir="rtl"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={clinicData.email}
              onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={clinicData.phone}
              onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
