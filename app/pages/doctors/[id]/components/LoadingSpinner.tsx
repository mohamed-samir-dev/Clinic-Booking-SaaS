'use client';

import { useTheme } from '../../../../contexts/ThemeContext';

export default function LoadingSpinner() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}



