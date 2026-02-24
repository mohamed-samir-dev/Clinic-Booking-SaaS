'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

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
  const { theme } = useTheme();
  const { locale } = useLanguage();
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
          <title>${locale === 'ar' ? 'تأكيد الحجز' : 'Booking Confirmation'} - ${bookingData.appointmentId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; direction: ${locale === 'ar' ? 'rtl' : 'ltr'}; }
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
      <div className={`rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div ref={printRef} className="p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="material-icons text-white text-3xl">check_circle</span>
            </div>
            <h1 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{locale === 'ar' ? 'تم تأكيد الحجز!' : 'Booking Confirmed!'}</h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'رقم الحجز:' : 'ID:'} <span className="font-semibold text-teal-600">{bookingData.appointmentId}</span></p>
          </div>

          {/* Doctor & Patient in Row */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Doctor Info */}
            <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className={`text-sm font-semibold flex items-center gap-1 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="material-icons text-teal-600 text-lg">person</span>
                {locale === 'ar' ? 'الطبيب' : 'Doctor'}
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
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bookingData.doctor.name}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{bookingData.doctor.specialty}</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className={`text-sm font-semibold flex items-center gap-1 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="material-icons text-teal-600 text-lg">badge</span>
                {locale === 'ar' ? 'المريض' : 'Patient'}
              </h2>
              <div className="space-y-1">
                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bookingData.patient.fullName}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{bookingData.patient.email}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{bookingData.patient.phone}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className={`rounded-lg p-3 mb-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h2 className={`text-sm font-semibold flex items-center gap-1 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <span className="material-icons text-teal-600 text-lg">event</span>
              {locale === 'ar' ? 'تفاصيل الموعد' : 'Appointment Details'}
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'الخدمة:' : 'Service:'}</span>
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bookingData.service || (locale === 'ar' ? 'استشارة' : 'Consultation')}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'الرسوم:' : 'Fee:'}</span>
                <span className="text-sm font-bold text-teal-600">${bookingData.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'التاريخ:' : 'Date:'}</span>
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{new Date(bookingData.appointmentDate).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'الوقت:' : 'Time:'}</span>
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bookingData.startTime}</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'الحالة:' : 'Status:'}</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">{locale === 'ar' ? 'قيد الانتظار' : bookingData.status}</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50'}`}>
            <h3 className={`text-sm font-semibold flex items-center gap-1 mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-900'}`}>
              <span className="material-icons text-blue-600 text-lg">info</span>
              {locale === 'ar' ? 'معلومات مهمة' : 'Important Info'}
            </h3>
            <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{locale === 'ar' ? 'احضر قبل 10 دقائق من الموعد' : 'Arrive 10 minutes early'}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{locale === 'ar' ? 'أحضر السجلات الطبية إن وجدت' : 'Bring medical records if available'}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{locale === 'ar' ? 'الإلغاء/إعادة الجدولة قبل 24 ساعة' : 'Cancel/reschedule 24 hours in advance'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 p-4 border-t ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span className="material-icons text-lg">print</span>
            {locale === 'ar' ? 'طباعة' : 'Print'}
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 px-4 border rounded-lg font-semibold transition-colors text-sm ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {locale === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
