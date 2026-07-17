import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueTimelinePoint, ClinicPerformance, RevenueShare } from '../types';

interface RevenueChartsProps {
  locale: 'ar' | 'en';
  timeline: RevenueTimelinePoint[];
  byClinic: ClinicPerformance[];
  share: RevenueShare[];
}

const t = {
  ar: {
    revenueOverTime: 'الإيرادات عبر الزمن',
    noRevenueData: 'لا توجد بيانات إيرادات في هذه الفترة',
    topClinics: 'أفضل 10 عيادات من حيث الإيرادات',
    noClinicData: 'لا توجد بيانات عيادات',
    revenueShare: 'حصة الإيرادات حسب العيادة',
    noShareData: 'لا توجد بيانات حصص الإيرادات',
  },
  en: {
    revenueOverTime: 'Revenue Over Time',
    noRevenueData: 'No revenue data in this range',
    topClinics: 'Top 10 Clinics by Revenue',
    noClinicData: 'No clinic data available',
    revenueShare: 'Revenue Share by Clinic',
    noShareData: 'No revenue share data',
  },
} as const;

const COLORS = ['#14b8a6', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#6366f1', '#ec4899'];

const getClinicName = (name: string | { en?: string; ar?: string }, locale: 'ar' | 'en'): string => {
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    return locale === 'ar' ? (name.ar || name.en || '') : (name.en || name.ar || '');
  }
  return '';
};

export const RevenueCharts = ({ locale, timeline, byClinic, share }: RevenueChartsProps) => {
  const tr = t[locale];

  const topClinics = byClinic.slice(0, 10).map(clinic => ({
    ...clinic,
    clinicName: getClinicName(clinic.clinicName, locale),
  }));

  const shareData = share.map(item => ({
    ...item,
    clinicName: getClinicName(item.clinicName, locale),
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{tr.revenueOverTime}</h3>
        {timeline.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number | undefined) => value !== undefined ? `$${value.toLocaleString()}` : '$0'}
              />
              <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} dot={{ fill: '#14b8a6' }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">{tr.noRevenueData}</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{tr.topClinics}</h3>
          {topClinics.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topClinics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="clinicName" stroke="#6b7280" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number | undefined) => value !== undefined ? `$${value.toLocaleString()}` : '$0'}
                />
                <Bar dataKey="revenue" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">{tr.noClinicData}</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{tr.revenueShare}</h3>
          {share.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={shareData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="revenue">
                  {shareData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number | undefined) => value !== undefined ? `$${value.toLocaleString()}` : '$0'} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">{tr.noShareData}</div>
          )}
        </div>
      </div>
    </div>
  );
};
