'use client';

import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { QuickActions } from './components/QuickActions';
import { WeeklyChart } from './components/WeeklyChart';
import { useDashboardData } from './hooks/useDashboardData';

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800 rounded w-64"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-400">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here&rsquo;s what&rsquo;s happening with your clinic today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Today's Appointments"
          value={data.stats.todayAppointments}
          change={data.stats.appointmentsChange}
          icon={Calendar}
        />
        <StatCard
          title="Pending Requests"
          value={data.stats.pendingRequests}
          change={data.stats.requestsChange}
          icon={Clock}
        />
        <StatCard
          title="Total Doctors"
          value={data.stats.totalDoctors}
          change={data.stats.doctorsChange}
          icon={Users}
        />
        <StatCard
          title="Today's Revenue"
          value={`$${data.stats.todayRevenue}`}
          change={data.stats.revenueChange}
          icon={DollarSign}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions
          onAddDoctor={() => router.push('/pages/manager/doctors/add')}
          onViewAppointments={() => router.push('/pages/manager/appointments')}
          onManageSchedule={() => router.push('/pages/manager/schedule')}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyChart
          title="Weekly Appointments"
          data={data.weeklyAppointments}
          dataKey="appointments"
          color="bg-teal-600"
        />
        <WeeklyChart
          title="Weekly Revenue"
          data={data.weeklyRevenue}
          dataKey="revenue"
          color="bg-green-600"
        />
      </div>
    </div>
  );
}
