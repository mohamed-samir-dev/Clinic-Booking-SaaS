'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Search, Plus, Clock, LayoutGrid, LayoutList } from 'lucide-react';
import { AppointmentsTable } from './components/AppointmentsTable';
import { AppointmentFilters } from './components/AppointmentFilters';
import { AppointmentDetailsModal } from './components/AppointmentDetailsModal';
import { AddAppointmentModal } from './components/AddAppointmentModal';
import { RescheduleModal } from './components/RescheduleModal';
import { BlockTimeModal } from './components/BlockTimeModal';
import { CalendarView } from './components/CalendarView';
import { AdvancedFilters } from './components/AdvancedFilters';
import { ExportOptions } from './components/ExportOptions';
import { Pagination } from './components/Pagination';
import toast from 'react-hot-toast';
import {Appointment}from './types'

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: 'إدارة المواعيد',
    subtitle: 'إدارة ومراقبة وتنظيم جميع مواعيد العيادة بكفاءة',
    addAppointment: 'إضافة موعد',
    blockTimeSlot: 'حجز فترة زمنية',
    searchPlaceholder: 'البحث بالمريض أو الطبيب...',
    calendarView: 'عرض التقويم:',
    daily: 'يومي',
    weekly: 'أسبوعي',
    confirmSuccess: 'تم تأكيد الموعد',
    cancelSuccess: 'تم إلغاء الموعد',
    noShowSuccess: 'تم وضع علامة لم يحضر',
    loadError: 'فشل تحميل المواعيد',
    confirmError: 'فشل تأكيد الموعد',
    cancelError: 'فشل إلغاء الموعد',
    updateError: 'فشل تحديث الموعد',
    tableView: 'عرض الجدول',
    calendarViewTitle: 'عرض التقويم'
  },
  en: {
    title: 'Appointments Management',
    subtitle: 'Manage, monitor, and organize all clinic appointments efficiently',
    addAppointment: 'Add Appointment',
    blockTimeSlot: 'Block Time Slot',
    searchPlaceholder: 'Search by patient or doctor...',
    calendarView: 'Calendar View:',
    daily: 'Daily',
    weekly: 'Weekly',
    confirmSuccess: 'Appointment confirmed',
    cancelSuccess: 'Appointment cancelled',
    noShowSuccess: 'Marked as no-show',
    loadError: 'Failed to load appointments',
    confirmError: 'Failed to confirm appointment',
    cancelError: 'Failed to cancel appointment',
    updateError: 'Failed to update appointment',
    tableView: 'Table View',
    calendarViewTitle: 'Calendar View'
  }
};

export default function AppointmentsPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [calendarViewMode, setCalendarViewMode] = useState<'daily' | 'weekly'>('daily');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<Appointment | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const savedLang = localStorage.getItem('managerLang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('managerLang') as Language;
      if (newLang) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const t = translations[language];

  const fetchAppointments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        filter,
        page: currentPage.toString(),
        limit: pageSize.toString()
      });
      
      // Add advanced filters
      if (advancedFilters.doctorId) params.append('doctorId', advancedFilters.doctorId);
      if (advancedFilters.status) params.append('status', advancedFilters.status);
      if (advancedFilters.dateFrom) params.append('dateFrom', advancedFilters.dateFrom);
      if (advancedFilters.dateTo) params.append('dateTo', advancedFilters.dateTo);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || data);
        setTotalItems(data.total || data.length);
      }
    } catch {
      toast.error(t.loadError);
    } finally {
      setLoading(false);
    }
  }, [filter, currentPage, pageSize, advancedFilters, t.loadError]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirm = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${id}/confirm`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success(t.confirmSuccess);
        fetchAppointments();
      }
    } catch {
      toast.error(t.confirmError);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${id}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success(t.cancelSuccess);
        fetchAppointments();
      }
    } catch {
      toast.error(t.cancelError);
    }
  };

  const handleReschedule = async (appointment: Appointment) => {
    setRescheduleAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleNoShow = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${id}/no-show`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success(t.noShowSuccess);
        fetchAppointments();
      }
    } catch {
      toast.error(t.updateError);
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const normalizeArabicText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[ًٌٍَُِّْ]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ؤ]/g, 'و')
      .replace(/[ئ]/g, 'ي')
      .replace(/[ة]/g, 'ه')
      .trim();
  };

  const filteredAppointments = appointments.filter(apt => {
    const searchNormalized = normalizeArabicText(searchTerm);
    const patientName = normalizeArabicText(getName(apt.patientName));
    const doctorName = normalizeArabicText(getName(apt.doctorName));
    
    return patientName.includes(searchNormalized) || doctorName.includes(searchNormalized);
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Calendar className="text-teal-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors text-sm sm:text-base"
          >
            <Plus size={18} />
            <span>{t.addAppointment}</span>
          </button>
          
          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors text-sm sm:text-base"
          >
            <Clock size={18} />
            <span>{t.blockTimeSlot}</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <AppointmentFilters currentFilter={filter} onFilterChange={setFilter} language={language} />
            <AdvancedFilters onApplyFilters={setAdvancedFilters} language={language} />
            <ExportOptions appointments={filteredAppointments} language={language} />
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-700 rounded-lg p-1 border border-gray-600">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title={t.tableView}
              >
                <LayoutList size={16} />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'calendar' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title={t.calendarViewTitle}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar View Mode Toggle */}
        {viewMode === 'calendar' && (
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-gray-400 text-xs sm:text-sm">{t.calendarView}</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCalendarViewMode('daily')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                  calendarViewMode === 'daily'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t.daily}
              </button>
              <button
                onClick={() => setCalendarViewMode('weekly')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                  calendarViewMode === 'weekly'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {t.weekly}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      {viewMode === 'table' ? (
        <>
          <AppointmentsTable
            appointments={filteredAppointments}
            loading={loading}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onView={setSelectedAppointment}
            onReschedule={handleReschedule}
            onNoShow={handleNoShow}
            language={language}
          />
          
          {!loading && filteredAppointments.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              language={language}
            />
          )}
        </>
      ) : (
        <CalendarView
          appointments={filteredAppointments}
          viewMode={calendarViewMode}
          language={language}
        />
      )}

      {/* Modals */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          language={language}
        />
      )}
      
      {showAddModal && (
        <AddAppointmentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchAppointments}
          language={language}
        />
      )}
      
      {showRescheduleModal && rescheduleAppointment && (
        <RescheduleModal
          appointmentId={rescheduleAppointment._id}
          doctorId={rescheduleAppointment.doctorId}
          currentDate={rescheduleAppointment.date}
          currentTime={rescheduleAppointment.time}
          onClose={() => {
            setShowRescheduleModal(false);
            setRescheduleAppointment(null);
          }}
          onSuccess={fetchAppointments}
          language={language}
        />
      )}

      {showBlockModal && (
        <BlockTimeModal
          onClose={() => setShowBlockModal(false)}
          onSuccess={fetchAppointments}
          language={language}
        />
      )}
    </div>
  );
}
