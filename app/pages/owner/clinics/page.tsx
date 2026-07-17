'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Building2, MapPin, Phone, Mail, Edit, Trash2, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { fetchClinics, getAuthHeaders } from './utils/api';
import { API_BASE_URL } from './utils/constants';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
  address?: { en: string; ar: string };
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
}

const t = {
  ar: {
    title: 'إدارة العيادات',
    subtitle: 'إدارة العيادات',
    addClinic: 'إضافة عيادة جديدة',
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    searchPlaceholder: 'بحث بالاسم أو البريد...',
    allStatus: 'جميع الحالات',
    active: 'نشط',
    inactive: 'غير نشط',
    empty: 'لا توجد عيادات',
    emptyDesc: 'ابدأ بإضافة عيادة جديدة',
    addFirst: 'إضافة عيادة',
    createdAt: 'تم الإنشاء:',
    editTitle: 'تعديل العيادة',
    deleteTitle: 'حذف العيادة',
    toggleTitle: 'تغيير الحالة',
    deleteConfirm: 'هل أنت متأكد من حذف هذه العيادة؟',
    deleteSuccess: 'تم حذف العيادة بنجاح',
    toggleSuccess: 'تم تغيير حالة العيادة بنجاح',
  },
  en: {
    title: 'Clinics Management',
    subtitle: 'Manage Clinics',
    addClinic: 'Add New Clinic',
    loading: 'Loading clinics...',
    retry: 'Retry',
    searchPlaceholder: 'Search by name or email...',
    allStatus: 'All Status',
    active: 'Active',
    inactive: 'Inactive',
    empty: 'No clinics found',
    emptyDesc: 'Start by adding a new clinic',
    addFirst: 'Add Clinic',
    createdAt: 'Created:',
    editTitle: 'Edit Clinic',
    deleteTitle: 'Delete Clinic',
    toggleTitle: 'Toggle Status',
    deleteConfirm: 'Are you sure you want to delete this clinic?',
    deleteSuccess: 'Clinic deleted successfully',
    toggleSuccess: 'Clinic status updated successfully',
  },
} as const;

export default function ClinicsPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadClinics = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchClinics();
      setClinics(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClinics(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${tr.deleteConfirm}\n"${name}"`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete clinic');
      setClinics(prev => prev.filter(c => c._id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete clinic');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (clinic: Clinic) => {
    setActionLoading(clinic._id);
    try {
      const res = await fetch(`${API_BASE_URL}/${clinic._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !clinic.isActive }),
      });
      if (!res.ok) throw new Error('Failed to update clinic');
      setClinics(prev => prev.map(c => c._id === clinic._id ? { ...c, isActive: !c.isActive } : c));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update clinic');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => clinics.filter(c => {
    const name = locale === 'ar' ? (c.name.ar || c.name.en) : (c.name.en || c.name.ar);
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && c.isActive) ||
      (statusFilter === 'inactive' && !c.isActive);
    return matchSearch && matchStatus;
  }), [clinics, search, statusFilter, locale]);

  const getClinicName = (clinic: Clinic) =>
    locale === 'ar' ? (clinic.name.ar || clinic.name.en) : (clinic.name.en || clinic.name.ar);

  const getAddress = (clinic: Clinic) => {
    if (!clinic.address) return null;
    return locale === 'ar' ? (clinic.address.ar || clinic.address.en) : (clinic.address.en || clinic.address.ar);
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{tr.title}</h1>
          <p className="text-gray-400 mt-1">{tr.subtitle}</p>
        </div>
        <button
          onClick={() => router.push('/pages/owner/clinics/add')}
          className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
        >
          <Plus size={20} />
          {tr.addClinic}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${locale === 'ar' ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tr.searchPlaceholder}
            className={`w-full py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${locale === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">{tr.allStatus}</option>
          <option value="active">{tr.active}</option>
          <option value="inactive">{tr.inactive}</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadClinics} className="text-sm underline hover:text-red-300">{tr.retry}</button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-400">{tr.loading}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow p-12 text-center">
          <Building2 size={64} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{tr.empty}</h3>
          <p className="text-gray-400 mb-6">{tr.emptyDesc}</p>
          {clinics.length === 0 && (
            <button
              onClick={() => router.push('/pages/owner/clinics/add')}
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus size={20} />
              {tr.addFirst}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((clinic) => (
            <div key={clinic._id} className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-teal-900/30 p-3 rounded-lg shrink-0">
                    <Building2 size={24} className="text-teal-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white truncate">{getClinicName(clinic)}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {locale === 'ar' ? clinic.name.en : clinic.name.ar}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ms-2">
                  <button
                    onClick={() => router.push(`/pages/owner/clinics/edit/${clinic._id}`)}
                    className="p-2 text-teal-400 hover:bg-teal-900/30 rounded-lg transition-colors"
                    title={tr.editTitle}
                    disabled={actionLoading === clinic._id}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(clinic)}
                    className={`p-2 rounded-lg transition-colors ${clinic.isActive ? 'text-green-400 hover:bg-green-900/30' : 'text-gray-400 hover:bg-gray-700'}`}
                    title={tr.toggleTitle}
                    disabled={actionLoading === clinic._id}
                  >
                    {clinic.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <button
                    onClick={() => handleDelete(clinic._id, getClinicName(clinic))}
                    className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                    title={tr.deleteTitle}
                    disabled={actionLoading === clinic._id}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {getAddress(clinic) && (
                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span className="truncate">{getAddress(clinic)}</span>
                  </div>
                )}
                {clinic.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone size={14} />
                    <span>{clinic.phone}</span>
                  </div>
                )}
                {clinic.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={14} />
                    <span className="truncate">{clinic.email}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {tr.createdAt} {new Date(clinic.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  clinic.isActive ? 'bg-green-900/30 text-green-400' : 'bg-gray-700 text-gray-400'
                }`}>
                  {clinic.isActive ? tr.active : tr.inactive}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
