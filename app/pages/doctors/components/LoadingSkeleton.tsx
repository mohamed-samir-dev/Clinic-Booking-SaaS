'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function LoadingSkeleton() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`rounded-2xl shadow-md p-4 sm:p-6 animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-5 sm:h-6 rounded w-3/4 mx-auto mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-3 sm:h-4 rounded w-1/2 mx-auto mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-9 sm:h-10 rounded w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      ))}
    </div>
  );
}
