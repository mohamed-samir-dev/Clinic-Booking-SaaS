import { Edit2, Save, X } from 'lucide-react';

interface ProfileHeaderProps {
  editMode: boolean;
  saving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileHeader = ({ editMode, saving, onEdit, onSave, onCancel }: ProfileHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">View and manage your professional information</p>
        </div>
        <div className="flex gap-2">
          {!editMode ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
