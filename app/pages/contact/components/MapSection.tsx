import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

export default function MapSection() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-teal-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Find Us</h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-teal-500 text-lg sm:text-xl mt-1 shrink-0" />
          <div>
            <p className="text-sm sm:text-base font-bold text-gray-900">Al Noor Clinic</p>
            <p className="text-sm sm:text-base text-gray-700">123 Medical Plaza</p>
          </div>
        </div>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-teal-600 hover:text-teal-700 font-semibold"
        >
          Get Directions
          <FaArrowRight className="text-xs sm:text-sm" />
        </a>
      </div>
      <div className="mt-4 sm:mt-6 bg-gray-200 rounded-lg h-48 sm:h-64 flex items-center justify-center">
        <p className="text-sm sm:text-base text-gray-500">Map Placeholder</p>
      </div>
    </div>
  );
}
