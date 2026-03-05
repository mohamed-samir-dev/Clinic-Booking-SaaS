export interface DashboardStats {
  todayAppointments: number;
  pendingRequests: number;
  totalDoctors: number;
  todayRevenue: number;
  appointmentsChange: number;
  requestsChange: number;
  doctorsChange: number;
  revenueChange: number;
}

export interface WeeklyData {
  day: string;
  appointments: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  weeklyAppointments: WeeklyData[];
  weeklyRevenue: WeeklyData[];
}
