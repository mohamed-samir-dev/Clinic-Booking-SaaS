'use client';

import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { UserType } from '@/app/shared/types/auth.types';
import PasswordInput from '@/app/shared/components/PasswordInput';
import { ROLES_REQUIRING_BUSINESS_ID } from '@/app/shared/constants/auth.constants';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface LoginFormProps {
  userType: UserType;
  onSubmit: (email: string, password: string, businessId: string) => void;
  loading: boolean;
  error: string;
}

interface Business {
  _id: string;
  name: {
    ar: string;
    en: string;
  };
  businessId: string;
}

export default function LoginForm({ userType, onSubmit, loading, error }: LoginFormProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(false);

  const t = locale === 'ar' ? messagesAr.auth.login : messages.auth.login;

  useEffect(() => {
    if (ROLES_REQUIRING_BUSINESS_ID.includes(userType)) {
      fetchBusinesses();
    }
  }, [userType]);

  const fetchBusinesses = async () => {
    setLoadingBusinesses(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/businesses');
      const data = await response.json();
      if (data.success) {
        console.log('Clinics data:', data.data);
        setBusinesses(data.data);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoadingBusinesses(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, businessId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-2.5 xs:px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {ROLES_REQUIRING_BUSINESS_ID.includes(userType) && (
        <div>
          <label htmlFor="businessId" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.selectClinic}
          </label>
          <select
            id="businessId"
            value={businessId}
            onChange={(e) => {
              console.log('Selected value:', e.target.value);
              setBusinessId(e.target.value);
            }}
            className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'}`}
            required
            disabled={loadingBusinesses}
          >
            <option value="">{t.selectClinic}</option>
            {businesses.map((business) => (
              <option key={business._id} value={business._id}>
                {locale === 'ar' ? business.name.ar : business.name.en}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="email" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
          placeholder={t.emailPlaceholder}
          required
        />
      </div>

      <PasswordInput
        id="password"
        value={password}
        onChange={setPassword}
        label={t.password}
        required
        showForgotPassword
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 xs:py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? t.signingIn : t.signIn}
        {!loading && <FaArrowRight className={`text-xs sm:text-sm ${locale === 'ar' ? 'rotate-180' : ''}`} />}
      </button>
    </form>
  );
}
