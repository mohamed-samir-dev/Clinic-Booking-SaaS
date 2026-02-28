import { useState } from 'react';
import { PasswordData } from '../types';

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
    setShowSuccess: (show: boolean) => void,
    setSuccessMessage: (msg: string) => void,
    setErrorMessage: (msg: string) => void
  ) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrorMsg('Passwords do not match');
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
      return;
    }
    setShowPasswordError(false);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/patients/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Password changed successfully!');
        setErrorMessage('');
        setShowSuccess(true);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordModal(false);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setPasswordErrorMsg(data.message || 'Failed to change password');
        setShowPasswordError(true);
        setTimeout(() => setShowPasswordError(false), 3000);
      }
    } catch {
      setPasswordErrorMsg('Error changing password');
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
