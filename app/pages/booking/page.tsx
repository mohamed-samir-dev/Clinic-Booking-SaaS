'use client';

import { useState, useTransition } from 'react';
import StepsHeader from './components/StepsHeader';
import ServiceSelection from './components/ServiceSelection';
import DoctorSelection from './components/DoctorSelection';
import TimeSelection from './components/TimeSelection';
import DetailsForm from './components/DetailsForm';
import NavigationButtons from './components/NavigationButtons';
import { useDoctors } from './hooks/useDoctors';
import { useFilters } from './hooks/useFilters';
import { getNextAvailableDay } from './utils/doctorHelpers';
import { Doctor } from '@/app/types/index';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const { allDoctors, loadingDoctors } = useDoctors(selectedService, currentStep);
  const filterProps = useFilters(allDoctors);

  const handleNext = () => {
    if (currentStep < 4) {
      startTransition(() => {
        setCurrentStep(currentStep + 1);
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      startTransition(() => {
        setCurrentStep(currentStep - 1);
      });
    }
  };

  const selectFirstAvailableDoctor = () => {
    const availableDoctors = filterProps.doctors.filter((doctor: Doctor) => {
      const nextAvailable = getNextAvailableDay(doctor.availability || []);
      return nextAvailable !== null;
    });
    
    if (availableDoctors.length > 0) {
      const sortedByRating = [...availableDoctors].sort((a, b) => ((b.ratingAvg || 4.8) - (a.ratingAvg || 4.8)));
      setSelectedDoctor(sortedByRating[0]._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pb-24">
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-full mx-auto px-4">
        <StepsHeader currentStep={currentStep} />

        <div className="p-6" onClick={() => setSelectedService('')}>
          {currentStep === 1 && (
            <ServiceSelection
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {currentStep === 2 && (
            <DoctorSelection
              doctors={filterProps.doctors}
              loadingDoctors={loadingDoctors}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              selectedService={selectedService}
              filterProps={filterProps}
              onSelectTopRated={selectFirstAvailableDoctor}
            />
          )}

          {currentStep === 3 && (
            <TimeSelection
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDoctor={filterProps.doctors.find(d => d._id === selectedDoctor)}
              selectedService={selectedService}
            />
          )}

          {currentStep === 4 && <DetailsForm />}
        </div>
        
        <NavigationButtons
          currentStep={currentStep}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          selectedTime={selectedTime}
          doctors={filterProps.doctors}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}
