export type UserType = 'owner' | 'manager' | 'doctor' | 'staff' | 'patient';

export interface LoginCredentials {
  email: string;
  password: string;
  businessId?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
    [key: string]: any;
  };
  message?: string;
}
