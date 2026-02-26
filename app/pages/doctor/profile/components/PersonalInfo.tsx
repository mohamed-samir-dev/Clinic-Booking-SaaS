import { Edit2, Check, X } from 'lucide-react';
import { DoctorProfile, EditData } from '../types';

interface PersonalInfoProps {
  profile: DoctorProfile;
  editingField: 'name' | 'fees' | 'duration' | 'email' | 'phone' | 'location' | 'password' | null;
  editData: EditData;
  setEditData: (data: EditData) => void;
  onEdit: (field: 'password') => void;
  onSave: (field: 'password') => void;
  onCancel: (field: 'password') => void;
  saving: boolean;
}

export const PersonalInfo = ({ profile, editingField, editData, setEditData, onEdit, onSave, onCancel, saving }: PersonalInfoProps) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center">
            <span className="material-icons text-white text-sm">person</span>
          </div>
          Personal Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 font-semibold">Gender</span>
            <span className="text-sm text-gray-900 font-bold capitalize">{profile.gender}</span>
          </div>
          {profile.bloodType && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-semibold">Blood Type</span>
              <span className="text-sm text-gray-900 font-bold">{profile.bloodType}</span>
            </div>
          )}
          {profile.followUpFees && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-semibold">Follow-up Fee</span>
              <span className="text-sm text-gray-900 font-bold">${profile.followUpFees}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center">
              <span className="material-icons text-white text-sm">lock</span>
            </div>
            Change Password
          </h3>
          {editingField !== 'password' && (
            <button
              onClick={() => onEdit('password')}
              className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group"
              title="Edit Password"
            >
              <Edit2 className="w-5 h-5 text-red-600 group-hover:text-red-700" />
            </button>
          )}
        </div>
        {editingField === 'password' ? (
          <div className="space-y-3">
            <input
              type="password"
              value={editData.password}
              onChange={(e) => setEditData({...editData, password: e.target.value})}
              className="w-full px-3 py-2 border-2 border-red-400 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-red-600 bg-white shadow-md"
              placeholder="New Password"
            />
            <p className="text-xs text-gray-500">Enter your new password</p>
            <div className="flex gap-2">
              <button
                onClick={() => onSave('password')}
                disabled={saving}
                className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Password
              </button>
              <button
                onClick={() => onCancel('password')}
                disabled={saving}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Click the edit icon to change your password</p>
        )}
      </div>
    </>
  );
};
