import { FaSearch } from 'react-icons/fa';
import ServiceCard from '@/app/components/services/ServiceCard';
import { services } from '@/app/components/services/servicesdata';
import {ServiceSelectionProps}from '../types/type'
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

// دالة لتطبيع النص العربي للبحث
const normalizeArabic = (text: string) => {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ة]/g, 'ه')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي')
    .toLowerCase()
    .trim();
};

export default function ServiceSelection({ selectedService, setSelectedService, searchQuery, setSearchQuery }: ServiceSelectionProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services;
  const bt = translations[locale].booking.serviceSelection;
  const isRTL = locale === 'ar';
  
  const servicesWithTranslations = services.map(service => ({
    ...service,
    title: t[service.key as keyof typeof t]?.title || '',
    description: t[service.key as keyof typeof t]?.description || ''
  }));
  
  const filteredServices = servicesWithTranslations.filter(service => {
    if (searchQuery === '') return true;
    
    const normalizedQuery = normalizeArabic(searchQuery);
    const normalizedTitle = normalizeArabic(service.title || '');
    const normalizedDescription = normalizeArabic(service.description || '');
    
    return normalizedTitle.includes(normalizedQuery) ||
           normalizedDescription.includes(normalizedQuery) ||
           service.searchTerms?.some(term => normalizeArabic(term).includes(normalizedQuery));
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center mb-6 sm:mb-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bt.title}</h2>
        <div className="max-w-2xl mx-auto relative">
          <FaSearch className={`absolute ${isRTL ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} top-1/2 transform -translate-y-1/2 text-base sm:text-xl ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder={bt.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRTL ? 'pr-10 sm:pr-12 pl-4' : 'pl-10 sm:pl-12 pr-4'} py-3 sm:py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {filteredServices.map((service, index) => {
          const originalService = services.find(s => s.key === service.key);
          return (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedService(originalService?.key || '');
              }}
              className="cursor-pointer transition-all"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                serviceKey={service.key}
                isSelected={selectedService === originalService?.key}
              />
            </div>
          );
        })}
      </div>
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{bt.noResults}</p>
        </div>
      )}
    </div>
  );
}
