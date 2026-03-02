'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface Appointment {
  id: string;
  patientName: string | { en: string; ar: string };
  bookingType: string;
  time: string;
  status: string;
  createdAt?: string;
  requestedAgo?: string;
}

interface RootState {
  auth: {
    user: { name?: string | { en: string; ar: string } } | null;
    token: string | null;
  };
}

export default function DoctorPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctor.dashboard;
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  // Helper function to extract text from multilingual objects
  const getText = (value: string | { en: string; ar: string } | undefined): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value[locale] || value.en || value.ar || '';
    }
    return String(value || '');
  };
  
  // Helper function to get first name
  const getFirstName = (name: string | { en: string; ar: string } | undefined): string => {
    const fullName = typeof name === 'string' ? name : name?.[locale] || name?.en || 'Doctor';
    const parts = fullName.split(' ');
    // If name starts with "د." or "Dr.", return the second part, otherwise return first part
    return parts[0] === 'د.' || parts[0] === 'Dr.' ? (parts[1] || parts[0]) : parts[0];
  };
  
  const [stats, setStats] = useState([
    { icon: 'event_available', label: t.todayAppointments, value: '0', color: 'from-blue-500 to-blue-600' },
    { icon: 'pending_actions', label: t.pendingRequests, value: '0', color: 'from-orange-500 to-orange-600' },
    { icon: 'calendar_month', label: t.totalAppointments, value: '0', color: 'from-purple-500 to-purple-600' },
    { icon: 'payments', label: t.monthlyRevenue, value: '$0', color: 'from-green-500 to-green-600' },
    { icon: 'star', label: t.averageRating, value: '0.0', color: 'from-yellow-500 to-yellow-600' },
  ]);

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [newRequests, setNewRequests] = useState<Appointment[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor-stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        
        if (data.todayAppointments !== undefined) {
          setStats([
            { icon: 'event_available', label: t.todayAppointments, value: data.todayAppointments.toString(), color: 'from-blue-500 to-blue-600' },
            { icon: 'pending_actions', label: t.pendingRequests, value: data.pendingRequests.toString(), color: 'from-orange-500 to-orange-600' },
            { icon: 'calendar_month', label: t.totalAppointments, value: data.totalAppointments.toString(), color: 'from-purple-500 to-purple-600' },
            { icon: 'payments', label: t.monthlyRevenue, value: `$${data.monthlyRevenue.toLocaleString()}`, color: 'from-green-500 to-green-600' },
            { icon: 'star', label: t.averageRating, value: data.averageRating, color: 'from-yellow-500 to-yellow-600' },
          ]);
          setPendingCount(data.pendingRequests);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchTodayAppointments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/today`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        setTodayAppointments(data.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/pending`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          if (response.status !== 429) {
            console.error('Failed to fetch pending requests:', response.status);
          }
          return;
        }
        
        const data = await response.json();
        const requests = data.requests || [];
        setNewRequests(requests.slice(0, 3));
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchStats();
    fetchTodayAppointments();
    fetchPendingRequests();

    const handleAppointmentUpdate = () => {
      fetchStats();
      fetchTodayAppointments();
      fetchPendingRequests();
    };

    window.addEventListener('appointmentUpdated', handleAppointmentUpdate);
    return () => window.removeEventListener('appointmentUpdated', handleAppointmentUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={`h-screen overflow-y-auto transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-linear-to-br from-gray-50 via-white to-teal-50/30'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-xl border-b px-3 sm:px-6 py-3 sm:py-4 relative z-40 ${
        theme === 'dark'
          ? 'bg-gray-800/80 border-gray-700/50'
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className={`text-lg sm:text-2xl font-bold truncate ${
              theme === 'dark'
                ? 'text-teal-400'
                : 'bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'
            }`}>
              {t.welcomeBack} {getFirstName(user?.name)}! 👋
            </h1>
            <p className={`text-xs sm:text-sm mt-1 font-medium hidden sm:block ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 relative z-50">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-1.5 sm:p-2 rounded-xl transition-all shadow-sm hover:shadow-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-linear-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100'
                }`}
              >
                <span className={`material-icons text-base sm:text-lg ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}>notifications</span>
                {pendingCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {pendingCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className={`fixed sm:absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 ${locale === 'ar' ? 'sm:left-0' : 'sm:right-0'} top-16 sm:top-full mt-0 sm:mt-2 w-[90vw] sm:w-80 max-w-sm rounded-xl shadow-xl border z-9999 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                  <div className={`p-3 border-b ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <h3 className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{t.newBookingRequests}</h3>
                    <p className={`text-xs mt-0.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{pendingCount} {t.pendingRequestsCount}</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {newRequests.length > 0 ? (
                      newRequests.map((request) => (
                        <div key={request.id} className={`p-3 border-b transition-colors ${
                          theme === 'dark'
                            ? 'border-gray-700 hover:bg-gray-700/50'
                            : 'border-gray-50 hover:bg-gray-50'
                        }`}>
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
                              <span className="material-icons text-white text-sm">person</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-bold truncate ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{getText(request.patientName)}</h4>
                              <p className={`text-xs mt-0.5 flex items-center gap-1 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                <span className="material-icons text-xs">schedule</span>
                                <span className="truncate">{request.time}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500 whitespace-nowrap">{request.requestedAgo}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <span className="material-icons text-3xl text-gray-300">inbox</span>
                        <p className="text-sm text-gray-500 mt-2">{t.noNewRequestsInbox}</p>
                      </div>
                    )}
                  </div>
                  <div className={`p-2 border-t ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <Link href="/pages/doctor/requests" onClick={() => setShowNotifications(false)}>
                      <button className={`w-full text-center text-sm font-bold py-1.5 ${
                        theme === 'dark'
                          ? 'text-teal-400 hover:text-teal-300'
                          : 'text-teal-600 hover:text-teal-700'
                      }`}>
                        {t.viewAllRequests}
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/pages/doctor/profile">
              <button className={`p-1.5 sm:p-2 rounded-xl transition-all shadow-sm hover:shadow-md ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-linear-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200'
              }`}>
                <span className={`material-icons text-base sm:text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>settings</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 mb-3 sm:mb-5">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group relative rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-teal-50/0 to-cyan-50/0"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-white text-base sm:text-xl">{stat.icon}</span>
                  </div>
                </div>
                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>{stat.label}</p>
                <h3 className={`text-lg sm:text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
          {/* Live Patient Flow Card - Takes 2 columns */}
          <div className={`lg:col-span-2 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-3 sm:mb-5 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md shrink-0">
                  <span className="material-icons text-white text-base sm:text-xl">groups</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm sm:text-lg font-bold truncate ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t.livePatientFlow}</h3>
                  <p className={`text-xs sm:text-sm font-medium mt-0.5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <span className={`font-bold ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}>{todayAppointments.length}</span> {t.patientsToday}
                  </p>
                </div>
              </div>
              <Link 
                href="/pages/doctor/schedule" 
                className="px-2 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1 shrink-0"
              >
                <span className="hidden sm:inline">{t.viewSchedule}</span>
                <span className="sm:hidden">{t.view}</span>
                <span className="material-icons text-xs sm:text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="space-y-2 sm:space-y-2.5 max-h-[300px] sm:max-h-[420px] overflow-y-auto pr-1 sm:pr-2">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => {
                  const statusConfig: Record<string, {
                    label: string;
                    location: string;
                    bgColor: string;
                    borderColor: string;
                    iconBg: string;
                    textColor: string;
                    button: boolean;
                  }> = {
                    confirmed: { 
                      label: t.checkedIn, 
                      location: t.waitingRoom,
                      bgColor: 'from-teal-50 to-cyan-50',
                      borderColor: 'border-teal-200',
                      iconBg: 'from-teal-500 to-cyan-600',
                      textColor: 'text-teal-700',
                      button: true
                    },
                    pending: { 
                      label: t.inConsultation, 
                      location: `${t.room} 2`,
                      bgColor: 'from-blue-50 to-indigo-50',
                      borderColor: 'border-blue-200',
                      iconBg: 'from-blue-500 to-indigo-600',
                      textColor: 'text-blue-700',
                      button: false
                    },
                    completed: { 
                      label: t.discharged, 
                      location: t.processed,
                      bgColor: 'from-gray-50 to-slate-50',
                      borderColor: 'border-gray-200',
                      iconBg: 'from-gray-500 to-slate-600',
                      textColor: 'text-gray-700',
                      button: false
                    }
                  };
                  
                  const config = statusConfig[appointment.status] || statusConfig.pending;
                  
                  return (
                    <div 
                      key={appointment.id}
                      className={`group bg-linear-to-br ${config.bgColor} rounded-lg sm:rounded-xl border ${config.borderColor}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4">
                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br ${config.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                          <span className="material-icons text-white text-base sm:text-xl">person</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 truncate ${
                            theme === 'dark' ? 'text-black' : 'text-gray-900'
                          }`}>{getText(appointment.patientName)}</h4>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap">
                            <span className={`font-bold ${config.textColor} px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-white/60 text-[10px] sm:text-sm`}>
                              {config.label}
                            </span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className={`font-medium hidden sm:inline ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>{config.location}</span>
                            <span className={`hidden sm:inline ${
                              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                            }`}>•</span>
                            <span className={`font-bold ${
                              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                            }`}>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm">
                    <span className="material-icons text-3xl text-gray-300">event_busy</span>
                  </div>
                  <p className="text-sm font-bold text-gray-500">{t.noPatientsToday}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.scheduleIsClear}</p>
                </div>
              )}
            </div>
          </div>

          {/* New Requests Card - Takes 1 column */}
          <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-3 sm:mb-5 gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shrink-0">
                  <span className="material-icons text-white text-base sm:text-lg">notification_important</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm sm:text-base font-bold truncate ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t.newRequests}</h3>
                  <p className={`text-[10px] sm:text-xs font-medium mt-0.5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{t.latestAppointments}</p>
                </div>
              </div>
              <Link 
                href="/pages/doctor/requests" 
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg text-[10px] sm:text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1 shrink-0"
              >
                <span className="hidden sm:inline">{t.viewAll}</span>
                <span className="sm:hidden">{t.all}</span>
                <span className="material-icons text-xs sm:text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="space-y-2 sm:space-y-2.5 max-h-[300px] sm:max-h-[420px] overflow-y-auto pr-1 sm:pr-2">
              {newRequests.length > 0 ? (
                <>
                  {newRequests.map((request) => (
                    <div 
                      key={request.id}
                      className="group bg-linear-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-orange-200"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0 shadow-md">
                          <span className="material-icons text-white text-base sm:text-lg">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-xs sm:text-sm truncate ${
                            theme === 'dark' ? 'text-gray-900' : 'text-gray-900'
                          }`}>{getText(request.patientName)}</h4>
                          <div className={`flex items-center gap-1 text-[10px] sm:text-xs mt-0.5 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <span className="material-icons text-[10px] sm:text-xs">schedule</span>
                            <span className="font-medium truncate">{request.requestedAgo}</span>
                          </div>
                        </div>
                      </div>
                    
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm">
                    <span className="material-icons text-3xl text-gray-300">inbox</span>
                  </div>
                  <p className="text-sm font-bold text-gray-500">{t.noNewRequests}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.allCaughtUp}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-y: scroll;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f1f1;
        }
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
