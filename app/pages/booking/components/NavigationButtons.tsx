import Image from 'next/image';
import { getDoctorName, getDoctorSpecialty } from '../utils/doctorHelpers';
import {NavigationButtonsProps}from '../types/type'
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function NavigationButtons({
  currentStep, selectedService, setSelectedService,
  selectedDoctor, setSelectedDoctor, selectedTime,
  doctors, handleBack, handleNext, onFinishBooking, isSubmitting, canSubmit
}: NavigationButtonsProps & { onFinishBooking?: () => void; isSubmitting?: boolean; canSubmit?: boolean }) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.navigation;
  const services = translations[locale].services;
  const isRTL = locale === 'ar';
  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t p-2 sm:p-4 shadow-lg z-40 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-full mx-auto px-2 sm:px-4">
        <div className={`flex items-center gap-2 sm:gap-4 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}>
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-xs sm:text-sm ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span className="material-icons text-base sm:text-lg">{isRTL ? 'arrow_forward' : 'arrow_back'}</span>
              <span className="hidden sm:inline">{t.back}</span>
            </button>
          ) : <div></div>}
          
          <div className="flex-1 flex justify-center">
          
          {currentStep === 1 && selectedService && (() => {
            // Check if selectedService is a key or a translated title
            const serviceKey = services[selectedService as keyof typeof services] 
              ? selectedService 
              : Object.keys(services).find(key => {
                  const service = services[key as keyof typeof services];
                  return typeof service === 'object' && 'title' in service && service.title === selectedService;
                }) || selectedService;
            
            const serviceData = services[serviceKey as keyof typeof services];
            const serviceTitle = (typeof serviceData === 'object' && 'title' in serviceData && serviceData.title) || selectedService;
            return (
              <div className={`flex items-center border-2 rounded-xl px-2 sm:px-5 py-2 sm:py-3 shadow-sm max-w-[200px] sm:max-w-none ${
                theme === 'dark' ? 'bg-teal-900/30 border-teal-700' : 'bg-linear-to-r from-teal-50 to-cyan-50 border-teal-200'
              }`}>
                <div className={`w-2 h-2 bg-teal-500 rounded-full shrink-0 ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}></div>
                <span className={`font-semibold text-xs sm:text-sm truncate ${theme === 'dark' ? 'text-teal-300' : 'text-teal-800'}`}>{serviceTitle}</span>
                <button
                  onClick={() => setSelectedService('')}
                  className={`${isRTL ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'} w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-200 text-xs font-bold shrink-0 ${
                    theme === 'dark' ? 'bg-teal-800 hover:bg-teal-700 text-teal-300 hover:text-teal-200' : 'bg-teal-100 hover:bg-teal-200 text-teal-600 hover:text-teal-800'
                  }`}
                >
                  ✕
                </button>
              </div>
            );
          })()}
          
          {currentStep === 2 && selectedDoctor && (() => {
            const doctor = doctors.find(d => d._id === selectedDoctor);
            if (!doctor) return null;
            const doctorName = getDoctorName(doctor.name, locale);
            const doctorSpecialty = getDoctorSpecialty(doctor.specialty, locale);
            return (
              <div className={`flex items-center border-2 rounded-xl px-2 sm:px-4 py-2 shadow-sm max-w-[250px] sm:max-w-none ${
                theme === 'dark' ? 'bg-teal-900/30 border-teal-700' : 'bg-linear-to-r from-teal-50 to-cyan-50 border-teal-200'
              }`}>
                <Image
                  src={doctor.photoUrl}
                  alt={doctorName}
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0"
                />
                <div className={`flex-1 min-w-0 ${isRTL ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'}`}>
                  <p className={`font-semibold text-xs sm:text-sm truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{doctorName}</p>
                  <p className={`text-[10px] sm:text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{doctorSpecialty}</p>
                </div>
                <button
                  onClick={() => setSelectedDoctor('')}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all text-xs font-bold shrink-0 ${isRTL ? 'mr-2' : 'ml-2'} ${
                    theme === 'dark' ? 'bg-teal-800 hover:bg-teal-700 text-teal-300 hover:text-teal-200' : 'bg-teal-100 hover:bg-teal-200 text-teal-600 hover:text-teal-800'
                  }`}
                >
                  ✕
                </button>
              </div>
            );
          })()}
          </div>
          
          <button
            onClick={currentStep === 4 ? onFinishBooking : handleNext}
            disabled={
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedDoctor) ||
              (currentStep === 3 && !selectedTime) ||
              (currentStep === 4 && (!canSubmit || isSubmitting))
            }
            className="px-3 sm:px-6 py-2 sm:py-3 rounded-xl bg-linear-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-600 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap"
          >
            {currentStep === 4 && isSubmitting ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">{t.processing}</span>
              </>
            ) : (
              <>
                {currentStep === 4 && <span className="material-icons text-base sm:text-lg">check_circle</span>}
                <span className="hidden sm:inline">{currentStep === 4 ? t.confirmFinish : t.continue}</span>
                <span className="sm:hidden">{currentStep === 4 ? t.finish : t.next}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
