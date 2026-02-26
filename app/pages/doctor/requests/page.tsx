'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, FilterType } from './types';
import { useRequests } from './hooks/useRequests';
import { RequestsHeader } from './components/RequestsHeader';
import { StatsCards } from './components/StatsCards';
import { RequestsList } from './components/RequestsList';

export default function RequestsPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [filter, setFilter] = useState<FilterType>('all');
  const { requests, loading, handleStatusUpdate } = useRequests(token);

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(req => req.status === filter);

  const stats = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    confirmed: requests.filter(r => r.status === 'confirmed').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length
  };

  return (
    <div className="h-screen overflow-y-auto bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      <RequestsHeader />
      
      <div className="p-3 sm:p-5">
        <StatsCards 
          stats={stats} 
          filter={filter} 
          onFilterChange={setFilter}
        />
        
        <RequestsList 
          requests={filteredRequests}
          loading={loading}
          filter={filter}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>

      <style jsx global>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f1f1;
        }
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
