'use client';

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ContactInfo() {
  const { theme } = useTheme();
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Location */}
      <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
            <FaMapMarkerAlt className="text-white text-base sm:text-lg" />
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Our Location</h3>
        </div>
        <p className={`text-sm sm:text-base mb-3 sm:mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Mansoura, Egypt</p>
        <a
          href="https://maps.app.goo.gl/5FhvVGNUQqxF7Ncc8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-2"
        >
          View on Map
          <FaArrowRight className="text-xs sm:text-sm" />
        </a>
      </div>

      {/* Phone */}
      <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
            <FaPhone className="text-white text-base sm:text-lg" />
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Phone Number</h3>
        </div>
        <p className={`font-semibold text-base sm:text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>+20 1012486445</p>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Available Sun-Thu, 9am - 9pm</p>
      </div>

      {/* Email */}
      <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
            <FaEnvelope className="text-white text-base sm:text-lg" />
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Address</h3>
        </div>
        <a href="mailto:support@alnoorclinic.com" className="text-sm sm:text-base text-teal-600 hover:text-teal-700 font-semibold break-all">
          support@CareSync.com
        </a>
      </div>

      {/* WhatsApp */}
      <div className="bg-linear-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Need Instant Help?</h3>
        <p className="text-sm sm:text-base text-teal-50 mb-3 sm:mb-4">Our patient coordinators are online and ready to assist you via WhatsApp.</p>
        <a
          href="https://wa.me/201012486445"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-teal-600 hover:bg-teal-50 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
        >
          <FaWhatsapp className="text-xl sm:text-2xl" />
          <span className="whitespace-nowrap">Chat with us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
