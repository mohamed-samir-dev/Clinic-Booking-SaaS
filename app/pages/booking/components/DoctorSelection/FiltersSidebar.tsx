import { FaSearch } from 'react-icons/fa';
import {FiltersSidebarProps}from '../../types/type'
import { useTheme } from '@/app/contexts/ThemeContext';


export default function FiltersSidebar({
  doctorSearchQuery, setDoctorSearchQuery,
  selectedGender, setSelectedGender,
  selectedLanguage, setSelectedLanguage,
  priceRange, setPriceRange,
  filterOptions, clearFilters
}: FiltersSidebarProps) {
  const { theme } = useTheme();
  return (
    <div className={`w-full rounded-2xl shadow-xl p-4 sm:p-6 h-fit border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-linear-to-br from-white to-gray-50 border-gray-100'
    }`}>
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-1 h-5 sm:h-6 bg-linear-to-b from-teal-500 to-cyan-500 rounded-full"></div>
        <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
      </div>
      
      <div className="mb-4 sm:mb-5">
        <label className={`block text-xs sm:text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-black'}`}>Search Doctor</label>
        <div className="relative">
          <FaSearch className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search by name..."
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 font-semibold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-xs sm:text-sm ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-black'
            }`}
          />
        </div>
      </div>

      <div className="mb-4 sm:mb-5">
        <label className={`block text-xs sm:text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-semibold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-xs sm:text-sm cursor-pointer ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-black'
          }`}
        >
          <option value="">All Genders</option>
          {filterOptions.genders?.map((gender: string) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 sm:mb-5">
        <label className={`block text-xs sm:text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-semibold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-xs sm:text-sm cursor-pointer ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-black'
          }`}
        >
          <option value="">All Languages</option>
          {filterOptions.languages?.map((language: string) => (
            <option key={language} value={language}>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className={`block text-xs sm:text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Price Range</label>
        <div className={`rounded-xl p-3 sm:p-4 border ${
          theme === 'dark' ? 'bg-teal-900/30 border-teal-800' : 'bg-linear-to-br from-teal-50 to-cyan-50 border-teal-100'
        }`}>
          <input
            type="range"
            min={filterOptions.priceRange[0] || 0}
            max={filterOptions.priceRange[1] || 1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between items-center mt-2 sm:mt-3">
            <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-lg shadow-sm ${
              theme === 'dark' ? 'bg-gray-700 text-teal-400' : 'bg-white text-teal-700'
            }`}>${priceRange[0]}</span>
            <span className={`text-[10px] sm:text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
            <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-lg shadow-sm ${
              theme === 'dark' ? 'bg-gray-700 text-teal-400' : 'bg-white text-teal-700'
            }`}>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {(doctorSearchQuery || selectedGender || selectedLanguage || priceRange[1] !== filterOptions.priceRange[1]) && (
        <button
          onClick={clearFilters}
          className={`w-full mt-3 sm:mt-4 py-2 sm:py-2.5 font-semibold rounded-xl transition-all text-xs sm:text-sm ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
