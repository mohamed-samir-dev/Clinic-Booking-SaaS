'use client';

import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { UserType } from '@/app/shared/types/auth.types';
import PasswordInput from '@/app/shared/components/PasswordInput';
import { ROLES_REQUIRING_BUSINESS_ID } from '@/app/shared/constants/auth.constants';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {ROLES_REQUIRING_BUSINESS_ID.includes(userType) && (
        <div>
          <label htmlFor="businessId" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Clinic
          </label>
          <select
            id="businessId"
            value={businessId}
            onChange={(e) => {
              console.log('Selected value:', e.target.value);
              setBusinessId(e.target.value);
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-900"
            required
            disabled={loadingBusinesses}
          >
            <option value="">Select Clinic</option>
            {businesses.map((business) => (
              <option key={business._id} value={business._id}>
                {business.name.en}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-900"
          placeholder="example@email.com"
          required
        />
      </div>

      <PasswordInput
        id="password"
        value={password}
        onChange={setPassword}
        label="Password"
        required
        showForgotPassword
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? 'Signing in...' : 'Sign In'}
        {!loading && <FaArrowRight className="text-sm" />}
      </button>
    </form>
  );
}
