'use client';

import { useState } from 'react';
import { FaThList } from 'react-icons/fa';
import { services } from '@/app/components/services/servicesdata';
import Banner from './components/Banner';
import FilterBar from './components/FilterBar';
import ServicesGrid from './components/ServicesGrid';
import WhyChoose from './components/WhyChoose';
import FAQ from './components/FAQ';

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = ['All', ...services.map(s => s.title)];

  const getServiceIcon = (category: string) => {
    if (category === 'All') return FaThList;
    const service = services.find(s => s.title === category);
    return service?.icon || FaThList;
  };

  const filteredServices = services.filter(service => {
    const matchesFilter = activeFilter === 'All' || service.title === activeFilter;
    const matchesSearch = searchQuery === '' || 
                          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterReset={() => setActiveFilter('All')}
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
