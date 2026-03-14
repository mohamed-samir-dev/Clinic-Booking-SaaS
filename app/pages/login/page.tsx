'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserType } from '@/app/shared/types/auth.types';
import UserTypeToggle from '@/app/shared/components/UserTypeToggle';
import GoogleSignInButton from '@/app/shared/components/GoogleSignInButton';
import LoginForm from './components/LoginForm';
import { loginUser, saveAuthData, getRedirectRoute } from './utils/authService';
import { useAppDispatch } from '@/app/store/hooks';
import { setCredentials } from '@/app/store/slices/authSlice';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export default function LoginPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState<UserType>('patient');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const t = locale === 'ar' ? messagesAr.auth.login : messages.auth.login;

  const handleSubmit = async (email: string, password: string, businessId: string) => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(userType, { email, password, businessId });
      saveAuthData(data.token, data.user);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push(getRedirectRoute(data.user.role));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t.errorConnection);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-linear-to-br from-teal-50 to-cyan-50'}`}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className={`rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-6 xs:py-8 sm:py-10 md:py-12">
            <div className="mb-6 sm:mb-8">
              <h1 className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
              <p className={`text-sm xs:text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <UserTypeToggle userType={userType} onUserTypeChange={setUserType} />

                <LoginForm
                  userType={userType}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                />

                <div className="relative my-3 xs:my-4 sm:my-5 md:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className={`px-2.5 xs:px-3 sm:px-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>{t.or}</span>
                  </div>
                </div>

                <GoogleSignInButton
                  loading={googleLoading}
                  onSuccess={async (accessToken) => {
                    setGoogleLoading(true);
                    setError('');
                    try {
                      const res = await fetch('http://localhost:5000/api/v1/auth/patient/google', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ accessToken }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.message || 'Google sign-in failed');
                      saveAuthData(data.token, data.user);
                      dispatch(setCredentials({ user: data.user, token: data.token }));
                      router.push(getRedirectRoute(data.user.role));
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Google sign-in failed');
                    } finally {
                      setGoogleLoading(false);
                    }
                  }}
                  onError={(err) => setError(err)}
                />

              <div className={`mt-3 xs:mt-4 sm:mt-5 md:mt-6 text-center pt-3 sm:pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.noAccount}{' '}
                  <Link href="/pages/register" className="text-teal-500 font-semibold hover:text-teal-600 block sm:inline mt-1 sm:mt-0">
                    {t.signUp}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
