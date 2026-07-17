'use client';

import { useEffect, useState } from 'react';
import ClinicCard from './ClinicCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
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
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].clinics;
  const isRTL = locale === 'ar';
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinics`);
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
      <section className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-full px-4 md:px-8 animate-pulse">
          <div className={`h-8 rounded w-64 mx-auto mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-4 rounded w-96 mx-auto mb-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`h-80 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full px-4 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{t.title} </span>
            <span className="text-teal-600">{t.titleHighlight}</span>
          </h2>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.description}
          </p>
        </div>

        {clinics.length === 0 ? (
          <div className="text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{t.noClinics}</p>
          </div>
        ) : (
          <Swiper
            modules={[Keyboard, Mousewheel, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            keyboard={{ enabled: true }}
            mousewheel={{ forceToAxis: true }}
            pagination={{ clickable: true }}
            dir={isRTL ? 'rtl' : 'ltr'}
            key={locale}
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
