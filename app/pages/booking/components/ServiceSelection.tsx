import { FaSearch } from 'react-icons/fa';
import ServiceCard from '@/app/components/services/ServiceCard';
import { services } from '@/app/components/services/servicesdata';
import {ServiceSelectionProps}from '../types/type'
import { useTheme } from '@/app/contexts/ThemeContext';


export default function ServiceSelection({ selectedService, setSelectedService, searchQuery, setSearchQuery }: ServiceSelectionProps) {
  const { theme } = useTheme();
  const filteredServices = services.filter(service => 
    searchQuery === '' || 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Select Service</h2>
        <div className="max-w-2xl mx-auto relative">
          <FaSearch className={`absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-base sm:text-xl ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
          <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No services found matching your search.</p>
        </div>
      )}
    </div>
  );
}
