
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/manager/transfer-requests`;

export const fetchTransferRequests = async () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
  return data.data;
};

export const sendReply = async (requestId: string, message: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await fetch(`${API_URL}/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ requestId, message }),
  });
  if (!response.ok) throw new Error('Failed to send reply');
  return response.json();
};
