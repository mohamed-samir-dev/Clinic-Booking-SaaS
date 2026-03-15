'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stethoscope, Search, UserPlus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { DoctorsTable } from './components/DoctorsTable';
import { DoctorFilters } from './components/DoctorFilters';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { AddDoctorModal } from './components/AddDoctorModal';
import { ScheduleModal } from './components/ScheduleModal';
import { Pagination } from './components/Pagination';
import { useLanguage } from '@/app/contexts/LanguageContext';
import toast from 'react-hot-toast';

export interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
  specialty: string;
  experience: number;
  todayAppointments: number;
  rating: number;
  status: 'available' | 'busy' | 'off-duty' | 'on-leave';
  phone?: string;
  email?: string;
  bio?: string;
  image?: string;
  totalAppointments?: number;
  completedAppointments?: number;
  noShowRate?: number;
  schedule?: Array<{ day: string; startTime: string; endTime: string }>;
}

const translations = {
  ar: {
    title: 'إدارة الأطباء',
    subtitle: 'إدارة الأطباء العاملين في هذه العيادة، مراقبة جداولهم، توافرهم، وأدائهم',
    addExisting: 'إضافة طبيب موجود',
    createNew: 'إنشاء طبيب جديد',
    searchPlaceholder: 'البحث باسم الطبيب أو التخصص...',
    failedLoad: 'فشل تحميل الأطباء',
    activateSuccess: 'تم تفعيل الطبيب بنجاح',
    deactivateSuccess: 'تم إلغاء تفعيل الطبيب بنجاح',
    failedUpdate: 'فشل تحديث حالة الطبيب'
  },
  en: {
    title: 'Doctors Management',
    subtitle: 'Manage doctors working in this clinic, monitor their schedules, availability, and performance',
    addExisting: 'Add Existing Doctor',
    createNew: 'Create New Doctor',
    searchPlaceholder: 'Search by doctor name or specialty...',
    failedLoad: 'Failed to load doctors',
    activateSuccess: 'Doctor activated successfully',
    deactivateSuccess: 'Doctor deactivated successfully',
    failedUpdate: 'Failed to update doctor status'
  }
};

export default function DoctorsPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    availability: '',
    experience: ''
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [doctorForSchedule, setDoctorForSchedule] = useState<Doctor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    availableToday: 0,
    busy: 0,
    todayAppointments: 0
  });

  const fetchDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString()
      });
      
      // Add filters only if they have values
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.availability) params.append('availability', filters.availability);
      if (filters.experience) params.append('experience', filters.experience);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data.doctors || data);
        setTotalItems(data.total || data.length);
        setStats(prevStats => data.stats || prevStats);
      }
    } catch {
      toast.error(t.failedLoad);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters, t.failedLoad]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDeactivate = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/${id}/deactivate`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.status === 'active' ? t.activateSuccess : t.deactivateSuccess);
        fetchDoctors();
      }
    } catch {
      toast.error(t.failedUpdate);
    }
  };

  const handleViewAppointments = (doctorId: string) => {
    window.location.href = `/pages/manager/appointments?doctor=${doctorId}`;
  };

  const handleEditSchedule = (doctor: Doctor) => {
    setDoctorForSchedule(doctor);
    setShowScheduleModal(true);
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[locale];

  const filteredDoctors = doctors.filter(doc =>
    getName(doc.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Stethoscope className="text-teal-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <StatsCards stats={stats} language={locale} />

      {/* Add Doctor Buttons */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            <UserPlus size={18} className="sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">{t.addExisting}</span>
          </button>
          <button
            onClick={() => window.location.href = '/pages/manager/doctors/add'}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            <UserPlus size={18} className="sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">{t.createNew}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          
          <DoctorFilters filters={filters} onFilterChange={setFilters} language={locale} />
        </div>
      </div>

      {/* Doctors Table */}
      <DoctorsTable
        doctors={filteredDoctors}
        loading={loading}
        onViewProfile={setSelectedDoctor}
        onEditSchedule={handleEditSchedule}
        onViewAppointments={handleViewAppointments}
        onDeactivate={handleDeactivate}
        language={locale}
      />

      {/* Pagination */}
      {!loading && filteredDoctors.length > 0 && (
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
          language={locale}
        />
      )}

      {/* Modals */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          language={locale}
        />
      )}
      
      {showAddModal && (
        <AddDoctorModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchDoctors}
          language={locale}
        />
      )}

      {showScheduleModal && doctorForSchedule && (
        <ScheduleModal
          doctor={doctorForSchedule}
          onClose={() => {
            setShowScheduleModal(false);
            setDoctorForSchedule(null);
          }}
          onSuccess={fetchDoctors}
          language={locale}
        />
      )}
    </div>
  );
}
