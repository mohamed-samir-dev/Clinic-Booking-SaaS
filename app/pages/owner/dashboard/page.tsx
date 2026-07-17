'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { 
  Building2, Users, UserCog, Calendar, DollarSign, Star, Stethoscope, Wallet
} from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { KPICard } from './components/KPICard';
import { DateRange, DashboardData, Alert } from './types';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const RevenueCharts = dynamic(() => import('./components/RevenueCharts').then(mod => ({ default: mod.RevenueCharts })), { ssr: false, loading: () => <ChartSkeleton /> });
const ClinicsTable = dynamic(() => import('./components/ClinicsTable').then(mod => ({ default: mod.ClinicsTable })), { ssr: false, loading: () => <SectionSkeleton /> });
const AlertsPanel = dynamic(() => import('./components/AlertsPanel').then(mod => ({ default: mod.AlertsPanel })), { ssr: false });
const ActivityLog = dynamic(() => import('./components/ActivityLog').then(mod => ({ default: mod.ActivityLog })), { ssr: false, loading: () => <SectionSkeleton /> });
const QuickActionsTiles = dynamic(() => import('./components/QuickActionsTiles').then(mod => ({ default: mod.QuickActionsTiles })), { ssr: false });
const ClinicDetailsModal = dynamic(() => import('./components/ClinicDetailsModal').then(mod => ({ default: mod.ClinicDetailsModal })), { ssr: false });

const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
    <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

const SectionSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />)}
    </div>
  </div>
);

const CACHE_DURATION_MS = 5 * 60 * 1000;

function getCachedData(): DashboardData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem('ownerDashboardCache');
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_DURATION_MS) {
      sessionStorage.removeItem('ownerDashboardCache');
      return null;
    }
    return data as DashboardData;
  } catch {
    return null;
  }
}

function setCachedData(data: DashboardData) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('ownerDashboardCache', JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // sessionStorage might be full, ignore
  }
}

import { KPIData } from './types';

type KPIKey = keyof KPIData;

const KPI_CONFIG_BASE: { key: KPIKey; changeKey: KPIKey | null; icon: typeof Building2; format?: 'currency' | 'rating'; titleKey: string; tooltipKey: string }[] = [
  { key: 'totalClinics', changeKey: 'clinicsChange', icon: Building2, titleKey: 'totalClinics', tooltipKey: 'tooltipClinics' },
  { key: 'totalManagers', changeKey: 'managersChange', icon: UserCog, titleKey: 'totalManagers', tooltipKey: 'tooltipManagers' },
  { key: 'totalDoctors', changeKey: 'doctorsChange', icon: Stethoscope, titleKey: 'totalDoctors', tooltipKey: 'tooltipDoctors' },
  { key: 'totalPatients', changeKey: 'patientsChange', icon: Users, titleKey: 'totalPatients', tooltipKey: 'tooltipPatients' },
  { key: 'totalAppointments', changeKey: 'appointmentsChange', icon: Calendar, titleKey: 'appointments', tooltipKey: 'tooltipAppointments' },
  { key: 'totalRevenue', changeKey: 'revenueChange', icon: DollarSign, titleKey: 'totalRevenue', tooltipKey: 'tooltipRevenue', format: 'currency' },
  { key: 'careSyncRevenue', changeKey: 'careSyncRevenueChange', icon: Wallet, titleKey: 'careSyncRevenue', tooltipKey: 'tooltipCareSyncRevenue', format: 'currency' },
  { key: 'avgClinicRating', changeKey: null, icon: Star, titleKey: 'avgRating', tooltipKey: 'tooltipRating', format: 'rating' },
];

const t = {
  ar: {
    errorTitle: 'خطأ في تحميل لوحة التحكم',
    retry: 'إعادة المحاولة',
    totalClinics: 'إجمالي العيادات',
    totalManagers: 'إجمالي المديرين',
    totalDoctors: 'إجمالي الأطباء',
    totalPatients: 'إجمالي المرضى',
    appointments: 'المواعيد',
    totalRevenue: 'إجمالي الإيرادات',
    careSyncRevenue: 'إيرادات CareSync',
    avgRating: 'متوسط التقييم',
    tooltipClinics: 'إجمالي عدد العيادات المسجلة',
    tooltipManagers: 'إجمالي عدد مديري العيادات',
    tooltipDoctors: 'إجمالي عدد الأطباء في جميع العيادات',
    tooltipPatients: 'إجمالي المرضى المسجلين',
    tooltipAppointments: 'إجمالي المواعيد في الفترة المحددة',
    tooltipRevenue: 'إجمالي الإيرادات في الفترة المحددة',
    tooltipCareSyncRevenue: 'إيرادات منصة CareSync',
    tooltipRating: 'متوسط تقييم العيادات',
  },
  en: {
    errorTitle: 'Error Loading Dashboard',
    retry: 'Retry',
    totalClinics: 'Total Clinics',
    totalManagers: 'Total Managers',
    totalDoctors: 'Total Doctors',
    totalPatients: 'Total Patients',
    appointments: 'Appointments',
    totalRevenue: 'Total Revenue',
    careSyncRevenue: 'CareSync Revenue',
    avgRating: 'Avg Rating',
    tooltipClinics: 'Total number of registered clinics',
    tooltipManagers: 'Total number of clinic managers',
    tooltipDoctors: 'Total number of doctors across all clinics',
    tooltipPatients: 'Total registered patients',
    tooltipAppointments: 'Total appointments in selected period',
    tooltipRevenue: 'Total revenue in selected period',
    tooltipCareSyncRevenue: 'CareSync platform revenue',
    tooltipRating: 'Average clinic rating',
  },
} as const;

type TKeys = keyof typeof t.en;

function formatKPIValue(value: number | undefined, format?: string): string | number {
  const v = value ?? 0;
  if (format === 'currency') return `$${v.toLocaleString()}`;
  if (format === 'rating') return v > 0 ? v.toFixed(1) : 'N/A';
  return v;
}

export default function OwnerDashboardPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const lang = locale as 'ar' | 'en';
  const tr = t[lang];
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date().toISOString().split('T')[0],
    to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [data, setData] = useState<DashboardData | null>(() => getCachedData());
  const [loading, setLoading] = useState(!getCachedData());
  const [error, setError] = useState<string | null>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;

  const fetchDashboardData = useCallback(async () => {
    if (!dataRef.current) setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/owner/dashboard?from=${dateRange.from}&to=${dateRange.to}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('Failed to fetch dashboard data');

      const dashboardData = await response.json();
      setData(dashboardData);
      setCachedData(dashboardData);
    } catch (err) {
      if (!dataRef.current) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleAlertAction = (alert: Alert) => {
    if (alert.type === 'no_manager' && alert.clinicId) {
      router.push(`/pages/owner/managers/add?clinicId=${alert.clinicId}`);
    }
  };

  if (error && !data) {
    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{tr.errorTitle}</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {tr.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900">
      <DashboardHeader
        locale={lang}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onAddClinic={() => router.push('/pages/owner/clinics/add')}
        onAssignManager={() => router.push('/pages/owner/managers/add')}
        onViewReports={() => router.push('/pages/owner/reports')}
        notificationCount={data?.alerts.length}
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards - Always render immediately (cached or skeleton) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data ? (
            KPI_CONFIG_BASE.map((kpi) => (
              <KPICard
                key={kpi.key}
                title={tr[kpi.titleKey as TKeys]}
                value={formatKPIValue(data.kpis[kpi.key], kpi.format)}
                change={kpi.changeKey ? data.kpis[kpi.changeKey] ?? 0 : 0}
                icon={kpi.icon}
                tooltip={tr[kpi.tooltipKey as TKeys]}
                locale={lang}
              />
            ))
          ) : (
            KPI_CONFIG_BASE.map((kpi) => (
              <div key={kpi.key} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  </div>
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Below the fold - only render when data is available */}
        {data && (
          <>
            <RevenueCharts
              timeline={data.revenueTimeline}
              byClinic={data.revenueByClinic}
              share={data.revenueShare}
              locale={lang}
            />

            {data.alerts.length > 0 && (
              <AlertsPanel alerts={data.alerts} onAlertAction={handleAlertAction} locale={lang} />
            )}

            <ClinicsTable
              clinics={data.revenueByClinic}
              locale={lang}
              onViewClinic={(id) => setSelectedClinicId(id)}
              onAssignManager={(id) => router.push(`/pages/owner/managers/add?clinicId=${id}`)}
              onDisableManager={() => {
                if (confirm(lang === 'ar' ? 'هل أنت متأكد من تعطيل هذا المدير؟' : 'Are you sure you want to disable this manager?')) {
                  toast.success(lang === 'ar' ? 'تم تعطيل المدير بنجاح' : 'Manager disabled successfully');
                }
              }}
            />

            <ClinicDetailsModal
              clinicId={selectedClinicId}
              locale={lang}
              performanceData={selectedClinicId ? data.revenueByClinic.find(c => c.clinicId === selectedClinicId) : undefined}
              onClose={() => setSelectedClinicId(null)}
            />

            <QuickActionsTiles
              locale={lang}
              onAddClinic={() => router.push('/pages/owner/clinics/add')}
              onAssignManager={() => router.push('/pages/owner/managers/add')}
              onViewClinics={() => router.push('/pages/owner/clinics')}
              onViewManagers={() => router.push('/pages/owner/managers')}
            />

            <ActivityLog activities={data.recentActivity} locale={lang} />
          </>
        )}

        {/* Show skeleton for below-fold only on first load with no cache */}
        {!data && loading && (
          <>
            <ChartSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
