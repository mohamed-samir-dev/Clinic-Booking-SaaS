export interface ManagerFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  nationalId: string;
  address: string;
  clinicId: string;
  permissions: {
    manageDoctors: boolean;
    manageAppointments: boolean;
    viewReports: boolean;
    managePricesServices: boolean;
    managePayments: boolean;
  };
  isActive: boolean;
  requirePasswordChange: boolean;
}

export interface PermissionItem {
  key: string;
  label: string;
}
