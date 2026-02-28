import { FaLock } from 'react-icons/fa';

interface PasswordSectionProps {
  onChangePassword: () => void;
}

export const PasswordSection = ({ onChangePassword }: PasswordSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaLock className="text-blue-600" />
          </div>
          Change Password
        </h2>
        <button type="button" onClick={onChangePassword} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
          Change
        </button>
      </div>
      <p className="text-gray-600 text-sm">Keep your account secure by updating your password regularly</p>
    </div>
  );
};
