import { useState } from 'react';
import { PasswordData } from '../types';
import ar from '@/messages/ar.json';
import en from '@/messages/en.json';

const getMessages = () => {
  const locale = (typeof window !== 'undefined' ? localStorage.getItem('locale') : 'en') || 'en';
  return locale === 'ar' ? ar.patient.profile.personalInfo.messages : en.patient.profile.personalInfo.messages;
};

export const usePasswordChange = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (
    e: React.FormEvent,
    passwordData: PasswordData,
    setPasswordData: (data: PasswordData) => void,
    setShowSuccess: (show: boolean) => void
  ) => {
    e.preventDefault();
    const messages = getMessages();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrorMsg(messages.passwordsNotMatch);
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
      return;
    }
    setShowPasswordError(false);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      });
      const data = await response.json();
      if (data.success) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorMsg = data.message === 'Current password is incorrect' 
          ? messages.currentPasswordIncorrect
          : data.message === 'Password recently changed. Please login again'
          ? messages.passwordRecentlyChanged
          : (data.message || messages.failedChangePassword);
        setPasswordErrorMsg(errorMsg);
        setShowPasswordError(true);
        setTimeout(() => setShowPasswordError(false), 3000);
      }
    } catch {
      setPasswordErrorMsg(messages.errorChangingPassword);
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    showPasswordModal,
    setShowPasswordModal,
    showPasswordError,
    passwordErrorMsg,
    showCurrent,
    setShowCurrent,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    loading,
    handleChangePassword
  };
};
