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

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState<UserType>('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (email: string, password: string, businessId: string) => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(userType, { email, password, businessId });
      saveAuthData(data.token, data.user);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push(getRedirectRoute(data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 md:px-12 py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
              <p className="text-gray-500">Please enter your details to sign in</p>
            </div>
            <div className="space-y-6">
                <UserTypeToggle userType={userType} onUserTypeChange={setUserType} />

                <LoginForm
                  userType={userType}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <GoogleSignInButton />

              <div className="mt-6 text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm font-semibold">
                  Don&rsquo;t have an account?{' '}
                  <Link href="/pages/register" className="text-teal-500 font-semibold hover:text-teal-600">
                    Sign Up for clinic account
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
