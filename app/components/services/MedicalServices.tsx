'use client';


import ServiceCard from './ServiceCard';
import {services}from './servicesdata'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';



export default function MedicalServices() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="w-full px-4 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-gray-900">Our </span>
            <span className="text-teal-600">Medical Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">Comprehensive healthcare services from trusted clinics near you.</p>
        </div>
        <Swiper
          modules={[Keyboard, Mousewheel, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 }
          }}
          className="pb-10 sm:pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
