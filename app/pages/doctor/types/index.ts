export interface Appointment {
  id: string;
  patientName: string | { en: string; ar: string };
  bookingType: string;
  time: string;
  status: string;
  createdAt?: string;
  requestedAgo?: string;
}

export interface Stat {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export interface StatusConfig {
  label: string;
  location: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  textColor: string;
  button: boolean;
}



export interface DoctorHeaderProps {
  userName?: string | { en: string; ar: string };
  pendingCount: number;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  newRequests: Appointment[];
}