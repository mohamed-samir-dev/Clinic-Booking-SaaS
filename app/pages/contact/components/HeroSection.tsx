'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();
  return (
    <div className={`text-white py-8 sm:py-12 lg:py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-teal-500 to-teal-600'}`}>
      <div className="w-full px-4 md:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3">
          Get in Touch with <span className="text-teal-400">Medical Excellence</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"></h2>
        <p className="text-sm sm:text-base lg:text-lg text-teal-50 max-w-3xl">
          Have questions or need to schedule a consultation? Our team is here to provide you with the care and support you deserve.
        </p>
      </div>
    </div>
  );
}
