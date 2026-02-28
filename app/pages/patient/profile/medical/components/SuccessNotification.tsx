interface SuccessNotificationProps {
  showSuccess: boolean;
  errorMessage: string;
  successMessage: string;
}

export const SuccessNotification = ({ showSuccess, errorMessage, successMessage }: SuccessNotificationProps) => {
  if (!showSuccess) return null;

  return (
    <div className={`fixed top-6 right-6 ${errorMessage ? 'bg-linear-to-r from-red-500 to-rose-600' : 'bg-linear-to-r from-green-500 to-emerald-600'} text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3`}>
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        {errorMessage ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="font-semibold text-base">{errorMessage || successMessage}</span>
    </div>
  );
};
