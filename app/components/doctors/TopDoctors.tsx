'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DoctorCard from './DoctorCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import { useTheme } from '@/app/contexts/ThemeContext';
import 'swiper/css';
import 'swiper/css/pagination';
import {Doctor}from '../../types/index'
import { api } from '../../lib/api';

export default function TopDoctors() {
  const { theme } = useTheme();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const data = await api.doctors.getTop();
        setDoctors(Array.isArray(data) ? data.slice(0, 7) : []);
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  if (loading) {
    return (
      <section className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="w-full px-4 md:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className={`h-8 rounded w-64 mx-auto mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`h-4 rounded w-96 mx-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="w-full px-4 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Our Top </span>
            <span className="text-teal-600">Doctors</span>
          </h2>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Meet our most experienced medical professionals
          </p>
          <Link 
            href="/pages/doctors" 
            className="inline-block text-teal-600 hover:text-teal-700 font-semibold text-sm sm:text-base transition-colors"
          >
            View All Doctors →
          </Link>
        </div>

        <Swiper
          modules={[Keyboard, Mousewheel, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 }
          }}
          className="pb-10 sm:pb-12"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor._id}>
              <DoctorCard
                id={doctor._id}
                name={doctor.name}
                specialty={doctor.specialty}
                experienceYears={doctor.experienceYears}
                photoUrl={doctor.photoUrl}
                isAvailableToday={doctor.isAvailableToday}
                availability={doctor.availability}
                clinicName={doctor.clinicId?.name}
                quickBook={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
