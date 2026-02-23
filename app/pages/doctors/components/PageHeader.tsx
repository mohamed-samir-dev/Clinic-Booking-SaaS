'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function PageHeader() {
  const { theme } = useTheme();
  return (
    <div className={`text-white py-8 sm:py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-r from-teal-500 to-teal-600'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
          Our <span className="text-teal-400">Doctors</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-teal-50">Find the best medical professionals for your needs</p>
      </div>
    </div>
  );
}
