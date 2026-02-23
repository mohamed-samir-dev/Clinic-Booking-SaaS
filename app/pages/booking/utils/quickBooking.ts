
import {QuickBookingData}from '../types/type'

export const saveQuickBookingData = (data: QuickBookingData): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('quickBookingData', JSON.stringify(data));
  }
};

export const getQuickBookingData = (): QuickBookingData | null => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('quickBookingData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearQuickBookingData = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('quickBookingData');
  }
};
