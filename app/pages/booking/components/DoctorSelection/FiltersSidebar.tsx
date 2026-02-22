import { FaSearch } from 'react-icons/fa';
import {FiltersSidebarProps}from '../../types/type'


export default function FiltersSidebar({
  doctorSearchQuery, setDoctorSearchQuery,
  selectedGender, setSelectedGender,
  selectedLanguage, setSelectedLanguage,
  priceRange, setPriceRange,
  filterOptions, clearFilters
}: FiltersSidebarProps) {
  return (
    <div className="w-80 bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 h-fit border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-linear-to-b from-teal-500 to-cyan-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
      </div>
      
      <div className="mb-5">
        <label className="block text-sm font-bold text-black mb-2">Search Doctor</label>
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name..."
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-black font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="w-full px-4 py-3 text-black font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-white cursor-pointer"
        >
          <option value="">All Genders</option>
          {filterOptions.genders?.map((gender: string) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full px-4 py-3 text-black font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-white cursor-pointer"
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
        <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
        <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
          <input
            type="range"
            min={filterOptions.priceRange[0] || 0}
            max={filterOptions.priceRange[1] || 1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm font-bold text-teal-700 bg-white px-3 py-1 rounded-lg shadow-sm">${priceRange[0]}</span>
            <span className="text-xs text-gray-500">to</span>
            <span className="text-sm font-bold text-teal-700 bg-white px-3 py-1 rounded-lg shadow-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {(doctorSearchQuery || selectedGender || selectedLanguage || priceRange[1] !== filterOptions.priceRange[1]) && (
        <button
          onClick={clearFilters}
          className="w-full mt-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-sm"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
