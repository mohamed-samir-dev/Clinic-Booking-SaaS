import Image from 'next/image';
import { Doctor } from '@/app/types/index';
import { useTheme } from '@/app/contexts/ThemeContext';

interface BookingSummaryProps {
  doctorObject: Doctor | null;
  selectedService: string;
  consultationDuration: number;
  selectedDate: Date | null;
  selectedTime: string;
}

export default function BookingSummary({
  doctorObject,
  selectedService,
  consultationDuration,
  selectedDate,
  selectedTime
}: BookingSummaryProps) {
  const { theme } = useTheme();
  return (
    <div className="lg:col-span-1">
      <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Booking Summary</h3>
        
        {doctorObject ? (
          <>
            <div className={`mb-4 sm:mb-6 pb-4 sm:pb-6 border-b ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                {doctorObject.photoUrl ? (
                  <Image src={doctorObject.photoUrl} alt={doctorObject.name.en} width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-xl">
                    {doctorObject.name.en.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm sm:text-base truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{doctorObject.name.en}</h4>
                  <p className={`text-xs sm:text-sm mb-1 truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{doctorObject.specialty.en}</p>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <span className="material-icons text-yellow-500 text-sm sm:text-base">star</span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{doctorObject.ratingAvg?.toFixed(1) || '4.8'}</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>({doctorObject.ratingCount || 0})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center gap-2">
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Service</p>
                <p className={`font-semibold text-right text-xs sm:text-sm truncate max-w-[60%] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{selectedService || 'General Consultation'}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Duration</p>
                <p className={`font-semibold text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{consultationDuration} Minutes</p>
              </div>
              <div className="flex justify-between items-start gap-2">
                <p className={`text-xs sm:text-sm shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                <p className={`font-semibold text-right text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Time</p>
                <p className={`font-semibold text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{selectedTime || 'Select a time'}</p>
              </div>
            </div>

            <div className={`pt-3 sm:pt-4 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Cost</span>
                <span className="text-xl sm:text-2xl font-bold text-teal-600">${doctorObject.fees || 150}.00</span>
              </div>
            </div>
          </>
        ) : (
          <div className={`text-center py-6 sm:py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="material-icons text-3xl sm:text-4xl mb-2">event_busy</span>
            <p className="text-sm sm:text-base">Please select a doctor first</p>
          </div>
        )}
      </div>

      {doctorObject && (
        <div className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl mt-3 sm:mt-4 border ${
          theme === 'dark' ? 'bg-blue-900/30 border-blue-800' : 'bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100'
        }`}>
          <span className="material-icons text-blue-500 text-base sm:text-lg mt-0.5 shrink-0">info</span>
          <div className="flex-1 space-y-1.5 sm:space-y-2">
            <p className={`text-[10px] sm:text-xs font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Booking Information</p>
            <p className={`text-[10px] sm:text-xs font-semibold leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              You can reschedule or cancel your appointment up to 24 hours before the scheduled time.
            </p>
            <p className={`text-[10px] sm:text-xs font-semibold leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              To modify or cancel your booking, you must be logged in or have an account on the website.
            </p>
            <p className={`text-[10px] sm:text-xs font-semibold leading-relaxed italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Creating an account is not required when making your initial booking, but it is required to manage or follow up on your appointments later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
