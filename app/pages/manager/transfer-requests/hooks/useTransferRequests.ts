import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { TransferRequest } from '../types';
import { fetchTransferRequests, sendReply } from '../api';

const translations = {
  ar: {
    loadFailed: 'فشل تحميل الطلبات',
    writeMessage: 'يرجى كتابة رسالة',
    replySuccess: 'تم إرسال الرد بنجاح',
    replyFailed: 'فشل إرسال الرد'
  },
  en: {
    loadFailed: 'Failed to load requests',
    writeMessage: 'Please write a message',
    replySuccess: 'Reply sent successfully',
    replyFailed: 'Failed to send reply'
  }
};

export const useTransferRequests = () => {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const loadRequests = useCallback(async () => {
    try {
      const data = await fetchTransferRequests();
      setRequests(data);
    } catch {
      toast.error(t.loadFailed);
    } finally {
      setLoading(false);
    }
  }, [t.loadFailed]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleSendReply = async (requestId: string, message: string) => {
    if (!message.trim()) {
      toast.error(t.writeMessage);
      return false;
    }

    try {
      await sendReply(requestId, message);
      toast.success(t.replySuccess);
      loadRequests();
      return true;
    } catch {
      toast.error(t.replyFailed);
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
