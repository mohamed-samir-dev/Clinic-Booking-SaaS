'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTransferRequests } from './hooks/useTransferRequests';
import { PageHeader, FilterBar, RequestCard, ReplyModal, LoadingState, EmptyState } from './components';

export default function TransferRequestsPage() {
  const { locale } = useLanguage();
  const { requests, loading, filter, setFilter, handleSendReply } = useTransferRequests();
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReply = async () => {
    const success = await handleSendReply(selectedRequest!, replyMessage);
    if (success) {
      setShowReplyModal(false);
      setReplyMessage('');
      setSelectedRequest(null);
    }
  };

  const openReplyModal = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowReplyModal(true);
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
    setReplyMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <PageHeader />
      <FilterBar filter={filter} setFilter={setFilter} />

      {loading ? (
        <LoadingState />
      ) : requests.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              locale={locale}
              onReply={openReplyModal}
            />
          ))}
        </div>
      )}

      <ReplyModal
        show={showReplyModal}
        message={replyMessage}
        setMessage={setReplyMessage}
        onClose={closeReplyModal}
        onSend={handleReply}
      />
    </div>
  );
}
