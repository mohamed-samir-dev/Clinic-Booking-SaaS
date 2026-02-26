'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  // Helper function to extract text from multilingual objects
  const getText = (value: string | { en: string; ar: string } | undefined): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value.en || value.ar || '';
    }
    return String(value || '');
  };
  
  const [stats, setStats] = useState([
    { icon: 'event_available', label: "Today's Appointments", value: '0', color: 'from-blue-500 to-blue-600' },
    { icon: 'pending_actions', label: 'Pending Requests', value: '0', color: 'from-orange-500 to-orange-600' },
    { icon: 'calendar_month', label: 'Total Appointments', value: '0', color: 'from-purple-500 to-purple-600' },
    { icon: 'payments', label: 'Monthly Revenue', value: '$0', color: 'from-green-500 to-green-600' },
    { icon: 'star', label: 'Average Rating', value: '0.0', color: 'from-yellow-500 to-yellow-600' },
  ]);

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [newRequests, setNewRequests] = useState<Appointment[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        
        if (data.todayAppointments !== undefined) {
          setStats([
            { icon: 'event_available', label: "Today's Appointments", value: data.todayAppointments.toString(), color: 'from-blue-500 to-blue-600' },
            { icon: 'pending_actions', label: 'Pending Requests', value: data.pendingRequests.toString(), color: 'from-orange-500 to-orange-600' },
            { icon: 'calendar_month', label: 'Total Appointments', value: data.totalAppointments.toString(), color: 'from-purple-500 to-purple-600' },
            { icon: 'payments', label: 'Monthly Revenue', value: `$${data.monthlyRevenue.toLocaleString()}`, color: 'from-green-500 to-green-600' },
            { icon: 'star', label: 'Average Rating', value: data.averageRating, color: 'from-yellow-500 to-yellow-600' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchTodayAppointments = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/today`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        setTodayAppointments(data.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchPendingRequests = async () => {
      if (!token) {
        console.warn('No token available for fetching pending requests');
        return;
      }
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/pending`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            console.error('Authentication failed. Please log in again.');
          } else {
            console.error('Failed to fetch pending requests:', response.status);
          }
          return;
        }
        
        const data = await response.json();
        const requests = data.requests || [];
        setNewRequests(requests.slice(0, 3));
        setPendingCount(requests.length);
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
  }, [token]);

  return (
    <div className="h-screen overflow-y-auto bg-linear-to-br from-gray-50 via-white to-teal-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 relative z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome back, Dr. {getText(user?.name).split(' ')[0] || 'Doctor'}! 👋
            </h1>
            <p className="text-sm text-gray-600 mt-1 font-medium">Here&rsquo;s what&rsquo;s happening with your practice today</p>
          </div>
          <div className="flex items-center gap-2 relative z-50">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-linear-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all shadow-sm hover:shadow-md"
              >
                <span className="material-icons text-teal-600 text-lg">notifications</span>
                {pendingCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {pendingCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-9999">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900">New Booking Requests</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{pendingCount} pending requests</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {newRequests.length > 0 ? (
                      newRequests.map((request) => (
                        <div key={request.id} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
                              <span className="material-icons text-white text-sm">person</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 truncate">{getText(request.patientName)}</h4>
                              <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
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
                        <p className="text-sm text-gray-500 mt-2">No new requests</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <Link href="/pages/doctor/requests" onClick={() => setShowNotifications(false)}>
                      <button className="w-full text-center text-sm font-bold text-teal-600 hover:text-teal-700 py-1.5">
                        View All Requests
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <button className="p-2 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all shadow-sm hover:shadow-md">
              <span className="material-icons text-gray-600 text-lg">settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-teal-50/0 to-cyan-50/0"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-white text-xl">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Live Patient Flow Card - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
                  <span className="material-icons text-white text-xl">groups</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Live Patient Flow</h3>
                  <p className="text-sm text-gray-600 font-medium mt-0.5">
                    <span className="text-teal-600 font-bold">{todayAppointments.length}</span> patients today
                  </p>
                </div>
              </div>
              <Link 
                href="/pages/doctor/schedule" 
                className="px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
              >
                View Schedule
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
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
                      label: 'Checked-in', 
                      location: 'Waiting Room',
                      bgColor: 'from-teal-50 to-cyan-50',
                      borderColor: 'border-teal-200',
                      iconBg: 'from-teal-500 to-cyan-600',
                      textColor: 'text-teal-700',
                      button: true
                    },
                    pending: { 
                      label: 'In Consultation', 
                      location: 'Room 2',
                      bgColor: 'from-blue-50 to-indigo-50',
                      borderColor: 'border-blue-200',
                      iconBg: 'from-blue-500 to-indigo-600',
                      textColor: 'text-blue-700',
                      button: false
                    },
                    completed: { 
                      label: 'Discharged', 
                      location: 'Processed',
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
                      className={`group bg-linear-to-br ${config.bgColor} rounded-xl border ${config.borderColor}`}
                    >
                      <div className="flex items-center gap-3 p-4">
                        <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${config.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                          <span className="material-icons text-white text-xl">person</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-base mb-1">{getText(appointment.patientName)}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`font-bold ${config.textColor} px-2.5 py-0.5 rounded-lg bg-white/60`}>
                              {config.label}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 font-medium">{config.location}</span>
                            <span className="text-gray-400">•</span>
                            <span className="font-bold text-teal-600">{appointment.time}</span>
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
                  <p className="text-sm font-bold text-gray-500">No patients today</p>
                  <p className="text-xs text-gray-400 mt-0.5">Your schedule is clear</p>
                </div>
              )}
            </div>
          </div>

          {/* New Requests Card - Takes 1 column */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
                  <span className="material-icons text-white text-lg">notification_important</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">New Requests</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Latest appointments</p>
                </div>
              </div>
              <Link 
                href="/pages/doctor/requests" 
                className="px-3 py-2 bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
              >
                View All
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
              {newRequests.length > 0 ? (
                <>
                  {newRequests.map((request) => (
                    <div 
                      key={request.id}
                      className="group bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-200"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0 shadow-md">
                          <span className="material-icons text-white text-lg">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm">{getText(request.patientName)}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <span className="material-icons text-xs">schedule</span>
                            <span className="font-medium">{request.requestedAgo}</span>
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
                  <p className="text-sm font-bold text-gray-500">No new requests</p>
                  <p className="text-xs text-gray-400 mt-0.5">All caught up!</p>
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
