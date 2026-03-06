import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TransferRequest } from '../types';
import { fetchTransferRequests, sendReply } from '../api';

export const useTransferRequests = () => {
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await fetchTransferRequests();
      setRequests(data);
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (requestId: string, message: string) => {
    if (!message.trim()) {
      toast.error('Please write a message');
      return false;
    }

    try {
      await sendReply(requestId, message);
      toast.success('Reply sent successfully');
      loadRequests();
      return true;
    } catch {
      toast.error('Failed to send reply');
      return false;
    }
  };

  const filteredRequests = requests.filter(req => 
    filter === 'all' ? true : req.status === filter
  );

  return {
    requests: filteredRequests,
    loading,
    filter,
    setFilter,
    handleSendReply,
  };
};
