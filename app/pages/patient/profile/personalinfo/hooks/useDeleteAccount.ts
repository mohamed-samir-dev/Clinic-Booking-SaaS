import { useState } from 'react';

export const useDeleteAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e: React.FormEvent, deletePassword: string) => {
    e.preventDefault();
    setShowDeleteError(false);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/patient/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ password: deletePassword })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        setDeleteErrorMsg(data.message || 'Failed to delete account');
        setShowDeleteError(true);
        setTimeout(() => setShowDeleteError(false), 3000);
      }
    } catch {
      setDeleteErrorMsg('Error deleting account');
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
