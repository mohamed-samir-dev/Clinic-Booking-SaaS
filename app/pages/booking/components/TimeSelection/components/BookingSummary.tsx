import Image from 'next/image';
import { Doctor } from '@/app/types/index';

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
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
        
        {doctorObject ? (
          <>
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                {doctorObject.photoUrl ? (
                  <Image src={doctorObject.photoUrl} alt={doctorObject.name.en} width={64} height={64} className="w-16 h-16 rounded-xl object-cover" />
                ) : (
                  <div className="w-16 h-16 bg-linear-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {doctorObject.name.en.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{doctorObject.name.en}</h4>
                  <p className="text-sm text-gray-500 mb-1">{doctorObject.specialty.en}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-icons text-yellow-500 text-base">star</span>
                    <span className="font-semibold text-gray-900">{doctorObject.ratingAvg?.toFixed(1) || '4.8'}</span>
                    <span className="text-gray-500">({doctorObject.ratingCount || 0} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-semibold text-gray-900 text-right">{selectedService || 'General Consultation'}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{consultationDuration} Minutes</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-900 text-right">
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-900">{selectedTime || 'Select a time'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Cost</span>
                <span className="text-2xl font-bold text-teal-600">${doctorObject.fees || 150}.00</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <span className="material-icons text-4xl mb-2">event_busy</span>
            <p>Please select a doctor first</p>
          </div>
        )}
      </div>

      {doctorObject && (
        <div className="flex items-start gap-3 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl mt-4 border border-blue-100">
          <span className="material-icons text-blue-500 text-lg mt-0.5">info</span>
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold text-blue-700">Booking Information</p>
            <p className="text-xs font-semibold leading-relaxed text-gray-700">
              You can reschedule or cancel your appointment up to 24 hours before the scheduled time.
            </p>
            <p className="text-xs font-semibold leading-relaxed text-gray-700">
              To modify or cancel your booking, you must be logged in or have an account on the website.
            </p>
            <p className="text-xs font-semibold  leading-relaxed text-gray-600 italic">
              Creating an account is not required when making your initial booking, but it is required to manage or follow up on your appointments later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
