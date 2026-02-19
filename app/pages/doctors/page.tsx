'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Doctor } from '../../types/index';
import DoctorCard from '../../components/doctors/DoctorCard';
import { FaFilter, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    specialty: '',
    gender: '',
    isAvailableToday: false,
    minExperience: 0
  });
  const [filterOptions, setFilterOptions] = useState<{
    specialties: string[];
    genders: string[];
  }>({ specialties: [], genders: [] });
  const [showFilters, setShowFilters] = useState(true);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchDoctors();
    setCurrentPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchFilterOptions = async () => {
    try {
      const data = await api.doctors.getFilters() as { specialties: string[]; genders: string[] };
      setFilterOptions(data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const filterParams: Record<string, string | number | boolean> = {};
      if (filters.specialty) filterParams.specialty = filters.specialty;
      if (filters.gender) filterParams.gender = filters.gender;
      if (filters.isAvailableToday) filterParams.isAvailableToday = true;
      if (filters.minExperience > 0) filterParams.minExperience = filters.minExperience;

      const data = await api.doctors.getAll(filterParams);
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      specialty: '',
      gender: '',
      isAvailableToday: false,
      minExperience: 0
    });
  };

  const hasActiveFilters = filters.specialty || filters.gender || filters.isAvailableToday || filters.minExperience > 0;

  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDoctors = doctors.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-teal-500 to-teal-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Our Doctors</h1>
          <p className="text-lg md:text-xl text-teal-50">Find the best medical professionals for your needs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-teal-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <FaFilter className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Filter Doctors</h3>
                <p className="text-sm text-gray-600">Refine your search to find the perfect doctor</p>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-all font-semibold flex items-center gap-2"
            >
              {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>

          {showFilters && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">Specialty</label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                    className="w-full px-4 py-3 text-base text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                  >
                    <option value="" className="text-gray-900">All Specialties</option>
                    {filterOptions.specialties.map((spec) => (
                      <option key={spec} value={spec} className="text-gray-900">{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className="w-full px-4 py-3 text-base text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                  >
                    <option value="" className="text-gray-900">All Genders</option>
                    {filterOptions.genders.map((gender) => (
                      <option key={gender} value={gender} className="text-gray-900">{gender === 'male' ? 'Male' : 'Female'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">Min Experience</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Years"
                    value={filters.minExperience || ''}
                    onChange={(e) => setFilters({ ...filters, minExperience: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 text-base text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white placeholder:text-gray-500"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer px-4 py-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-all w-full">
                    <input
                      type="checkbox"
                      checked={filters.isAvailableToday}
                      onChange={(e) => setFilters({ ...filters, isAvailableToday: e.target.checked })}
                      className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-base font-bold text-gray-800">Available Today</span>
                  </label>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {filters.specialty && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-semibold">
                        <span>Specialty: {filters.specialty}</span>
                        <button
                          onClick={() => setFilters({ ...filters, specialty: '' })}
                          className="hover:bg-teal-200 rounded-full p-1 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                    {filters.gender && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-semibold">
                        <span>Gender: {filters.gender === 'male' ? 'Male' : 'Female'}</span>
                        <button
                          onClick={() => setFilters({ ...filters, gender: '' })}
                          className="hover:bg-teal-200 rounded-full p-1 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                    {filters.minExperience > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-semibold">
                        <span>Min Experience: {filters.minExperience} years</span>
                        <button
                          onClick={() => setFilters({ ...filters, minExperience: 0 })}
                          className="hover:bg-teal-200 rounded-full p-1 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                    {filters.isAvailableToday && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-semibold">
                        <span>Available Today</span>
                        <button
                          onClick={() => setFilters({ ...filters, isAvailableToday: false })}
                          className="hover:bg-teal-200 rounded-full p-1 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-bold shadow-md"
                  >
                    <FaTimes />
                    <span>Clear All</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all font-semibold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-700 font-semibold">
                Found <span className="text-teal-600">{doctors.length}</span> doctor{doctors.length !== 1 ? 's' : ''}
              </p>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  id={doctor._id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  experienceYears={doctor.experienceYears}
                  photoUrl={doctor.photoUrl}
                  isAvailableToday={doctor.isAvailableToday}
                  availability={doctor.availability}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-2"
                >
                  <FaChevronLeft /> Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-semibold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-2"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
