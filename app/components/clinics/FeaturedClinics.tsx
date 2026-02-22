'use client';

import { useEffect, useState } from 'react';
import ClinicCard from './ClinicCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
  logo?: string;
  address?: { en: string; ar: string };
  phone?: string;
}

export default function FeaturedClinics() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clinics');
        if (response.ok) {
          const data = await response.json();
          setClinics(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch clinics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="w-full px-4 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-gray-900">Our </span>
            <span className="text-teal-600">Clinics</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our network of trusted medical facilities
          </p>
        </div>

        {clinics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No clinics available at the moment</p>
          </div>
        ) : (
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
            }}
            className="pb-10 sm:pb-12"
          >
            {clinics.map((clinic) => (
              <SwiperSlide key={clinic._id}>
                <ClinicCard
                  id={clinic._id}
                  name={clinic.name}
                  logo={clinic.logo}
                  address={clinic.address}
                  phone={clinic.phone}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
