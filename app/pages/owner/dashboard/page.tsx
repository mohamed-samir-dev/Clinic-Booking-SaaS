'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  UserCog, 
  Calendar, 
  DollarSign, 
  Star,
  Stethoscope,
  Wallet
} from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { KPICard } from './components/KPICard';
import { RevenueCharts } from './components/RevenueCharts';
import { ClinicsTable } from './components/ClinicsTable';
import { AlertsPanel } from './components/AlertsPanel';
import { ActivityLog } from './components/ActivityLog';
import { QuickActionsTiles } from './components/QuickActionsTiles';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { DateRange, DashboardData, Alert } from './types';
import toast from 'react-hot-toast';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date().toISOString().split('T')[0],
    to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/owner/dashboard?from=${dateRange.from}&to=${dateRange.to}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to load dashboard data');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onAddClinic={() => router.push('/pages/owner/clinics/add')}
          onAssignManager={() => router.push('/pages/owner/managers/add')}
        />
        <div className="p-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !data) {
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
        notificationCount={data.alerts.length}
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Clinics"
            value={data.kpis.totalClinics}
            change={data.kpis.clinicsChange}
            icon={Building2}
            tooltip="Total number of registered clinics"
          />
          <KPICard
            title="Total Managers"
            value={data.kpis.totalManagers}
            change={data.kpis.managersChange}
            icon={UserCog}
            tooltip="Total number of clinic managers"
          />
          <KPICard
            title="Total Doctors"
            value={data.kpis.totalDoctors}
            change={data.kpis.doctorsChange}
            icon={Stethoscope}
            tooltip="Total number of doctors across all clinics"
          />
          <KPICard
            title="Total Patients"
            value={data.kpis.totalPatients}
            change={data.kpis.patientsChange}
            icon={Users}
            tooltip="Total registered patients"
          />
          <KPICard
            title="Appointments"
            value={data.kpis.totalAppointments}
            change={data.kpis.appointmentsChange}
            icon={Calendar}
            tooltip="Total appointments in selected period"
          />
          <KPICard
            title="Total Revenue"
            value={`$${data.kpis.totalRevenue.toLocaleString()}`}
            change={data.kpis.revenueChange}
            icon={DollarSign}
            tooltip="Total revenue in selected period"
          />
          <KPICard
            title="CareSync Revenue"
            value={`$${(data.kpis.careSyncRevenue || 0).toLocaleString()}`}
            change={data.kpis.careSyncRevenueChange || 0}
            icon={Wallet}
            tooltip="CareSync platform revenue"
          />
          <KPICard
            title="Avg Rating"
            value={data.kpis.avgClinicRating > 0 ? data.kpis.avgClinicRating.toFixed(1) : 'N/A'}
            change={0}
            icon={Star}
            tooltip="Average clinic rating"
          />
        </div>

        {/* Revenue Analytics */}
        <RevenueCharts
          timeline={data.revenueTimeline}
          byClinic={data.revenueByClinic}
          share={data.revenueShare}
        />

        {/* Alerts & Insights */}
        {data.alerts.length > 0 && (
          <AlertsPanel alerts={data.alerts} onAlertAction={handleAlertAction} />
        )}

        {/* Clinics Performance Table */}
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

        {/* Quick Actions */}
        <QuickActionsTiles
          onAddClinic={() => router.push('/pages/owner/clinics/add')}
          onAssignManager={() => router.push('/pages/owner/managers/add')}
          onViewClinics={() => router.push('/pages/owner/clinics')}
          onViewManagers={() => router.push('/pages/owner/managers')}
        />

        {/* Recent Activity */}
        <ActivityLog activities={data.recentActivity} />
      </div>
    </div>
  );
}
