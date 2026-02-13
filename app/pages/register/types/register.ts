import { RegisterFormData } from '../types';
import { UseFormRegister } from 'react-hook-form';

export interface InputFieldProps {
    label: string;
    name: keyof RegisterFormData;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    register: UseFormRegister<RegisterFormData>;
    error?: string;
    maxLength?: number;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  }


  export interface InputFieldProps {
    label: string;
    name: keyof RegisterFormData;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    register: UseFormRegister<RegisterFormData>;
    error?: string;
    maxLength?: number;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  }

  export interface PasswordFieldProps {
    label: string;
    name: 'password' | 'confirmPassword';
    placeholder: string;
    register: UseFormRegister<RegisterFormData>;
    error?: string;
    showPassword: boolean;
    onToggle: () => void;
  }

  export interface PasswordStrengthIndicatorProps {
    password: string;
    passwordStrength: number;
    getStrengthColor: () => string;
    getStrengthLabel: () => string;
  }