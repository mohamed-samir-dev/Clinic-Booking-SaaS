import { FaSearch } from 'react-icons/fa';
import ServiceCard from '@/app/components/services/ServiceCard';
import { services } from '@/app/components/services/servicesdata';
import {ServiceSelectionProps}from '../types/type'


export default function ServiceSelection({ selectedService, setSelectedService, searchQuery, setSearchQuery }: ServiceSelectionProps) {
  const filteredServices = services.filter(service => 
    searchQuery === '' || 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Service</h2>
        <div className="max-w-2xl mx-auto relative">
          <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 text-base"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedService(service.title);
            }}
            className="cursor-pointer transition-all"
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              isSelected={selectedService === service.title}
            />
          </div>
        ))}
      </div>
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your search.</p>
        </div>
      )}
    </div>
  );
}
