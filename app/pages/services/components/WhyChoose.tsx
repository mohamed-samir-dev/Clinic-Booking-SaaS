'use client';

import { FaHospital } from 'react-icons/fa';
import { MdVerifiedUser, MdPrecisionManufacturing } from 'react-icons/md';

export default function WhyChoose() {
  return (
    <div className="bg-white py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Why Choose Al Noor Clinic?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            We provide high-quality medical care through a patient-centered approach, ensuring your health and comfort are our top priority.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MdVerifiedUser className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Expert Doctors</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Our medical professionals are highly trained, vetted, and dedicated to your well-being.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MdPrecisionManufacturing className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Modern Technology</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Equipped with the latest diagnostic and treatment tools for accurate and efficient care.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaHospital className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Comfortable Environment</h3>
            <p className="text-sm sm:text-base text-gray-600">
              A clean, modern, and soothing clinic designed to make your visit stress-free and pleasant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
