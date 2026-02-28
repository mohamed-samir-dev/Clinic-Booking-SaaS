import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordData } from '../types';

interface PasswordModalProps {
  show: boolean;
  passwordData: PasswordData;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
  showError: boolean;
  errorMsg: string;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: PasswordData) => void;
  onToggleCurrent: () => void;
  onToggleNew: () => void;
  onToggleConfirm: () => void;
}

export const PasswordModal = ({
  show,
  passwordData,
  showCurrent,
  showNew,
  showConfirm,
  showError,
  errorMsg,
  loading,
  onClose,
  onSubmit,
  onChange,
  onToggleCurrent,
  onToggleNew,
  onToggleConfirm
}: PasswordModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaLock className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Change Password</h2>
          <p className="text-gray-600 text-sm">Enter your current password and choose a new one</p>
        </div>
        {showError && (
          <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-700 font-semibold text-sm">{errorMsg}</p>
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => onChange({...passwordData, currentPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" required />
              <button type="button" onClick={onToggleCurrent} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => onChange({...passwordData, newPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" required />
              <button type="button" onClick={onToggleNew} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => onChange({...passwordData, confirmPassword: e.target.value})} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" required />
              <button type="button" onClick={onToggleConfirm} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50">
              {loading ? 'Changing...' : 'Change'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
