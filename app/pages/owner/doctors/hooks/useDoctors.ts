import { useEffect, useState } from "react";
import { api } from "../../../../lib/api";
import { Doctor } from "../types/types";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    doctorId: string;
    doctorName: string;
  }>({
    isOpen: false,
    doctorId: "",
    doctorName: "",
  });

  const fetchDoctors = async () => {
    try {
      const data = await api.owner.doctors.getAll() as Doctor[];
      setDoctors(data);
    } catch {}
  };

  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, doctorId: id, doctorName: name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, doctorId: "", doctorName: "" });
  };

  const confirmDelete = async () => {
    try {
      await api.doctors.delete(deleteModal.doctorId);
      fetchDoctors();
      closeDeleteModal();
    } catch {}
  };

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await api.owner.doctors.getAll() as Doctor[];
        setDoctors(data);
      } catch {}
    };
    loadDoctors();
  }, []);

  return {
    doctors,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};
