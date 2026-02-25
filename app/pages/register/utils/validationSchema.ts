import { z } from 'zod';

export const createRegisterSchema = (t: Record<string, string>) => z.object({
  name: z.string().min(1, t.nameRequired).min(2, t.nameMin).max(100, 'Name is too long'),
  email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
  phone: z.string().min(1, t.phoneRequired).regex(/^\d{11}$/, t.phoneInvalid),
  password: z.string()
    .min(1, t.passwordRequired)
    .min(8, t.passwordMin)
    .regex(/[a-z]/, t.passwordLowercase)
    .regex(/[A-Z]/, t.passwordUppercase)
    .regex(/[0-9]/, t.passwordNumber)
    .regex(/[^a-zA-Z0-9]/, t.passwordSpecial),
  confirmPassword: z.string().min(1, t.confirmPasswordRequired)
}).refine((data) => data.password === data.confirmPassword, {
  message: t.passwordsNotMatch,
  path: ['confirmPassword'],
});
