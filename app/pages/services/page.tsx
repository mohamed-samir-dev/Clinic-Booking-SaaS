'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaThList } from 'react-icons/fa';
import { services } from '@/app/components/services/servicesdata';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import Banner from './components/Banner';
import FilterBar from './components/FilterBar';
import ServicesGrid from './components/ServicesGrid';
import WhyChoose from './components/WhyChoose';
import FAQ from './components/FAQ';

export default function ServicesPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services;
  const [searchQuery, setSearchQuery] = useState('');
  
  const defaultFilter = useMemo(() => t.all || 'All', [t]);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  useEffect(() => {
    setActiveFilter(defaultFilter);
  }, [defaultFilter]);

  const serviceCategories = [t.all || 'All', ...services.map(s => {
    const serviceData = t[s.key as keyof typeof t] as { title: string; description: string };
    return serviceData.title;
  })];

  const getServiceIcon = (category: string) => {
    if (category === t.all || category === 'All') return FaThList;
    const service = services.find(s => {
      const serviceData = t[s.key as keyof typeof t] as { title: string; description: string };
      return serviceData.title === category;
    });
    return service?.icon || FaThList;
  };

  const filteredServices = services
    .filter(service => {
      const serviceData = t[service.key as keyof typeof t] as { title: string; description: string };
      const matchesFilter = activeFilter === (t.all || 'All') || serviceData.title === activeFilter;
      
      if (searchQuery === '') return matchesFilter;
      
      const normalizeArabic = (text: string) => {
        return text
          .replace(/[أإآ]/g, 'ا')
          .replace(/[ى]/g, 'ي')
          .replace(/[ة]/g, 'ه')
          .replace(/\s+/g, '');
      };
      
      const query = normalizeArabic(searchQuery.toLowerCase());
      const title = normalizeArabic(serviceData.title.toLowerCase());
      const desc = normalizeArabic(serviceData.description.toLowerCase());
      
      const titleMatch = title.includes(query);
      const descMatch = desc.includes(query);
      const searchTermsMatch = service.searchTerms?.some(term => 
        normalizeArabic(term.toLowerCase()).includes(query)
      );
      
      const matchesSearch = titleMatch || descMatch || searchTermsMatch;
      return matchesFilter && matchesSearch;
    })
    .map(service => {
      const serviceData = t[service.key as keyof typeof t] as { title: string; description: string };
      return {
        icon: service.icon,
        title: serviceData.title,
        description: serviceData.description
      };
    });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Banner 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterReset={() => setActiveFilter(t.all || 'All')}
      />
      <FilterBar 
        categories={serviceCategories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        getIcon={getServiceIcon}
      />
      <ServicesGrid services={filteredServices} />
      <WhyChoose />
      <FAQ />
    </div>
  );
}
