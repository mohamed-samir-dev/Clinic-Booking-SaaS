import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';

interface EmptyStateProps {
  loading: boolean;
  activeTab: string;
}

export function EmptyState({ loading, activeTab }: EmptyStateProps) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Found</h3>
      <p className="text-gray-600 mb-6">You don&apos;t have any {activeTab} appointments yet.</p>
      <Link href="/pages/booking" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
        Book an Appointment
      </Link>
    </div>
  );
}
