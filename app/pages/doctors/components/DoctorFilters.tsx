'use client';

import { FaFilter, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {DoctorFiltersProps}from '../types/type'


export default function DoctorFilters({
  filters,
  setFilters,
  filterOptions,
  showFilters,
  setShowFilters,
  resetFilters
}: DoctorFiltersProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors.page;
  const hasActiveFilters = filters.specialty || filters.gender || filters.isAvailableToday || filters.minExperience > 0;

  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
            <FaFilter className="text-white text-lg" />
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.filterTitle}</h3>
            <p className={`text-xs sm:text-sm hidden sm:block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.filterSubtitle}</p>
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-all font-semibold flex items-center gap-2 text-sm sm:text-base"
        >
          {showFilters ? t.hide : t.show}
        </button>
      </div>

      {showFilters && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <label className={`block text-sm sm:text-base font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.specialty}</label>
              <select
                value={filters.specialty}
                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}>{t.allSpecialties}</option>
                {filterOptions.specialties?.map((spec) => (
                  <option key={spec.en} value={spec.en} className={theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}>
                    {locale === 'ar' && spec.ar ? spec.ar : spec.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm sm:text-base font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.gender}</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}>{t.allGenders}</option>
                {filterOptions.genders.map((gender) => (
                  <option key={gender} value={gender} className={theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}>{gender === 'male' ? t.male : t.female}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm sm:text-base font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.minExperience}</label>
              <input
                type="number"
                min="0"
                placeholder={t.years}
                value={filters.minExperience || ''}
                onChange={(e) => setFilters({ ...filters, minExperience: parseInt(e.target.value) || 0 })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'}`}
              />
            </div>

            <div className="flex items-end">
              <label className={`flex items-center gap-2 sm:gap-3 cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all w-full ${theme === 'dark' ? 'bg-teal-900/30 hover:bg-teal-900/50' : 'bg-teal-50 hover:bg-teal-100'}`}>
                <input
                  type="checkbox"
                  checked={filters.isAvailableToday}
                  onChange={(e) => setFilters({ ...filters, isAvailableToday: e.target.checked })}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 shrink-0"
                />
                <span className={`text-sm sm:text-base font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.availableToday}</span>
              </label>
            </div>
          </div>

          {hasActiveFilters && (
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {filters.specialty && (
                  <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-800 rounded-full font-semibold text-xs sm:text-sm">
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {t.specialty}: {locale === 'ar' 
                        ? filterOptions.specialties.find(s => s.en === filters.specialty)?.ar || filters.specialty
                        : filters.specialty
                      }
                    </span>
                    <button
                      onClick={() => setFilters({ ...filters, specialty: '' })}
                      className="hover:bg-teal-200 rounded-full p-1 transition-colors shrink-0"
                    >
                      <FaTimes size={10} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                )}
                {filters.gender && (
                  <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-800 rounded-full font-semibold text-xs sm:text-sm">
                    <span>{t.gender}: {filters.gender === 'male' ? t.male : t.female}</span>
                    <button
                      onClick={() => setFilters({ ...filters, gender: '' })}
                      className="hover:bg-teal-200 rounded-full p-1 transition-colors shrink-0"
                    >
                      <FaTimes size={10} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                )}
                {filters.minExperience > 0 && (
                  <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-800 rounded-full font-semibold text-xs sm:text-sm">
                    <span>{t.minExperience}: {filters.minExperience} {t.years}</span>
                    <button
                      onClick={() => setFilters({ ...filters, minExperience: 0 })}
                      className="hover:bg-teal-200 rounded-full p-1 transition-colors shrink-0"
                    >
                      <FaTimes size={10} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                )}
                {filters.isAvailableToday && (
                  <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-800 rounded-full font-semibold text-xs sm:text-sm">
                    <span>{t.availableToday}</span>
                    <button
                      onClick={() => setFilters({ ...filters, isAvailableToday: false })}
                      className="hover:bg-teal-200 rounded-full p-1 transition-colors shrink-0"
                    >
                      <FaTimes size={10} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-bold shadow-md text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <FaTimes className="text-sm sm:text-base" />
                <span>{t.clearAll}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
