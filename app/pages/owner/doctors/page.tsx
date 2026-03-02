'use client';

import { useState } from 'react';
import PageHeader from './components/PageHeader';
import SearchBar from './components/SearchBar';
import DoctorsTable from './components/DoctorsTable';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useDoctors } from './hooks/useDoctors';
import { filterDoctors } from './utils/utils';

export default function ManageDoctorsPage() {
  const { doctors, deleteModal, openDeleteModal, closeDeleteModal, confirmDelete } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = filterDoctors(doctors, searchTerm);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <PageHeader />
      <div className="bg-gray-800 rounded-lg shadow">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <DoctorsTable doctors={filteredDoctors} onDelete={openDeleteModal} />
      </div>
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        doctorName={deleteModal.doctorName}
      />
    </div>
  );
}
