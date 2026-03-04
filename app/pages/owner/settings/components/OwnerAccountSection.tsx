import { useState } from 'react';
import { Building2, Save, Edit2, X, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { OwnerData } from '../types';

interface OwnerAccountSectionProps {
  ownerData: OwnerData;
  setOwnerData: (data: OwnerData) => void;
  fetchData: () => void;
}

export const OwnerAccountSection = ({ ownerData, setOwnerData, fetchData }: OwnerAccountSectionProps) => {
  const [editingSection, setEditingSection] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const handleSaveOwner = async () => {
    setSavingSection(true);
    try {
      const token = localStorage.getItem('token');
      const ownerUpdateData: OwnerData & { password?: string } = {
        name: ownerData.name,
        email: ownerData.email,
        phone: ownerData.phone,
      };

      if (ownerPassword.new && ownerPassword.new === ownerPassword.confirm) {
        ownerUpdateData.password = ownerPassword.new;
      }

      await fetch('http://localhost:5000/api/owner/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(ownerUpdateData),
      });

      setOwnerPassword({ new: '', confirm: '' });
      toast.success('Owner account updated successfully');
      setEditingSection(false);
    } catch {
      toast.error('Failed to update owner account');
    } finally {
      setSavingSection(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 size={28} className="text-white" />
          <h3 className="text-xl font-semibold text-white">Owner Account</h3>
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
              onClick={handleSaveOwner}
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
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Owner Name</label>
          <input
            type="text"
            value={ownerData.name}
            onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            disabled={!editingSection}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Owner Email</label>
            <input
              type="email"
              value={ownerData.email}
              onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Owner Phone</label>
            <input
              type="tel"
              value={ownerData.phone}
              onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
        </div>
        <div className="border-t border-gray-600 pt-4 mt-4">
          <h4 className="text-lg font-medium text-white mb-3">Change Owner Password</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  value={ownerPassword.new}
                  onChange={(e) => setOwnerPassword({ ...ownerPassword, new: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Leave blank to keep current"
                  disabled={!editingSection}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={ownerPassword.confirm}
                  onChange={(e) => setOwnerPassword({ ...ownerPassword, confirm: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Confirm new password"
                  disabled={!editingSection}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
