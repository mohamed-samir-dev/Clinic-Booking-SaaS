import { Doctor } from '@/app/types/index';
import FiltersSidebar from './FiltersSidebar';
import TopRatedCard from './TopRatedCard';
import DoctorCard from './DoctorCard';

import {DoctorSelectionProps} from '../../types/type'

export default function DoctorSelection({
  doctors, loadingDoctors, selectedDoctor, setSelectedDoctor,
  selectedService, filterProps, onSelectTopRated
}: DoctorSelectionProps) {
  return (
    <div className="flex gap-6">
      <FiltersSidebar {...filterProps} />
      
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Doctor</h2>
        <TopRatedCard onSelect={onSelectTopRated} />
        
        {loadingDoctors ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading doctors...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <p className="text-gray-500 text-lg">No doctors available for {selectedService}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
