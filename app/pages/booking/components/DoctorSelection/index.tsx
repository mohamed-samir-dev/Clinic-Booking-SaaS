import { Doctor } from '@/app/types/index';
import FiltersSidebar from './FiltersSidebar';
import TopRatedCard from './TopRatedCard';
import DoctorCard from './DoctorCard';
import { useTheme } from '@/app/contexts/ThemeContext';

import {DoctorSelectionProps} from '../../types/type'

export default function DoctorSelection({
  doctors, loadingDoctors, selectedDoctor, setSelectedDoctor,
  selectedService, filterProps, onSelectTopRated
}: DoctorSelectionProps) {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      <div className="lg:w-80 w-full">
        <FiltersSidebar {...filterProps} />
      </div>
      
      <div className="flex-1">
        <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recommended Doctor</h2>
        <TopRatedCard onSelect={onSelectTopRated} />
        
        {loadingDoctors ? (
          <div className="text-center py-12">
            <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Loading doctors...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 min-[1100px]:grid-cols-2 gap-3 sm:gap-4">
              {doctors.map((doctor: Doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                  selectedDoctor={selectedDoctor}
                  onSelect={setSelectedDoctor}
                />
              ))}
            </div>
            {doctors.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No doctors available for {selectedService}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
