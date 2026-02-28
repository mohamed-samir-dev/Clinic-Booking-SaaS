import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface DeleteModalProps {
  show: boolean;
  deletePassword: string;
  showPassword: boolean;
  showError: boolean;
  errorMsg: string;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
}

export const DeleteModal = ({
  show,
  deletePassword,
  showPassword,
  showError,
  errorMsg,
  loading,
  onClose,
  onSubmit,
  onPasswordChange,
  onTogglePassword
}: DeleteModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-linear-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Delete Account</h2>
          <p className="text-gray-600 text-base leading-relaxed">This action cannot be undone. All your data will be permanently deleted.</p>
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
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter your password to confirm</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={deletePassword} onChange={(e) => onPasswordChange(e.target.value)} className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors" placeholder="Your password" required />
              <button type="button" onClick={onTogglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50">
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
