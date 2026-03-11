// Shared Types for Manager Dashboard

// Common Types
export type Status = 'active' | 'inactive' | 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface MultilingualField {
  en?: string;
  ar?: string;
}

// Manager Types
export interface Manager {
  _id: string;
  name: string | MultilingualField;
  email: string;
  phone: string;
  profileImage: string | null;
  clinicId: string;
  clinicName: string | MultilingualField;
  status: Status;
  createdAt: string;
}

// Clinic Types
export interface Clinic {
  _id: string;
  name: string | MultilingualField;
  address: string;
  phone: string;
  email: string;
  description: string;
  facilities: string[];
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
  managerId: string;
  images?: string[];
  rating?: number;
  createdAt: string;
}

// Appointment Types
export interface Appointment {
  _id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  clinicId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  service?: string;
  notes?: string;
  createdAt: string;
}

// Doctor Types
export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  isAvailable: boolean;
  image?: string;
  clinicId: string;
  email: string;
  phone: string;
  bio?: string;
  education?: string[];
  languages?: string[];
}

// Patient Types
export interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  address?: string;
  lastAppointment: string;
  totalVisits: number;
  createdAt: string;
}

// Review Types
export interface Review {
  _id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  clinicId: string;
  rating: number;
  comment: string;
  date: string;
  createdAt: string;
}

// Schedule Types
export interface Schedule {
  _id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
  breaks?: {
    start: string;
    end: string;
  }[];
}

// Dashboard Types
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

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export type AppointmentFilter = 'all' | 'today' | 'tomorrow' | 'week' | 'month';
export type DoctorFilter = 'all' | 'available' | 'unavailable';
export type StatusFilter = 'all' | 'active' | 'inactive';

// Form Types
export interface ClinicFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  facilities: string[];
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
}

export interface DoctorFormData {
  name: string;
  specialty: string;
  experience: number;
  email: string;
  phone: string;
  bio?: string;
  education?: string[];
  languages?: string[];
  image?: File;
}

// Utility Types
export type SortOrder = 'asc' | 'desc';
export type DateRange = {
  from: string;
  to: string;
};

// Component Props Types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string;
}

// Error Types
export interface ApiError {
  error: string;
  message: string;
  statusCode?: number;
}

// Notification Types
export interface Notification {
  _id: string;
  managerId: string;
  type: 'appointment' | 'review' | 'doctor' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}


