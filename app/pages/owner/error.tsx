'use client';

import { useEffect } from 'react';

export default function OwnerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-icons text-red-400 text-3xl">error_outline</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Failed to load page</h2>
        <p className="text-gray-400 mb-6 text-sm">{error.message || 'Something went wrong. Please try again.'}</p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
