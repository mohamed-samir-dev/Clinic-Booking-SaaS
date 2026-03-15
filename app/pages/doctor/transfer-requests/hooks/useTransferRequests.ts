import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TransferRequest, ActionType } from '../types';

export const useTransferRequests = () => {
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('message');

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/transfer-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data.data);
      }
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async () => {
    if (!selectedRequest || !responseMessage.trim()) {
      toast.error('Please write a message');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/transfer-requests/${selectedRequest}/respond`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: actionType === 'message' ? 'pending' : actionType === 'accept' ? 'accepted' : 'rejected',
            doctorResponse: responseMessage,
          }),
        }
      );

      if (response.ok) {
        toast.success(
          actionType === 'accept'
            ? 'Request accepted! You have been transferred to the new clinic'
            : actionType === 'reject'
            ? 'Request rejected'
            : 'Message sent'
        );
        setShowResponseModal(false);
        setResponseMessage('');
        setSelectedRequest(null);
        fetchRequests();
      } else {
        toast.error('Failed to respond');
      }
    } catch {
      toast.error('Failed to respond');
    }
  };

  const openResponseModal = (requestId: string, type: ActionType) => {
    setSelectedRequest(requestId);
    setActionType(type);
    setShowResponseModal(true);
  };

  const closeModal = () => {
    setShowResponseModal(false);
    setResponseMessage('');
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    responseMessage,
    showResponseModal,
    actionType,
    setResponseMessage,
    handleResponse,
    openResponseModal,
    closeModal,
  };
};
