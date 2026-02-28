interface DeleteAccountButtonProps {
  onDelete: () => void;
}

export const DeleteAccountButton = ({ onDelete }: DeleteAccountButtonProps) => {
  return (
    <div className="mt-4 sm:mt-6">
      <button onClick={onDelete} className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Account
      </button>
    </div>
  );
};
