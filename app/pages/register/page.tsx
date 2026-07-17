'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';
import { registerPatient } from './utils/registerService';
import { saveAuthData, getRedirectRoute } from '../login/utils/authService';
import { createRegisterSchema } from './utils/validationSchema';
import { usePasswordStrength } from './hooks/usePasswordStrength';
import { InputField } from './components/InputField';
import { PasswordField } from './components/PasswordField';
import { PasswordStrengthIndicator } from './components/PasswordStrengthIndicator';
import { PasswordRequirements } from './components/PasswordRequirements';
import { UserIcon, EmailIcon, PhoneIcon } from './components/Icons';
import GoogleSignInButton from '@/app/shared/components/GoogleSignInButton';
import { useAppDispatch } from '@/app/store/hooks';
import { setCredentials } from '@/app/store/slices/authSlice';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const t = locale === 'ar' ? messagesAr.auth.register : messages.auth.register;
  const registerSchema = useMemo(() => createRegisterSchema(t.validation), [locale]);

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const password = watch('password', '');
  const { passwordStrength, getStrengthLabel, getStrengthColor } = usePasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const result = await registerPatient({ 
        name: data.name, 
        email: data.email, 
        password: data.password,
        phone: data.phone 
      });
      
      saveAuthData(result.token, result.user);
      dispatch(setCredentials({ user: result.user, token: result.token }));
      
      toast.success(t.success, {
        duration: 3000,
        position: 'top-center',
      });
      
      setTimeout(() => {
        router.push(getRedirectRoute(result.user.role));
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.error;
      toast.error(errorMessage, {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50'}`}>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className={`rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
                <div className="mb-6 sm:mb-8">
                  <div className={`inline-block px-3 sm:px-4 py-1 rounded-full mb-3 sm:mb-4 ${theme === 'dark' ? 'bg-teal-900' : 'bg-teal-50'}`}>
                    <span className="text-teal-600 text-xs sm:text-sm font-semibold">{t.badge}</span>
                  </div>
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
                  <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                  <InputField
                    label={t.fullName}
                    name="name"
                    type="text"
                    placeholder={t.fullNamePlaceholder}
                    icon={<UserIcon />}
                    register={register}
                    error={errors.name?.message}
                  />

                  <InputField
                    label={t.email}
                    name="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    icon={<EmailIcon />}
                    register={register}
                    error={errors.email?.message}
                  />

                  <InputField
                    label={t.phone}
                    name="phone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    icon={<PhoneIcon />}
                    register={register}
                    error={errors.phone?.message}
                    maxLength={11}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                  />

                  <div>
                    <PasswordField
                      label={t.password}
                      name="password"
                      placeholder={t.passwordPlaceholder}
                      register={register}
                      error={errors.password?.message}
                      showPassword={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                    />
                    <PasswordStrengthIndicator
                      password={password}
                      passwordStrength={passwordStrength}
                      getStrengthColor={getStrengthColor}
                      getStrengthLabel={getStrengthLabel}
                    />
                    <PasswordRequirements password={password} />
                  </div>

                  <PasswordField
                    label={t.confirmPassword}
                    name="confirmPassword"
                    placeholder={t.confirmPasswordPlaceholder}
                    register={register}
                    error={errors.confirmPassword?.message}
                    showPassword={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                  <button
                    type="submit"
                    disabled={loading || !isValid}
                    className="w-full bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6 sm:mt-8 transform hover:scale-[1.02] text-sm sm:text-base"
                  >
                    {loading ? t.creatingAccount : t.createAccount}
                  </button>
                </form>

                <div className="relative my-4 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className={`px-3 sm:px-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>{locale === 'ar' ? 'أو' : 'OR'}</span>
                  </div>
                </div>

                <GoogleSignInButton
                  loading={googleLoading}
                  onSuccess={async (accessToken) => {
                    setGoogleLoading(true);
                    try {
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/patient/google-register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ accessToken }),
                      });
                      const data = await res.json();

                      if (data.code === 'ACCOUNT_EXISTS') {
                        toast.error(locale === 'ar' ? data.messageAr : data.message, { duration: 4000, position: 'top-center' });
                        setTimeout(() => router.push('/pages/login'), 2000);
                        return;
                      }

                      if (!res.ok) throw new Error(data.message || t.googleSignUpFailed);

                      saveAuthData(data.token, data.user);
                      dispatch(setCredentials({ user: data.user, token: data.token }));
                      toast.success(t.success, { duration: 3000, position: 'top-center' });
                      setTimeout(() => router.push(getRedirectRoute(data.user.role)), 1500);
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : t.googleSignUpFailed, { duration: 3000, position: 'top-center' });
                    } finally {
                      setGoogleLoading(false);
                    }
                  }}
                  onError={(err) => toast.error(err, { duration: 3000, position: 'top-center' })}
                />

                <div className="mt-4 sm:mt-6 text-center">
                  <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.haveAccount}{' '}
                    <Link href="/pages/login" className="text-teal-600 font-semibold sm:font-bold hover:text-teal-700 transition">
                      {t.signIn}
                    </Link>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
