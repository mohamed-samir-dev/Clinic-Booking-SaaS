interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
  submitText?: string;
  loadingText?: string;
}

export const FormActions = ({ loading, onCancel, submitText = 'Create Manager', loadingText = 'Creating...' }: FormActionsProps) => (
  <div className="flex gap-4 pt-4">
    <button
      type="submit"
      disabled={loading}
      className="flex-1 bg-linear-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      {loading ? loadingText : submitText}
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 bg-gray-700 text-gray-300 px-8 py-3 rounded-xl hover:bg-gray-600 transition-all font-bold"
    >
      Cancel
    </button>
  </div>
);
