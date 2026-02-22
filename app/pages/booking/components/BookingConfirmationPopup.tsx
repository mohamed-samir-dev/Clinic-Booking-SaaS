'use client';
import { useRef } from 'react';
import Image from 'next/image';

interface BookingConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    appointmentId: string;
    doctor: {
      name: string;
      specialty: string;
      photoUrl?: string;
    };
    patient: {
      fullName: string;
      email: string;
      phone: string;
    };
    appointmentDate: string;
    startTime: string;
    endTime: string;
    service: string;
    fee: number;
    status: string;
  };
}

export default function BookingConfirmationPopup({ isOpen, onClose, bookingData }: BookingConfirmationPopupProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Confirmation - ${bookingData.appointmentId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #14b8a6; margin: 0; }
            .section { margin: 20px 0; }
            .section h2 { color: #1f2937; border-bottom: 2px solid #14b8a6; padding-bottom: 5px; }
            .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .label { font-weight: bold; color: #6b7280; }
            .value { color: #1f2937; }
            .footer { margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div ref={printRef} className="p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="material-icons text-white text-3xl">check_circle</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h1>
            <p className="text-gray-600 text-xs">ID: <span className="font-semibold text-teal-600">{bookingData.appointmentId}</span></p>
          </div>

          {/* Doctor & Patient in Row */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Doctor Info */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1 mb-2">
                <span className="material-icons text-teal-600 text-lg">person</span>
                Doctor
              </h2>
              <div className="flex items-center gap-2">
                {bookingData.doctor.photoUrl ? (
                  <Image src={bookingData.doctor.photoUrl} alt={bookingData.doctor.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                    {bookingData.doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">{bookingData.doctor.name}</p>
                  <p className="text-xs text-gray-500">{bookingData.doctor.specialty}</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1 mb-2">
                <span className="material-icons text-teal-600 text-lg">badge</span>
                Patient
              </h2>
              <div className="space-y-1">
                <p className="text-xs text-gray-900 font-semibold">{bookingData.patient.fullName}</p>
                <p className="text-xs text-gray-600">{bookingData.patient.email}</p>
                <p className="text-xs text-gray-600">{bookingData.patient.phone}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1 mb-2">
              <span className="material-icons text-teal-600 text-lg">event</span>
              Appointment Details
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Service:</span>
                <span className="text-xs font-semibold text-gray-900">{bookingData.service || 'Consultation'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Fee:</span>
                <span className="text-sm font-bold text-teal-600">${bookingData.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Date:</span>
                <span className="text-xs font-semibold text-gray-900">{new Date(bookingData.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Time:</span>
                <span className="text-xs font-semibold text-gray-900">{bookingData.startTime}</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-xs text-gray-600">Status:</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">{bookingData.status}</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1 mb-2">
              <span className="material-icons text-blue-600 text-lg">info</span>
              Important Info
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Arrive 10 minutes early</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Bring medical records if available</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Cancel/reschedule 24 hours in advance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-4 bg-gray-50 border-t">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span className="material-icons text-lg">print</span>
            Print
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
