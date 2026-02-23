'use client';

import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function MapSection() {
  const { theme } = useTheme();
  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Find Us</h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-teal-500 text-lg sm:text-xl mt-1 shrink-0" />
          <div>
            <p className={`text-sm sm:text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>CareSync Clinic</p>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Mansoura, Egypt</p>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/5FhvVGNUQqxF7Ncc8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-teal-600 hover:text-teal-700 font-semibold"
        >
          Get Directions
          <FaArrowRight className="text-xs sm:text-sm" />
        </a>
      </div>
      <div className="mt-4 sm:mt-6 rounded-lg h-48 sm:h-64 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.0234567890123!2d31.380!3d31.037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzEzLjIiTiAzMcKwMjInNDguMCJF!5e0!3m2!1sen!2seg!4v1234567890123!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
