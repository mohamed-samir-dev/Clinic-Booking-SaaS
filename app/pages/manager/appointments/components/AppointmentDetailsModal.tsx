import { X, Clock, User, Calendar, Phone, Mail, FileText } from 'lucide-react';
import { Appointment } from '../types';

interface PopulatedPatient {
  phone?: string;
  email?: string;
}

interface PopulatedDoctor {
  specialty?: string | { en: string; ar: string };
}

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'تفاصيل الموعد',
    appointmentInfo: 'معلومات الموعد',
    appointmentId: 'رقم الموعد',
    status: 'الحالة',
    date: 'التاريخ',
    time: 'الوقت',
    createdAt: 'تاريخ الإنشاء',
    patientInfo: 'معلومات المريض',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    notesReason: 'ملاحظات / السبب',
    doctorInfo: 'معلومات الطبيب',
    doctorName: 'اسم الطبيب',
    specialty: 'التخصص',
    appointmentHistory: 'سجل الموعد',
    by: 'بواسطة:',
    na: 'غير متوفر',
    confirmed: 'مؤكد',
    pending: 'معلق',
    cancelled: 'ملغي',
    completed: 'مكتمل',
    rescheduled: 'تم إعادة الجدولة',
    'no-show': 'لم يحضر'
  },
  en: {
    title: 'Appointment Details',
    appointmentInfo: 'Appointment Information',
    appointmentId: 'Appointment ID',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    createdAt: 'Created At',
    patientInfo: 'Patient Information',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    email: 'Email',
    notesReason: 'Notes / Reason',
    doctorInfo: 'Doctor Information',
    doctorName: 'Doctor Name',
    specialty: 'Specialty',
    appointmentHistory: 'Appointment History',
    by: 'By:',
    na: 'N/A',
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
    'no-show': 'No-show'
  }
};

export const AppointmentDetailsModal = ({ appointment, onClose, language = 'ar' }: AppointmentDetailsModalProps) => {
  const t = translations[language];
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const getSpecialty = (specialty: string | { en: string; ar: string } | undefined) => {
    if (!specialty) return t.na;
    return typeof specialty === 'string' ? specialty : specialty[language];
  };

  const getStatusText = (status: string) => {
    return t[status as keyof typeof t] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'rescheduled': return 'bg-purple-500/20 text-purple-400';
      case 'no-show': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-white">{t.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Appointment Information */}
          <div className="bg-gray-750 rounded-xl p-4 sm:p-5 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Calendar className="text-teal-400" size={18} />
              {t.appointmentInfo}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-1 sm:col-span-2">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.appointmentId}</p>
                <p className="text-white font-medium text-sm break-all">{appointment._id}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.status}</p>
                <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.date}</p>
                <p className="text-white font-medium text-sm">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.time}</p>
                <p className="text-white font-medium text-sm">{appointment.time}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.createdAt}</p>
                <p className="text-white font-medium text-sm">{new Date(appointment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-750 rounded-xl p-4 sm:p-5 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <User className="text-teal-400" size={18} />
              {t.patientInfo}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.fullName}</p>
                <p className="text-white font-medium text-sm">{getName(appointment.patientName)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <Phone size={12} /> {t.phoneNumber}
                </p>
                <p className="text-white font-medium text-sm">
                  {appointment.patientPhone || 
                   (typeof appointment.patientId === 'object' && appointment.patientId !== null ? (appointment.patientId as PopulatedPatient).phone : null) || 
                   t.na}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <Mail size={12} /> {t.email}
                </p>
                <p className="text-white font-medium text-sm break-all">
                  {appointment.patientEmail || 
                   (typeof appointment.patientId === 'object' && appointment.patientId !== null ? (appointment.patientId as PopulatedPatient).email : null) || 
                   t.na}
                </p>
              </div>
              {(appointment.reason || appointment.patientNotes) && (
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-1 flex items-center gap-2">
                    <FileText size={12} /> {t.notesReason}
                  </p>
                  <p className="text-white text-sm">{appointment.reason || appointment.patientNotes || t.na}</p>
                </div>
              )}
            </div>
          </div>

          {/* Doctor Information */}
          <div className="bg-gray-750 rounded-xl p-4 sm:p-5 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <User className="text-teal-400" size={18} />
              {t.doctorInfo}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.doctorName}</p>
                <p className="text-white font-medium text-sm">{getName(appointment.doctorName)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.specialty}</p>
                <p className="text-white font-medium text-sm">
                  {appointment.doctorSpecialty || 
                   (typeof appointment.doctorId === 'object' && appointment.doctorId !== null ? getSpecialty((appointment.doctorId as PopulatedDoctor).specialty) : null) || 
                   t.na}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment History */}
          {appointment.history && appointment.history.length > 0 && (
            <div className="bg-gray-750 rounded-xl p-4 sm:p-5 border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Clock className="text-teal-400" size={18} />
                {t.appointmentHistory}
              </h3>
              <div className="space-y-3">
                {appointment.history.map((entry, index: number) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-700 last:border-0">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{entry.action}</p>
                      <p className="text-gray-400 text-xs">{new Date(entry.timestamp).toLocaleString()}</p>
                      {entry.by && <p className="text-gray-500 text-xs">{t.by} {entry.by}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
