import { z } from 'zod';

export const createRegisterSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('errors.nameMinLength')).max(100, 'Name is too long'),
  email: z.string().email(t('errors.emailInvalid')),
  phone: z.string().regex(/^\d{11}$/, t('errors.phoneInvalid')),
  password: z.string()
    .min(8, t('errors.passwordMinLength'))
    .regex(/[a-z]/, t('errors.passwordLowercase'))
    .regex(/[A-Z]/, t('errors.passwordUppercase'))
    .regex(/[0-9]/, t('errors.passwordNumber'))
    .regex(/[^a-zA-Z0-9]/, t('errors.passwordSpecial')),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: t('errors.passwordMismatch'),
  path: ['confirmPassword'],
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{11}$/, 'Phone must be exactly 11 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
