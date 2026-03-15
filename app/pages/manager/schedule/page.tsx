'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { CalendarView } from './components/CalendarView';
import { DoctorFilter } from './components/DoctorFilter';
import { BlockTimeModal } from './components/BlockTimeModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WorkingHoursPanel } from './components/WorkingHoursPanel';
import toast from 'react-hot-toast';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  patientId?: string;
  patientName: string;
  patientPhone?: string;
  patientEmail?: string;
  date: string;
  time: string;
  endTime?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  reason?: string;
}

export interface BlockedSlot {
  _id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export default function SchedulePage() {
  const { locale } = useLanguage();
  const t = useTranslations('manager.schedule');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [stats, setStats] = useState({
    appointmentsToday: 0,
    availableSlots: 0,
    busyDoctors: 0,
    freeDoctors: 0
  });

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Calculate date range based on view mode
      let dateFrom: string;
      let dateTo: string;
      
      if (viewMode === 'day') {
        dateFrom = currentDate.toISOString().split('T')[0];
        dateTo = dateFrom;
      } else if (viewMode === 'week') {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        dateFrom = weekStart.toISOString().split('T')[0];
        dateTo = weekEnd.toISOString().split('T')[0];
      } else { // month
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        dateFrom = monthStart.toISOString().split('T')[0];
        dateTo = monthEnd.toISOString().split('T')[0];
      }

      const params = new URLSearchParams({
        dateFrom,
        dateTo
      });

      if (selectedDoctor !== 'all') {
        params.append('doctorId', selectedDoctor);
      }

      const [appointmentsRes, blockedRes, statsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments?${params}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/blocked-slots`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/schedule-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (appointmentsRes.ok) {
        const data = await appointmentsRes.json();
        const formattedAppointments = (data.appointments || []).map((apt: {
          _id: string;
          doctorId?: { _id: string; name?: string | Record<string, string> } | string;
          doctorName?: string | Record<string, string>;
          patientId?: { _id: string; name?: string | Record<string, string>; phone?: string; email?: string } | string;
          patientName?: string | Record<string, string>;
          guestData?: { fullName?: string | Record<string, string>; phone?: string; email?: string };
          date?: string;
          appointmentDate?: string;
          time?: string;
          startTime?: string;
          endTime?: string;
          status: string;
          reason?: string;
        }) => {
          // Helper function to extract text from multilingual objects
          const getText = (text: string | Record<string, string> | undefined) => {
            if (!text) return 'Unknown';
            if (typeof text === 'string') return text;
            return text[locale] || text.en || text.ar || 'Unknown';
          };

          return {
            _id: apt._id,
            doctorId: (typeof apt.doctorId === 'object' && apt.doctorId?._id) || (apt.doctorId as string) || '',
            doctorName: getText(apt.doctorName || (typeof apt.doctorId === 'object' && apt.doctorId?.name) || undefined),
            patientId: (typeof apt.patientId === 'object' && apt.patientId?._id) || (apt.patientId as string) || '',
            patientName: getText(apt.patientName || (typeof apt.patientId === 'object' && apt.patientId?.name) || apt.guestData?.fullName),
            patientPhone: (typeof apt.patientId === 'object' && apt.patientId?.phone) || apt.guestData?.phone || '',
            patientEmail: (typeof apt.patientId === 'object' && apt.patientId?.email) || apt.guestData?.email || '',
            date: apt.date || apt.appointmentDate || '',
            time: apt.time || apt.startTime || '',
            endTime: apt.endTime,
            status: apt.status as 'confirmed' | 'pending' | 'cancelled' | 'completed',
            reason: apt.reason
          };
        });
        setAppointments(formattedAppointments);
      }

      if (blockedRes.ok) {
        const data = await blockedRes.json();
        const getText = (text: string | Record<string, string> | undefined) => {
          if (!text) return 'Unknown';
          if (typeof text === 'string') return text;
          return text[locale] || text.en || text.ar || 'Unknown';
        };

        const formattedBlocked = (data.blockedSlots || []).map((slot: {
          _id: string;
          doctorId?: { _id: string; name?: string | Record<string, string> } | string;
          date: string;
          startTime: string;
          endTime: string;
          reason: string;
        }) => ({
          _id: slot._id,
          doctorId: (typeof slot.doctorId === 'object' && slot.doctorId?._id) || (slot.doctorId as string) || '',
          doctorName: getText((typeof slot.doctorId === 'object' && slot.doctorId?.name) || undefined),
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          reason: slot.reason
        }));
        setBlockedSlots(formattedBlocked);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(t('messages.loadError'));
    } finally {
      setLoading(false);
    }
  }, [currentDate, selectedDoctor, viewMode, locale, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReschedule = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${appointmentId}/reschedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ date: newDate, time: newTime })
      });

      if (response.ok) {
        toast.success(t('messages.rescheduleSuccess'));
        fetchData();
      }
    } catch {
      toast.error(t('messages.rescheduleFailed'));
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success(t('messages.cancelSuccess'));
        setSelectedAppointment(null);
        fetchData();
      }
    } catch {
      toast.error(t('messages.cancelFailed'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Calendar className="text-teal-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t('title')}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Statistics Cards */}
      <StatsCards stats={stats} language={locale} />

      {/* Controls */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mb-4 md:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <DoctorFilter
              selectedDoctor={selectedDoctor}
              onDoctorChange={setSelectedDoctor}
              language={locale}
            />
            
            <div className="flex gap-1 sm:gap-2 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('day')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                  viewMode === 'day' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('viewMode.day')}
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                  viewMode === 'week' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('viewMode.week')}
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                  viewMode === 'month' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('viewMode.month')}
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus size={18} />
            <span>{t('blockTimeSlot')}</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="lg:col-span-2 xl:col-span-3">
          <CalendarView
            appointments={appointments}
            blockedSlots={blockedSlots}
            viewMode={viewMode}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onAppointmentClick={(appointment: Appointment) => setSelectedAppointment(appointment)}
            onReschedule={handleReschedule}
            loading={loading}
            language={locale}
          />
        </div>

        {/* Working Hours Panel */}
        <div className="lg:col-span-1 xl:col-span-1">
          <WorkingHoursPanel language={locale} />
        </div>
      </div>

      {/* Modals */}
      {showBlockModal && (
        <BlockTimeModal
          onClose={() => setShowBlockModal(false)}
          onSuccess={fetchData}
          language={locale}
        />
      )}

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onCancel={handleCancelAppointment}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
}
