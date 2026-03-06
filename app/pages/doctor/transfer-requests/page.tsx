'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PageHeader, LoadingState, EmptyState, RequestCard, ResponseModal } from './components';
import { useTransferRequests } from './hooks/useTransferRequests';

export default function DoctorTransferRequestsPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const {
    requests,
    loading,
    responseMessage,
    showResponseModal,
    actionType,
    setResponseMessage,
    handleResponse,
    openResponseModal,
    closeModal,
  } = useTransferRequests();

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PageHeader theme={theme} />

      {loading ? (
        <LoadingState theme={theme} />
      ) : requests.length === 0 ? (
        <EmptyState theme={theme} />
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              theme={theme}
              locale={locale}
              onOpenModal={openResponseModal}
            />
          ))}
        </div>
      )}

      <ResponseModal
        show={showResponseModal}
        theme={theme}
        actionType={actionType}
        responseMessage={responseMessage}
        onClose={closeModal}
        onMessageChange={setResponseMessage}
        onSubmit={handleResponse}
      />
    </div>
  );
}
