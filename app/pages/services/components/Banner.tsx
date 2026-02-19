'use client';

import { FaSearch } from 'react-icons/fa';

interface BannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterReset: () => void;
}

export default function Banner({ searchQuery, onSearchChange, onFilterReset }: BannerProps) {
  return (
    <div className="bg-[#D5F5F0] py-12 sm:py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Comprehensive Care for You and <br className="hidden sm:block" />Your Family
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Expert medical services tailored to your needs. Search our specialties or browse through our full range of treatments.
        </p>
        
        <div className="max-w-2xl mx-auto relative px-2">
          <FaSearch className="absolute left-5 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              onFilterReset();
            }}
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
}
