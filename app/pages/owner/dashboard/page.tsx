'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
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

const CACHE_KEY = 'owner_dashboard_cache';

function getCachedData(): DashboardData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    // Cache valid for 5 minutes
    if (Date.now() - timestamp > 5 * 60 * 1000) return null;
    return data;
  } catch { return null; }
}

function setCachedData(data: DashboardData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch { /* quota exceeded */ }
}

import { KPIData } from './types';

type KPIKey = keyof KPIData;

const KPI_CONFIG: { title: string; key: KPIKey; changeKey: KPIKey | null; icon: typeof Building2; tooltip: string; format?: 'currency' | 'rating' }[] = [
  { title: 'Total Clinics', key: 'totalClinics', changeKey: 'clinicsChange', icon: Building2, tooltip: 'Total number of registered clinics' },
  { title: 'Total Managers', key: 'totalManagers', changeKey: 'managersChange', icon: UserCog, tooltip: 'Total number of clinic managers' },
  { title: 'Total Doctors', key: 'totalDoctors', changeKey: 'doctorsChange', icon: Stethoscope, tooltip: 'Total number of doctors across all clinics' },
  { title: 'Total Patients', key: 'totalPatients', changeKey: 'patientsChange', icon: Users, tooltip: 'Total registered patients' },
  { title: 'Appointments', key: 'totalAppointments', changeKey: 'appointmentsChange', icon: Calendar, tooltip: 'Total appointments in selected period' },
  { title: 'Total Revenue', key: 'totalRevenue', changeKey: 'revenueChange', icon: DollarSign, tooltip: 'Total revenue in selected period', format: 'currency' },
  { title: 'CareSync Revenue', key: 'careSyncRevenue', changeKey: 'careSyncRevenueChange', icon: Wallet, tooltip: 'CareSync platform revenue', format: 'currency' },
  { title: 'Avg Rating', key: 'avgClinicRating', changeKey: null, icon: Star, tooltip: 'Average clinic rating', format: 'rating' },
];

function formatKPIValue(value: number | undefined, format?: string): string | number {
  const v = value ?? 0;
  if (format === 'currency') return `$${v.toLocaleString()}`;
  if (format === 'rating') return v > 0 ? v.toFixed(1) : 'N/A';
  return v;
}

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date().toISOString().split('T')[0],
    to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [data, setData] = useState<DashboardData | null>(() => getCachedData());
  const [loading, setLoading] = useState(!getCachedData());
  const [error, setError] = useState<string | null>(null);
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

  // Error state only when no cached data available
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader
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
            KPI_CONFIG.map((kpi) => (
              <KPICard
                key={kpi.title}
                title={kpi.title}
                value={formatKPIValue(data.kpis[kpi.key], kpi.format)}
                change={kpi.changeKey ? data.kpis[kpi.changeKey] ?? 0 : 0}
                icon={kpi.icon}
                tooltip={kpi.tooltip}
              />
            ))
          ) : (
            KPI_CONFIG.map((kpi) => (
              <div key={kpi.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
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
            />

            {data.alerts.length > 0 && (
              <AlertsPanel alerts={data.alerts} onAlertAction={handleAlertAction} />
            )}

            <ClinicsTable
              clinics={data.revenueByClinic}
              onViewClinic={(id) => router.push(`/pages/owner/clinics/${id}`)}
              onAssignManager={(id) => router.push(`/pages/owner/managers/add?clinicId=${id}`)}
              onDisableManager={() => {
                if (confirm('Are you sure you want to disable this manager?')) {
                  toast.success('Manager disabled successfully');
                }
              }}
            />

            <QuickActionsTiles
              onAddClinic={() => router.push('/pages/owner/clinics/add')}
              onAssignManager={() => router.push('/pages/owner/managers/add')}
              onViewClinics={() => router.push('/pages/owner/clinics')}
              onViewManagers={() => router.push('/pages/owner/managers')}
            />

            <ActivityLog activities={data.recentActivity} />
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
