import { Check, X, Eye, Calendar, UserX } from 'lucide-react';
import {AppointmentsTableProps}from '../types'

type Language = 'ar' | 'en';

const translations = {
  ar: {
    patient: 'المريض',
    doctor: 'الطبيب',
    date: 'التاريخ',
    time: 'الوقت',
    status: 'الحالة',
    actions: 'الإجراءات',
    loading: 'جاري تحميل المواعيد...',
    noAppointments: 'لم يتم العثور على مواعيد',
    view: 'عرض',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    reschedule: 'إعادة الجدولة',
    noShow: 'لم يحضر',
    confirmed: 'مؤكد',
    pending: 'معلق',
    cancelled: 'ملغي',
    completed: 'مكتمل',
    rescheduled: 'تم إعادة الجدولة',
    'no-show': 'لم يحضر',
    viewDetails: 'عرض التفاصيل',
    confirmTitle: 'تأكيد',
    cancelTitle: 'إلغاء',
    rescheduleTitle: 'إعادة الجدولة',
    noShowTitle: 'وضع علامة لم يحضر'
  },
  en: {
    patient: 'Patient',
    doctor: 'Doctor',
    date: 'Date',
    time: 'Time',
    status: 'Status',
    actions: 'Actions',
    loading: 'Loading appointments...',
    noAppointments: 'No appointments found',
    view: 'View',
    confirm: 'Confirm',
    cancel: 'Cancel',
    reschedule: 'Reschedule',
    noShow: 'No-show',
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
    'no-show': 'No-show',
    viewDetails: 'View Details',
    confirmTitle: 'Confirm',
    cancelTitle: 'Cancel',
    rescheduleTitle: 'Reschedule',
    noShowTitle: 'Mark as No-show'
  }
};

interface ExtendedAppointmentsTableProps extends AppointmentsTableProps {
  language: Language;
}

export const AppointmentsTable = ({ appointments, loading, onConfirm, onCancel, onView, onReschedule, onNoShow, language }: ExtendedAppointmentsTableProps) => {
  const t = translations[language];
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

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

  const getStatusText = (status: string) => {
    return t[status as keyof typeof t] || status;
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Mobile Card View */}
      <div className="block md:hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
            <p className="text-gray-400 mt-4 text-sm">{t.loading}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            {t.noAppointments}
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {appointments.map((apt) => (
              <div key={apt._id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{getName(apt.patientName)}</p>
                    <p className="text-gray-400 text-xs mt-1">{getName(apt.doctorName)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(apt.status)}`}>
                    {getStatusText(apt.status)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <span>{new Date(apt.date).toLocaleDateString()}</span>
                  <span>{apt.time}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onView(apt)}
                    className="flex-1 min-w-[80px] p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                  >
                    <Eye size={14} />
                    <span>{t.view}</span>
                  </button>
                  
                  {apt.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onConfirm(apt._id)}
                        className="flex-1 min-w-[80px] p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                      >
                        <Check size={14} />
                        <span>{t.confirm}</span>
                      </button>
                      <button
                        onClick={() => onCancel(apt._id)}
                        className="flex-1 min-w-[80px] p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                      >
                        <X size={14} />
                        <span>{t.cancel}</span>
                      </button>
                    </>
                  )}
                  
                  {apt.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => onReschedule(apt)}
                        className="flex-1 min-w-[80px] p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                      >
                        <Calendar size={14} />
                        <span>{t.reschedule}</span>
                      </button>
                      <button
                        onClick={() => onCancel(apt._id)}
                        className="flex-1 min-w-[80px] p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                      >
                        <X size={14} />
                        <span>{t.cancel}</span>
                      </button>
                      <button
                        onClick={() => onNoShow(apt._id)}
                        className="flex-1 min-w-[80px] p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors text-xs text-white flex items-center justify-center gap-1"
                      >
                        <UserX size={14} />
                        <span>{t.noShow}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.patient}</th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.doctor}</th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.date}</th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.time}</th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.status}</th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
                  <p className="text-gray-400 mt-4">{t.loading}</p>
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  {t.noAppointments}
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-white text-sm">{getName(apt.patientName)}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-white text-sm">{getName(apt.doctorName)}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-300 text-sm">{new Date(apt.date).toLocaleDateString()}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-300 text-sm">{apt.time}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {getStatusText(apt.status)}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(apt)}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        title={t.viewDetails}
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onConfirm(apt._id)}
                            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            title={t.confirmTitle}
                          >
                            <Check size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onCancel(apt._id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            title={t.cancelTitle}
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </>
                      )}
                      
                      {apt.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => onReschedule(apt)}
                            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                            title={t.rescheduleTitle}
                          >
                            <Calendar size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onCancel(apt._id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            title={t.cancelTitle}
                          >
                            <X size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onNoShow(apt._id)}
                            className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                            title={t.noShowTitle}
                          >
                            <UserX size={16} className="text-white" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
