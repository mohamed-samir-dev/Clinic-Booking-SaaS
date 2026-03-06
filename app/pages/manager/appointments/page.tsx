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

export default function AppointmentsPage() {
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
      
      const response = await fetch(`http://localhost:5000/api/manager/appointments?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || data);
        setTotalItems(data.total || data.length);
      }
    } catch {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [filter, currentPage, pageSize, advancedFilters]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirm = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/appointments/${id}/confirm`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Appointment confirmed');
        fetchAppointments();
      }
    } catch {
      toast.error('Failed to confirm appointment');
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/appointments/${id}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Appointment cancelled');
        fetchAppointments();
      }
    } catch {
      toast.error('Failed to cancel appointment');
    }
  };

  const handleReschedule = async (appointment: Appointment) => {
    setRescheduleAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleNoShow = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/appointments/${id}/no-show`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Marked as no-show');
        fetchAppointments();
      }
    } catch {
      toast.error('Failed to update appointment');
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const filteredAppointments = appointments.filter(apt =>
    getName(apt.patientName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getName(apt.doctorName).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="text-teal-400" size={32} />
          <h1 className="text-3xl font-bold text-white">Appointments Management</h1>
        </div>
        <p className="text-gray-400">Manage, monitor, and organize all clinic appointments efficiently</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors"
          >
            <Plus size={20} />
            <span>Add Appointment</span>
          </button>
          
          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
          >
            <Clock size={20} />
            <span>Block Time Slot</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <AppointmentFilters currentFilter={filter} onFilterChange={setFilter} />
            <AdvancedFilters onApplyFilters={setAdvancedFilters} />
            <ExportOptions appointments={filteredAppointments} />
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-700 rounded-lg p-1 border border-gray-600">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Table View"
              >
                <LayoutList size={18} />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'calendar' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Calendar View"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar View Mode Toggle */}
        {viewMode === 'calendar' && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-400 text-sm">Calendar View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCalendarViewMode('daily')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  calendarViewMode === 'daily'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setCalendarViewMode('weekly')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  calendarViewMode === 'weekly'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Weekly
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
            />
          )}
        </>
      ) : (
        <CalendarView
          appointments={filteredAppointments}
          viewMode={calendarViewMode}
        />
      )}

      {/* Modals */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
      
      {showAddModal && (
        <AddAppointmentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchAppointments}
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
        />
      )}

      {showBlockModal && (
        <BlockTimeModal
          onClose={() => setShowBlockModal(false)}
          onSuccess={fetchAppointments}
        />
      )}
    </div>
  );
}
