export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
