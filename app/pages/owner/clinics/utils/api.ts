import { ClinicFormData } from '../types';
import { API_BASE_URL } from './constants';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchClinics = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch clinics');
  }
  
  return response.json();
};

export const fetchClinicById = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch clinic data');
  }
  
  return response.json();
};

export const createClinic = async (data: ClinicFormData) => {
  const cleanedData = {
    ...data,
    facilities: data.facilities.filter(
      (f) => f.name.en.trim() !== '' || f.name.ar.trim() !== ''
    ),
  };

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create clinic');
  }

  return response.json();
};

export const updateClinic = async (id: string, data: ClinicFormData) => {
  const cleanedData = {
    ...data,
    facilities: data.facilities.filter(
      (f) => f.name.en.trim() !== '' || f.name.ar.trim() !== ''
    ),
  };

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update clinic');
  }

  return response.json();
};
