'use client';

import { Suspense } from 'react';
import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { services } from '@/app/components/services/servicesdata';
import StepsHeader from './components/StepsHeader';
import ServiceSelection from './components/ServiceSelection';
import DoctorSelection from './components/DoctorSelection';
import TimeSelection from './components/TimeSelection';
import DetailsForm from './components/DetailsForm/DetailsForm';
import NavigationButtons from './components/NavigationButtons';
import { useDoctors } from './hooks/useDoctors';
import { useFilters } from './hooks/useFilters';
import { getNextAvailableDay } from './utils/doctorHelpers';
import { getQuickBookingData, clearQuickBookingData } from './utils/quickBooking';
import { Doctor } from '@/app/types/index';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const isQuickBooking = searchParams.get('quick') === 'true';
  const quickData = isQuickBooking ? getQuickBookingData() : null;
  const isValidQuickBooking = quickData && quickData.doctorId && quickData.serviceId;
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  const [currentStep, setCurrentStep] = useState(isValidQuickBooking ? 3 : 1);
  const [selectedService, setSelectedService] = useState(isValidQuickBooking ? quickData.serviceId : '');
  const [selectedDoctor, setSelectedDoctor] = useState(isValidQuickBooking ? quickData.doctorId : '');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [bookingHandler, setBookingHandler] = useState<(() => void) | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    return () => {
      if (isQuickBooking && isValidQuickBooking) {
        clearQuickBookingData();
      }
    };
  }, [isQuickBooking, isValidQuickBooking]);

  // Clean up old selectedService values (convert translated titles to keys)
  useEffect(() => {
    if (selectedService && !services.find(s => s.key === selectedService)) {
      // selectedService is not a valid key, try to find the key from translated title
      const t = translations[locale].services;
      const foundKey = services.find(s => {
        const translation = t[s.key as keyof typeof t];
        const translatedTitle = typeof translation === 'object' && 'title' in translation ? translation.title : '';
        return translatedTitle === selectedService;
      })?.key;
      
      // Use startTransition to avoid cascading renders
      startTransition(() => {
        if (foundKey) {
          setSelectedService(foundKey);
        } else {
          setSelectedService('');
        }
      });
    }
  }, [selectedService, locale]);

  const { allDoctors, loadingDoctors } = useDoctors(selectedService, currentStep, isValidQuickBooking ? true : false);
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

  const handleBookingSubmit = (handler: () => void, submitting: boolean, canSubmitForm: boolean) => {
    setBookingHandler(() => handler);
    setIsSubmitting(submitting);
    setCanSubmit(canSubmitForm);
  };

  const { theme } = useTheme();
  const t = translations[locale].booking;

  return (
    <div className={`min-h-screen py-4 sm:py-8 md:py-12 px-2 sm:px-4 pb-20 sm:pb-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center gap-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{t.navigation.processing}</p>
          </div>
        </div>
      )}
      
      <div className="max-w-full mx-auto px-2 sm:px-4">
        <StepsHeader currentStep={currentStep} />

        <div className="p-2 sm:p-4 md:p-6">
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
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}

          {currentStep === 4 && (
            <DetailsForm
              selectedDoctor={filterProps.doctors.find(d => d._id === selectedDoctor)}
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBookingSubmit={handleBookingSubmit}
            />
          )}
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
          onFinishBooking={() => bookingHandler?.()}
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingPageContent />
    </Suspense>
  );
}
