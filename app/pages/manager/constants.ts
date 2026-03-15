// Constants for Manager Dashboard

// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Manager
  MANAGER_PROFILE: '/api/manager/profile',
  MANAGER_DASHBOARD: '/api/manager/dashboard',
  
  // Appointments
  APPOINTMENTS: '/api/manager/appointments',
  APPOINTMENT_CONFIRM: (id: string) => `/api/manager/appointments/${id}/confirm`,
  APPOINTMENT_CANCEL: (id: string) => `/api/manager/appointments/${id}/cancel`,
  APPOINTMENT_RESCHEDULE: (id: string) => `/api/manager/appointments/${id}/reschedule`,
  
  // Doctors
  DOCTORS: '/api/manager/doctors',
  DOCTOR_TOGGLE_STATUS: (id: string) => `/api/manager/doctors/${id}/toggle-status`,
  DOCTOR_UPDATE: (id: string) => `/api/manager/doctors/${id}`,
  
  // Patients
  PATIENTS: '/api/manager/patients',
  PATIENT_DETAILS: (id: string) => `/api/manager/patients/${id}`,
  
  // Reviews
  REVIEWS: '/api/manager/reviews',
  
  // Schedule
  SCHEDULES: '/api/manager/schedules',
  SCHEDULE_UPDATE: (id: string) => `/api/manager/schedules/${id}`,
  
  // Clinic
  CLINIC: '/api/manager/clinic',
  CLINIC_UPDATE: '/api/manager/clinic',
};

// Days of the week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const DAYS_OF_WEEK_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

// Appointment Statuses
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
} as const;

// Appointment Filters
export const APPOINTMENT_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
] as const;

// Doctor Statuses
export const DOCTOR_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
} as const;

// Time Slots
export const DEFAULT_SLOT_DURATION = 30; // minutes
export const MIN_SLOT_DURATION = 15; // minutes
export const MAX_SLOT_DURATION = 120; // minutes

// Working Hours
export const DEFAULT_WORKING_HOURS = {
  start: '09:00',
  end: '17:00',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

// Rating
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Colors
export const STATUS_COLORS = {
  active: 'bg-green-500/20 text-green-400',
  inactive: 'bg-red-500/20 text-red-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
  completed: 'bg-blue-500/20 text-blue-400',
} as const;

// Chart Colors
export const CHART_COLORS = {
  primary: '#14b8a6', // teal-600
  secondary: '#10b981', // green-600
  tertiary: '#3b82f6', // blue-600
  warning: '#f59e0b', // amber-600
  danger: '#ef4444', // red-600
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  APPOINTMENT: 'appointment',
  REVIEW: 'review',
  DOCTOR: 'doctor',
  SYSTEM: 'system',
} as const;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'] as const;

// Validation
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  EMAIL_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 500,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Routes
export const ROUTES = {
  MANAGER: '/pages/manager',
  DASHBOARD: '/pages/manager/dashboard',
  APPOINTMENTS: '/pages/manager/appointments',
  DOCTORS: '/pages/manager/doctors',
  SCHEDULE: '/pages/manager/schedule',
  PATIENTS: '/pages/manager/patients',
  REVIEWS: '/pages/manager/reviews',
  SETTINGS: '/pages/manager/settings',
  LOGIN: '/pages/login',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  APPOINTMENT_CONFIRMED: 'Appointment confirmed successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
  DOCTOR_UPDATED: 'Doctor information updated successfully',
  SCHEDULE_UPDATED: 'Schedule updated successfully',
  CLINIC_UPDATED: 'Clinic information updated successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
} as const;

// Specialties (example list)
export const MEDICAL_SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'General Practice',
  'Neurology',
  'Obstetrics & Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Surgery',
  'Urology',
] as const;

// Facilities (example list)
export const CLINIC_FACILITIES = [
  'X-Ray',
  'Laboratory',
  'Pharmacy',
  'Emergency Room',
  'Operating Room',
  'ICU',
  'Ultrasound',
  'MRI',
  'CT Scan',
  'ECG',
  'Parking',
  'Wheelchair Access',
  'WiFi',
] as const;

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
] as const;

// Export all constants
export default {
  API_BASE_URL,
  API_ENDPOINTS,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_SHORT,
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_LABELS,
  APPOINTMENT_FILTERS,
  DOCTOR_STATUS,
  DEFAULT_SLOT_DURATION,
  MIN_SLOT_DURATION,
  MAX_SLOT_DURATION,
  DEFAULT_WORKING_HOURS,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  MIN_RATING,
  MAX_RATING,
  STATUS_COLORS,
  CHART_COLORS,
  NOTIFICATION_TYPES,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  VALIDATION_RULES,
  DATE_FORMATS,
  STORAGE_KEYS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  MEDICAL_SPECIALTIES,
  CLINIC_FACILITIES,
  LANGUAGES,
};
