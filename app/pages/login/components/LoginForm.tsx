'use client';

import { useState } from 'react';
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

export default function LoginForm({ userType, onSubmit, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessId, setBusinessId] = useState('');

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
            Business ID
          </label>
          <input
            type="text"
            id="businessId"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-900"
            placeholder="Enter your business ID"
            required
          />
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
