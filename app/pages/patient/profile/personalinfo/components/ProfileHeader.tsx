import { FaSave, FaHeart } from 'react-icons/fa';

interface ProfileHeaderProps {
  name: string;
  email: string;
  isEditing: boolean;
  loading: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
}

export const ProfileHeader = ({ name, email, isEditing, loading, onEdit, onCancel, onSave }: ProfileHeaderProps) => {
  return (
    <div className="bg-linear-to-r from-teal-600 to-teal-700 rounded-2xl p-8 mb-8 shadow-xl relative">
      <button className="absolute top-6 right-6 text-white/60 hover:text-red-400 transition-colors duration-300">
        <FaHeart className="text-2xl" />
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-teal-600">{name?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{name || 'Patient Name'}</h1>
            <p className="text-teal-100 text-lg">{email || 'email@example.com'}</p>
          </div>
        </div>
        {!isEditing ? (
          <button onClick={onEdit} className="px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all shadow-lg">
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={onCancel} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
              Cancel
            </button>
            <button onClick={onSave} disabled={loading} className="px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all shadow-lg flex items-center gap-2">
              <FaSave /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
