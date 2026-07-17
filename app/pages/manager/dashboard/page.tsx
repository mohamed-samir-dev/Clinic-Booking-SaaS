'use client';

import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { QuickActions } from './components/QuickActions';
import { WeeklyChart } from './components/WeeklyChart';
import { useDashboardData } from './hooks/useDashboardData';
import { useLanguage } from '@/app/contexts/LanguageContext';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: 'نظرة عامة على لوحة التحكم',
    subtitle: 'مرحباً بعودتك! إليك ما يحدث في عيادتك اليوم.',
    loading: 'جاري التحميل...',
    errorTitle: 'خطأ في تحميل لوحة التحكم',
    errorMessage: 'فشل تحميل بيانات لوحة التحكم',
    todayAppointments: 'مواعيد اليوم',
    pendingRequests: 'الطلبات المعلقة',
    totalDoctors: 'إجمالي الأطباء',
    todayRevenue: 'إيرادات اليوم',
    quickActions: 'إجراءات سريعة',
    weeklyAppointments: 'المواعيد الأسبوعية',
    weeklyRevenue: 'الإيرادات الأسبوعية',
    vsYesterday: 'مقارنة بالأمس'
  },
  en: {
    title: 'Dashboard Overview',
    subtitle: "Welcome back! Here's what's happening with your clinic today.",
    loading: 'Loading...',
    errorTitle: 'Error Loading Dashboard',
    errorMessage: 'Failed to load dashboard data',
    todayAppointments: "Today's Appointments",
    pendingRequests: 'Pending Requests',
    totalDoctors: 'Total Doctors',
    todayRevenue: "Today's Revenue",
    quickActions: 'Quick Actions',
    weeklyAppointments: 'Weekly Appointments',
    weeklyRevenue: 'Weekly Revenue',
    vsYesterday: 'vs yesterday'
  }
};

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { data, loading, error } = useDashboardData();
  const { locale } = useLanguage();
  const language = locale as Language;
  const t = translations[language];

  if (loading) {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800 rounded w-48 sm:w-64"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{t.errorTitle}</h2>
          <p className="text-gray-400">{error ?? t.errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title={t.todayAppointments}
          value={data.stats.todayAppointments}
          change={data.stats.appointmentsChange}
          icon={Calendar}
          vsText={t.vsYesterday}
        />
        <StatCard
          title={t.pendingRequests}
          value={data.stats.pendingRequests}
          change={data.stats.requestsChange}
          icon={Clock}
          vsText={t.vsYesterday}
        />
        <StatCard
          title={t.totalDoctors}
          value={data.stats.totalDoctors}
          change={data.stats.doctorsChange}
          icon={Users}
          vsText={t.vsYesterday}
        />
        <StatCard
          title={t.todayRevenue}
          value={`$${data.stats.todayRevenue}`}
          change={data.stats.revenueChange}
          icon={DollarSign}
          vsText={t.vsYesterday}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions
          title={t.quickActions}
          language={language}
          onAddDoctor={() => router.push('/pages/manager/doctors/add')}
          onViewAppointments={() => router.push('/pages/manager/appointments')}
          onManageSchedule={() => router.push('/pages/manager/schedule')}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <WeeklyChart
          title={t.weeklyAppointments}
          data={data.weeklyAppointments}
          dataKey="appointments"
          color="bg-teal-600"
        />
        <WeeklyChart
          title={t.weeklyRevenue}
          data={data.weeklyRevenue}
          dataKey="revenue"
          color="bg-green-600"
        />
      </div>
    </div>
  );
}
