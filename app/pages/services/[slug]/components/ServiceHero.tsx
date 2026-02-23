import Image from 'next/image';
import { FaClock, FaDollarSign } from 'react-icons/fa';
import {ServiceHeroProps} from '../../types/types'
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ServiceHero({ service, duration, price }: ServiceHeroProps) {
  const { theme } = useTheme();
  const Icon = service.icon;

  return (
    <div className={`relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#D5F5F0]'} py-12 sm:py-16 md:py-20 px-4 md:px-8 overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        <Image
          src={`/${service.title}.avif`}
          alt={service.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="w-full relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-teal-600/90 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
            <Icon className="text-white text-lg sm:text-xl" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{service.title}</h1>
          </div>

          <h2 className={`text-xl sm:text-2xl md:text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6 px-2`}>
            {service.title === 'Dentistry' ? 'Dental Cleaning & Checkup' : `${service.title} Consultation`}
          </h2>

          <p className={`text-base sm:text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-2`}>
            {service.title === 'Dentistry' 
              ? 'Maintain your brilliant smile and optimal oral health with our comprehensive cleaning and diagnostic services.'
              : `${service.description} Our expert team provides comprehensive care tailored to your needs.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-10">
            <div className={`flex items-center gap-2 sm:gap-3 ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md`}>
              <FaClock className="text-teal-600 text-xl sm:text-2xl" />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-base sm:text-lg`}>{duration}</span>
            </div>
            <div className={`flex items-center gap-2 sm:gap-3 ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md`}>
              <FaDollarSign className="text-teal-600 text-xl sm:text-2xl" />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-base sm:text-lg`}>{price}</span>
            </div>
          </div>

          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
