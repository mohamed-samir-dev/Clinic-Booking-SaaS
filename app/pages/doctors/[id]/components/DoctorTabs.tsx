'use client';

import { useState } from 'react';
import { FaGraduationCap, FaLanguage, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTint } from 'react-icons/fa';
import { Doctor } from '../../../../types';
import { ReviewsTab, ScheduleTab, SpecializationsCard } from './tabs';

interface DoctorTabsProps {
  doctor: Doctor;
}

export default function DoctorTabs({ doctor }: DoctorTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullAbout, setShowFullAbout] = useState(false);
  const doctorAbout = doctor.aboutUs || '';
  const aboutPreview = doctorAbout.slice(0, 150);

  return (
    <>
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === 'overview' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === 'locations' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Locations
            {activeTab === 'locations' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === 'reviews' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews
            {activeTab === 'reviews' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 sm:pb-4 px-1 sm:px-2 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === 'schedule' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Schedule
            {activeTab === 'schedule' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* About Section */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-b-2 border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">About</h3>
                {doctorAbout ? (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {showFullAbout || doctorAbout.length <= 150 ? doctorAbout : `${aboutPreview}...`}
                    {doctorAbout.length > 150 && (
                      <button
                        onClick={() => setShowFullAbout(!showFullAbout)}
                        className="text-teal-600 hover:text-teal-700 font-semibold ml-2 inline-flex items-center"
                      >
                        {showFullAbout ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">No information available</p>
                )}
              </div>

              {/* Education & Languages */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 relative">
                {/* Education */}
                <div className="rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                      <FaGraduationCap className="text-teal-600 text-base sm:text-lg" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Education</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {doctor.education && doctor.education.length > 0 ? (
                      doctor.education.map((edu, index) => (
                        <div key={index} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 mt-1">
                            <FaGraduationCap className="text-teal-600 text-xs sm:text-sm" />
                          </div>
                          <div>
                            <p className="font-bold text-sm sm:text-base text-gray-900">{edu.institution || 'Institution'}</p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {edu.degree || 'Degree'}{edu.year && ` • ${edu.year}`}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500">No education information available</p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

                {/* Languages */}
                <div className="rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                      <FaLanguage className="text-cyan-600 text-base sm:text-lg" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {doctor.languages && doctor.languages.length > 0 ? (
                      doctor.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium text-xs sm:text-sm shadow-sm"
                        >
                          {lang}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500">No language information available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Blood Type */}
              {doctor.bloodType && (
                <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-50 flex items-center justify-center">
                      <FaTint className="text-red-600 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Blood Type</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">{doctor.bloodType}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-4 sm:space-y-6">
              {doctor.location && (doctor.location.address || doctor.location.city) ? (
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="text-teal-600 text-lg sm:text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Clinic Location</h3>
                      {doctor.location.address && (
                        <p className="text-sm sm:text-base text-gray-600 mb-1">{doctor.location.address}</p>
                      )}
                      {doctor.location.city && (
                        <p className="text-gray-500 text-xs sm:text-sm mb-3">{doctor.location.city}</p>
                      )}
                      {doctor.location.mapsLink && (
                        <a
                          href={doctor.location.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          <FaMapMarkerAlt />
                          View on Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No location information available
                </div>
              )}

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {doctor.phone && (
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FaPhone className="text-blue-600 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="font-semibold text-sm sm:text-base text-gray-900">{doctor.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
                {doctor.email && (
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <FaEnvelope className="text-purple-600 text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm break-all">{doctor.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && <ReviewsTab doctor={doctor} />}

          {activeTab === 'schedule' && <ScheduleTab doctor={doctor} />}
        </div>
      </div>

      <SpecializationsCard specializations={doctor.specializations || []} />
    </>
  );
}
