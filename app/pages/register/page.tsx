'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';
import { registerPatient } from './utils/registerService';
import { saveAuthData, getRedirectRoute } from '../login/utils/authService';
import { registerSchema, RegisterFormData } from './types';
import { usePasswordStrength } from './hooks/usePasswordStrength';
import { InputField } from './components/InputField';
import { PasswordField } from './components/PasswordField';
import { PasswordStrengthIndicator } from './components/PasswordStrengthIndicator';
import { PasswordRequirements } from './components/PasswordRequirements';
import { UserIcon, EmailIcon, PhoneIcon } from './components/Icons';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      
      toast.success('Registration successful', {
        duration: 3000,
        position: 'top-center',
      });
      
      setTimeout(() => {
        router.push(getRedirectRoute(result.user.role));
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
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
      <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 md:px-12 py-12">
                <div className="mb-8">
                  <div className="inline-block px-4 py-1 bg-teal-50 rounded-full mb-4">
                    <span className="text-teal-600 text-xs font-semibold">CareSync</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">Create your account</h1>
                  <p className="text-gray-500">Start your journey with us today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    icon={<UserIcon />}
                    register={register}
                    error={errors.name?.message}
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your.email@clinic.com"
                    icon={<EmailIcon />}
                    register={register}
                    error={errors.email?.message}
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="01234567890"
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
                      label="Password"
                      name="password"
                      placeholder="Create a strong password"
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
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    register={register}
                    error={errors.confirmPassword?.message}
                    showPassword={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                  <button
                    type="submit"
                    disabled={loading || !isValid}
                    className="w-full bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8 transform hover:scale-[1.02]"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/pages/login" className="text-teal-600 font-bold hover:text-teal-700 transition">
                      Sign In
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
