'use client';

import { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        {type === 'success' ? (
          <FaCheckCircle className="text-green-600 text-xl" />
        ) : (
          <FaTimesCircle className="text-red-600 text-xl" />
        )}
        <p className={`font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
