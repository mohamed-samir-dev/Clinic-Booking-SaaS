import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { AppointmentFilters as IAppointmentFilters, AppointmentStatus } from '@/app/types/appointment';

interface AppointmentFiltersProps {
  filters: IAppointmentFilters;
  setFilters: (filters: IAppointmentFilters) => void;
}

export function AppointmentFilters({ filters, setFilters }: AppointmentFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search doctor, clinic, service..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400"
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none text-sm text-gray-900"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as AppointmentStatus })}
        >
          <option value="" className="text-gray-900">All Status</option>
          <option value="pending" className="text-gray-900">Pending</option>
          <option value="confirmed" className="text-gray-900">Confirmed</option>
          <option value="completed" className="text-gray-900">Completed</option>
          <option value="cancelled" className="text-gray-900">Cancelled</option>
        </select>
        <select
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none text-sm text-gray-900"
          value={filters.sortBy || ''}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as 'newest' | 'oldest' })}
        >
          <option value="" className="text-gray-900">Sort by Date</option>
          <option value="newest" className="text-gray-900">Newest First</option>
          <option value="oldest" className="text-gray-900">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
