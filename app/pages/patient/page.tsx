'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useSocket } from '@/app/hooks/useSocket';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Star, Heart, ChevronRight, RefreshCw, X } from 'lucide-react';
import CancelConfirmModal from '@/app/components/patient/CancelConfirmModal';
import RescheduleModal from '@/app/components/patient/RescheduleModal';
import toast from 'react-hot-toast';

interface Appointment {
  _id: string;
  doctorId: {
    _id: string;
    name: { en: string; ar: string };
    specialty: { en: string; ar: string };
    photoUrl?: string;
    fees?: number;
  };
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  service?: string;
  reason?: string;
}

interface FavoriteDoctor {
  _id: string;
  name: { en: string; ar: string };
  specialty: { en: string; ar: string };
  photoUrl?: string;
  ratingAvg?: number;
  fees?: number;
}

const STATUS_CONFIG = {
  pending:   { label: { en: 'Pending',   ar: 'قيد الانتظار' }, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  confirmed: { label: { en: 'Confirmed', ar: 'مؤكد'         }, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'   },
  completed: { label: { en: 'Completed', ar: 'مكتمل'        }, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'       },
  cancelled: { label: { en: 'Cancelled', ar: 'ملغي'         }, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'           },
  'no-show': { label: { en: 'No Show',   ar: 'لم يحضر'      }, color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'          },
};

function AppointmentSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PatientDashboard() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { user, token } = useAppSelector((state) => state.auth);
  const isRTL = locale === 'ar';

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [favorites, setFavorites] = useState<FavoriteDoctor[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [rescheduleAppt, setRescheduleAppt] = useState<Appointment | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!token) return;
    setLoadingAppts(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || data);
      }
    } catch {
      toast.error(locale === 'ar' ? 'فشل تحميل المواعيد' : 'Failed to load appointments');
    } finally {
      setLoadingAppts(false);
    }
  }, [token, locale]);

  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    setLoadingFavs(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.data || []);
      }
    } catch {
      // silent
    } finally {
      setLoadingFavs(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAppointments();
    fetchFavorites();
  }, [fetchAppointments, fetchFavorites]);

  // Real-time updates via Socket.IO
  useSocket([
    {
      event: 'appointmentUpdated',
      handler: () => fetchAppointments(),
    },
    {
      event: 'appointmentConfirmed',
      handler: (data: unknown) => {
        const appt = data as { appointmentId: string };
        setAppointments((prev) =>
          prev.map((a) => a._id === appt.appointmentId ? { ...a, status: 'confirmed' } : a)
        );
        toast.success(locale === 'ar' ? 'تم تأكيد موعدك!' : 'Your appointment has been confirmed!');
      },
    },
    {
      event: 'appointmentCancelled',
      handler: (data: unknown) => {
        const appt = data as { appointmentId: string };
        setAppointments((prev) =>
          prev.map((a) => a._id === appt.appointmentId ? { ...a, status: 'cancelled' } : a)
        );
        toast.error(locale === 'ar' ? 'تم إلغاء موعدك' : 'Your appointment was cancelled');
      },
    },
  ]);

  const handleCancel = async () => {
    if (!cancelId || !token) return;
    setCancelLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/appointments/${cancelId}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        // Optimistic update
        setAppointments((prev) =>
          prev.map((a) => a._id === cancelId ? { ...a, status: 'cancelled' } : a)
        );
        toast.success(locale === 'ar' ? 'تم إلغاء الموعد' : 'Appointment cancelled');
        setCancelId(null);
      } else {
        toast.error(locale === 'ar' ? 'فشل الإلغاء' : 'Failed to cancel');
      }
    } catch {
      toast.error(locale === 'ar' ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleAddToCalendar = (appt: Appointment) => {
    const doctorName = typeof appt.doctorId.name === 'object'
      ? appt.doctorId.name[locale] || appt.doctorId.name.en
      : appt.doctorId.name;

    const [year, month, day] = appt.appointmentDate.split('-').map(Number);
    const [startH, startM] = appt.startTime.split(':').map(Number);
    const [endH, endM] = appt.endTime.split(':').map(Number);

    const pad = (n: number) => String(n).padStart(2, '0');
    const startStr = `${year}${pad(month)}${pad(day)}T${pad(startH)}${pad(startM)}00`;
    const endStr   = `${year}${pad(month)}${pad(day)}T${pad(endH)}${pad(endM)}00`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${doctorName}`)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(appt.reason || appt.service || '')}`;
    window.open(url, '_blank');
  };

  const now = new Date();
  const upcoming = appointments.filter((a) => {
    const d = new Date(a.appointmentDate);
    return d >= now && a.status !== 'cancelled' && a.status !== 'completed';
  });
  const past = appointments.filter((a) => {
    const d = new Date(a.appointmentDate);
    return d < now || a.status === 'completed' || a.status === 'cancelled';
  });

  const displayed = activeTab === 'upcoming' ? upcoming : past;

  const getName = (name: string | { en: string; ar: string }) =>
    typeof name === 'string' ? name : name[locale] || name.en;

  const stats = [
    { label: locale === 'ar' ? 'المواعيد القادمة' : 'Upcoming',  value: upcoming.length,    icon: Calendar, color: 'from-teal-500 to-cyan-600'    },
    { label: locale === 'ar' ? 'إجمالي المواعيد' : 'Total',      value: appointments.length, icon: Clock,    color: 'from-blue-500 to-indigo-600'   },
    { label: locale === 'ar' ? 'الأطباء المفضلون' : 'Favorites', value: favorites.length,    icon: Heart,    color: 'from-pink-500 to-rose-600'     },
  ];

  const isDark = theme === 'dark';
  const card = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-12`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 sm:px-8 py-5`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {locale === 'ar' ? `مرحباً، ${getName(user?.name || '')} 👋` : `Welcome back, ${getName(user?.name || '')} 👋`}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {locale === 'ar' ? 'إليك ملخص مواعيدك' : "Here's your appointments overview"}
            </p>
          </div>
          <Link
            href="/pages/booking"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-md"
          >
            {locale === 'ar' ? '+ حجز موعد' : '+ Book Appointment'}
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-xl border p-4 ${card}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                  <Icon size={18} className="text-white" />
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Appointments */}
        <div className={`rounded-2xl border ${card}`}>
          <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <h2 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {locale === 'ar' ? 'مواعيدي' : 'My Appointments'}
            </h2>
            <div className={`flex rounded-lg overflow-hidden border text-xs font-semibold ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              {(['upcoming', 'past'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 transition-colors ${
                    activeTab === tab
                      ? 'bg-teal-600 text-white'
                      : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'upcoming'
                    ? (locale === 'ar' ? 'القادمة' : 'Upcoming')
                    : (locale === 'ar' ? 'السابقة' : 'Past')}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {loadingAppts ? (
              <AppointmentSkeleton />
            ) : displayed.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={40} className={`mx-auto mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {locale === 'ar' ? 'لا توجد مواعيد' : 'No appointments found'}
                </p>
                {activeTab === 'upcoming' && (
                  <Link href="/pages/booking" className="inline-block mt-3 text-teal-600 text-sm font-semibold hover:underline">
                    {locale === 'ar' ? 'احجز موعدك الأول' : 'Book your first appointment'}
                  </Link>
                )}
              </div>
            ) : (
              displayed.map((appt) => {
                const status = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending;
                const doctorName = getName(appt.doctorId?.name || { en: 'Doctor', ar: 'الطبيب' });
                const specialty  = getName(appt.doctorId?.specialty || { en: '', ar: '' });
                const canCancel  = appt.status === 'pending' || appt.status === 'confirmed';
                const canReschedule = appt.status === 'pending' || appt.status === 'confirmed';
                const date = new Date(appt.appointmentDate);

                return (
                  <div key={appt._id} className={`rounded-xl border p-4 transition-all ${isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-teal-100 hover:shadow-sm'}`}>
                    <div className="flex items-start gap-3">
                      {/* Doctor Photo */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-teal-100">
                        {appt.doctorId?.photoUrl ? (
                          <Image src={appt.doctorId.photoUrl} alt={doctorName} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-bold text-lg">
                            {doctorName.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{doctorName}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{specialty}</p>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${status.color}`}>
                            {status.label[locale]}
                          </span>
                        </div>

                        <div className={`flex items-center gap-3 mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {appt.startTime}
                          </span>
                          {appt.doctorId?.fees && (
                            <span className="font-semibold text-teal-600">${appt.doctorId.fees}</span>
                          )}
                        </div>

                        {/* Actions */}
                        {(canCancel || canReschedule) && (
                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <button
                              onClick={() => handleAddToCalendar(appt)}
                              className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                            >
                              <Calendar size={12} />
                              {locale === 'ar' ? 'أضف للتقويم' : 'Add to Calendar'}
                            </button>
                            {canReschedule && (
                              <button
                                onClick={() => setRescheduleAppt(appt)}
                                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors"
                              >
                                <RefreshCw size={12} />
                                {locale === 'ar' ? 'إعادة جدولة' : 'Reschedule'}
                              </button>
                            )}
                            {canCancel && (
                              <button
                                onClick={() => setCancelId(appt._id)}
                                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              >
                                <X size={12} />
                                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Favorite Doctors */}
        {!loadingFavs && favorites.length > 0 && (
          <div className={`rounded-2xl border ${card}`}>
            <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className={`font-bold text-base flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Heart size={16} className="text-pink-500" />
                {locale === 'ar' ? 'الأطباء المفضلون' : 'Favorite Doctors'}
              </h2>
              <Link href="/pages/doctors" className="text-teal-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                {locale === 'ar' ? 'عرض الكل' : 'View All'} <ChevronRight size={14} />
              </Link>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favorites.slice(0, 4).map((doc) => (
                <Link key={doc._id} href={`/pages/doctors/${doc._id}`}>
                  <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-teal-100 hover:shadow-sm'}`}>
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      {doc.photoUrl ? (
                        <Image src={doc.photoUrl} alt={getName(doc.name)} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                          {getName(doc.name).charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{getName(doc.name)}</p>
                      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{getName(doc.specialty)}</p>
                      {doc.ratingAvg && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-yellow-600 font-medium">{doc.ratingAvg.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {doc.fees && <p className="text-xs font-bold text-teal-600">${doc.fees}</p>}
                      <Link
                        href={`/pages/booking?doctorId=${doc._id}`}
                        className="text-[10px] text-teal-600 hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {locale === 'ar' ? 'احجز' : 'Book'}
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/pages/booking',        icon: Calendar, label: locale === 'ar' ? 'حجز موعد'       : 'Book Appointment', color: 'from-teal-500 to-cyan-600'   },
            { href: '/pages/doctors',         icon: User,     label: locale === 'ar' ? 'تصفح الأطباء'   : 'Browse Doctors',   color: 'from-blue-500 to-indigo-600' },
            { href: '/pages/patient/profile', icon: User,     label: locale === 'ar' ? 'ملفي الشخصي'    : 'My Profile',       color: 'from-purple-500 to-pink-600' },
            { href: '/pages/services',        icon: Star,     label: locale === 'ar' ? 'الخدمات الطبية' : 'Medical Services', color: 'from-orange-500 to-amber-600'},
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`rounded-xl border p-4 text-center cursor-pointer transition-all hover:shadow-md ${card}`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {cancelId && (
        <CancelConfirmModal
          onConfirm={handleCancel}
          onClose={() => setCancelId(null)}
          loading={cancelLoading}
        />
      )}

      {rescheduleAppt && (
        <RescheduleModal
          appointmentId={rescheduleAppt._id}
          doctorId={rescheduleAppt.doctorId._id}
          currentDate={rescheduleAppt.appointmentDate}
          currentStartTime={rescheduleAppt.startTime}
          currentEndTime={rescheduleAppt.endTime}
          onClose={() => setRescheduleAppt(null)}
          onSuccess={() => {
            fetchAppointments();
            setRescheduleAppt(null);
          }}
        />
      )}
    </div>
  );
}
