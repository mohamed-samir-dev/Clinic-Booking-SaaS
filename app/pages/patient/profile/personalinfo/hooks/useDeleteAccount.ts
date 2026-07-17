import { useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { logout } from '@/app/store/slices/authSlice';
import ar from '@/messages/ar.json';
import en from '@/messages/en.json';

const getMessages = () => {
  const locale = (typeof window !== 'undefined' ? localStorage.getItem('locale') : 'en') || 'en';
  return locale === 'ar' ? ar.patient.profile.personalInfo.messages : en.patient.profile.personalInfo.messages;
};

export const useDeleteAccount = () => {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e: React.FormEvent, deletePassword: string) => {
    e.preventDefault();
    setShowDeleteError(false);
    setLoading(true);
    const messages = getMessages();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/account`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ password: deletePassword })
      });
      const data = await response.json();
      if (data.success) {
        dispatch(logout());
        window.location.href = '/';
      } else {
        setDeleteErrorMsg(data.message || messages.failedDeleteAccount);
        setShowDeleteError(true);
        setTimeout(() => setShowDeleteError(false), 3000);
      }
    } catch {
      setDeleteErrorMsg(messages.errorDeletingAccount);
      setShowDeleteError(true);
      setTimeout(() => setShowDeleteError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    showDeleteModal,
    setShowDeleteModal,
    showDeleteError,
    deleteErrorMsg,
    showDeletePassword,
    setShowDeletePassword,
    loading,
    handleDeleteAccount
  };
};
