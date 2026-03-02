export interface KPIData {
  totalClinics: number;
  totalManagers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
  careSyncRevenue: number;
  avgClinicRating: number;
  clinicsChange: number;
  managersChange: number;
  doctorsChange: number;
  patientsChange: number;
  appointmentsChange: number;
  revenueChange: number;
  careSyncRevenueChange: number;
}

export interface RevenueTimelinePoint {
  date: string;
  revenue: number;
}

export interface ClinicPerformance {
  clinicId: string;
  clinicName: string;
  managerName: string;
  managerEmail: string;
  revenue: number;
  appointments: number;
  doctors: number;
  patients: number;
  rating: number;
  isActive: boolean;
}

export interface RevenueShare {
  clinicId: string;
  clinicName: string;
  revenue: number;
  percentage: number;
}

export interface Alert {
  id: string;
  type: 'no_manager' | 'revenue_drop' | 'low_rating' | 'high_cancellation';
  severity: 'high' | 'medium' | 'low';
  message: string | { en: string; ar: string };
  clinicId?: string;
  doctorId?: string;
  cta: string;
}

export interface ActivityLog {
  id: string;
  actorRole: string;
  actorName: string;
  action: string;
  entityType: string;
  entityName: string;
  timestamp: string;
}

export interface DashboardData {
  kpis: KPIData;
  revenueTimeline: RevenueTimelinePoint[];
  revenueByClinic: ClinicPerformance[];
  revenueShare: RevenueShare[];
  alerts: Alert[];
  recentActivity: ActivityLog[];
}

export interface DateRange {
  from: string;
  to: string;
}
