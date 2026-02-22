import Image from 'next/image';
import { getDoctorName, getDoctorSpecialty } from '../utils/doctorHelpers';
import {NavigationButtonsProps}from '../types/type'

export default function NavigationButtons({
  currentStep, selectedService, setSelectedService,
  selectedDoctor, setSelectedDoctor, selectedTime,
  doctors, handleBack, handleNext, onFinishBooking, isSubmitting, canSubmit
}: NavigationButtonsProps & { onFinishBooking?: () => void; isSubmitting?: boolean; canSubmit?: boolean }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center gap-4">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all text-sm"
            >
              <span className="material-icons text-lg">arrow_back</span>
              Back
            </button>
          ) : <div></div>}
          
          {currentStep === 1 && selectedService && (
            <div className="flex items-center bg-linear-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl px-5 py-3 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
              <span className="text-teal-800 font-semibold text-sm">{selectedService}</span>
              <button
                onClick={() => setSelectedService('')}
                className="ml-3 w-6 h-6 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-600 hover:text-teal-800 transition-all duration-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}
          
          {currentStep === 2 && selectedDoctor && (() => {
            const doctor = doctors.find(d => d._id === selectedDoctor);
            if (!doctor) return null;
            const doctorName = getDoctorName(doctor.name);
            const doctorSpecialty = getDoctorSpecialty(doctor.specialty);
            return (
              <div className="flex items-center bg-linear-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl px-4 py-2 shadow-sm">
                <Image
                  src={doctor.photoUrl}
                  alt={doctorName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 ml-3">
                  <p className="font-semibold text-gray-900 text-sm">{doctorName}</p>
                  <p className="text-xs text-gray-600">{doctorSpecialty}</p>
                </div>
                <button
                  onClick={() => setSelectedDoctor('')}
                  className="w-6 h-6 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center text-teal-600 hover:text-teal-800 transition-all text-xs font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            );
          })()}
          
          <button
            onClick={currentStep === 4 ? onFinishBooking : handleNext}
            disabled={
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedDoctor) ||
              (currentStep === 3 && !selectedTime) ||
              (currentStep === 4 && (!canSubmit || isSubmitting))
            }
            className="px-6 py-3 rounded-xl bg-linear-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-600 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
          >
            {currentStep === 4 && isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                {currentStep === 4 && <span className="material-icons text-lg">check_circle</span>}
                {currentStep === 4 ? 'Confirm & Finish Booking' : 'Continue'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
