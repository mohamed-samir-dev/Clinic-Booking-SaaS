'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} font-semibold text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">{message}</p>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <span className="material-icons text-xl">close</span>
        </button>
      </div>
    </div>
  );
}
