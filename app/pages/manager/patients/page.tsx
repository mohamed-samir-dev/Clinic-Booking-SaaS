'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Search } from 'lucide-react';
import { PatientsTable } from './components/PatientsTable';
import { PatientStatsCards } from './components/PatientStatsCards';
import { PatientPagination } from './components/PatientPagination';
import { PatientProfileModal } from './components/PatientProfileModal';
import toast from 'react-hot-toast';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: 'إدارة المرضى',
    subtitle: 'عرض وإدارة جميع المرضى في النظام',
    searchPlaceholder: 'البحث بالاسم أو الهاتف أو البريد الإلكتروني...',
    loadError: 'فشل تحميل المرضى'
  },
  en: {
    title: 'Patients Management',
    subtitle: 'View and manage all patients in the system',
    searchPlaceholder: 'Search by name, phone, or email...',
    loadError: 'Failed to load patients'
  }
};

export interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string | { street?: string; city?: string; state?: string; zipCode?: string };
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string[];
  chronicConditions?: string[];
  chronicConditionsOther?: string;
  currentMedications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    notes?: string;
  }>;
  notesForDoctor?: string;
  medicalHistory?: string[];
  isActive?: boolean;
  emailVerified?: boolean;
  lastLoginAt?: Date;
  lastAppointment: string | null;
  totalVisits: number;
  completedVisits: number;
  upcomingVisits: number;
  registeredAt?: Date;
  updatedAt?: Date;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [language, setLanguage] = useState<Language>('ar');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0,
    totalVisits: 0
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('managerLang') as Language;
    if (savedLang) setLanguage(savedLang);

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('managerLang') as Language;
      if (newLang) setLanguage(newLang);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString()
      });
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/patients?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients || []);
        setTotalItems(data.total || 0);
        setStats(prevStats => data.stats || prevStats);
      }
    } catch  {
      toast.error(translations[language].loadError);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, language]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(totalItems / pageSize);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Users className="text-teal-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <PatientStatsCards stats={stats} language={language} />

      {/* Search */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Patients Table */}
      <PatientsTable 
        patients={filteredPatients} 
        loading={loading}
        onViewProfile={setSelectedPatient}
        language={language}
      />

      {/* Pagination */}
      {!loading && filteredPatients.length > 0 && (
        <PatientPagination
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

      {/* Patient Profile Modal */}
      {selectedPatient && (
        <PatientProfileModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          language={language}
        />
      )}
    </div>
  );
}
