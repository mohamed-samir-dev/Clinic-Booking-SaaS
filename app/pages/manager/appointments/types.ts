// Appointment Types
export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'rescheduled' 
  | 'no-show';

export interface LocalizedName {
  en: string;
  ar: string;
}

export interface AppointmentHistoryEntry {
  action: string;
  timestamp: string;
  by?: string;
  details?: string;
}


// Filter Types
export interface AppointmentFilters {
  search?: string;
  doctor?: string;
  status?: AppointmentStatus | '';
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

// API Response Types
export interface AppointmentsResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
}

// Modal Props Types
export interface ModalProps {
  onClose: () => void;
}

export interface AppointmentDetailsModalProps extends ModalProps {
  appointment: Appointment;
}

export interface AddAppointmentModalProps extends ModalProps {
  onSuccess: () => void;
}

// View Types
export type ViewMode = 'table' | 'calendar';
export type CalendarViewMode = 'daily' | 'weekly';

// WebSocket Event Types
export interface WebSocketEvents {
  appointmentCreated: (appointment: Appointment) => void;
  appointmentUpdated: (appointment: Appointment) => void;
  appointmentCancelled: (appointment: Appointment) => void;
  appointmentRescheduled: (appointment: Appointment) => void;
}

// Utility Types
export type GetNameFunction = (name: string | LocalizedName) => string;

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Export Options
export type ExportFormat = 'csv' | 'excel' | 'print';

// Quick Action Types
export type QuickActionType = 'add' | 'block' | 'reminder';

// Status Badge Colors
export const STATUS_COLORS: Record<AppointmentStatus, string> = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500',
  rescheduled: 'bg-purple-500/20 text-purple-400 border-purple-500',
  'no-show': 'bg-orange-500/20 text-orange-400 border-orange-500',
};

// Time Slots
export const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8; // 8 AM to 7 PM
  return {
    value: `${hour.toString().padStart(2, '0')}:00`,
    label: hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`,
  };
});

// Page Size Options
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Default Filters
export const DEFAULT_FILTERS: AppointmentFilters = {
  search: '',
  doctor: '',
  status: '',
  dateFrom: '',
  dateTo: '',
  page: 1,
  limit: 10,
};


export interface AppointmentsTableProps {
  appointments: Appointment[];
  loading: boolean;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onView: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onNoShow: (id: string) => void;
}

export interface Appointment {
  _id: string;
  patientId: string;
  patientName: string | LocalizedName;
  patientPhone?: string;
  patientEmail?: string;
  patientNotes?: string;
  doctorId: string;
  doctorName: string | LocalizedName;
  doctorSpecialty?: string;
  clinicId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  history?: AppointmentHistoryEntry[];
}
