import { useEffect, useMemo, useState } from 'react';
import { Clinic, Doctor } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useClinicData = (clinicId: string) => {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clinicId) {
      setClinic(null);
      setDoctors([]);
      setLoading(false);
      setError('Missing clinicId');
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [clinicRes, doctorsRes] = await Promise.all([
          fetch(`${API_URL}/api/clinics/${encodeURIComponent(clinicId)}`, { signal: controller.signal }),
          fetch(`${API_URL}/api/doctors/by-clinic/${encodeURIComponent(clinicId)}`, { signal: controller.signal }),
        ]);

        if (!clinicRes.ok) throw new Error(`Failed to fetch clinic: ${clinicRes.status}`);
        if (!doctorsRes.ok) throw new Error(`Failed to fetch doctors: ${doctorsRes.status}`);

        const [clinicData, doctorsData] = await Promise.all([
          clinicRes.json() as Promise<Clinic>,
          doctorsRes.json() as Promise<Doctor[]>,
        ]);

        if (controller.signal.aborted) return;

        setClinic(clinicData ?? null);
        setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Failed to fetch data:', err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [clinicId]);

  return { clinic, doctors, loading, error };
};

/**
 * Image gallery hook with keyboard navigation.
 * Uses index as the single source of truth to avoid state mismatch.
 */
export const useImageGallery = (images: string[] = []) => {
  // null = modal closed
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const validIndex = useMemo(() => {
    if (selectedIndex === null) return null;
    if (!images.length) return null;
    if (selectedIndex >= images.length) return 0;
    return selectedIndex;
  }, [selectedIndex, images.length]);

  const selectedImage = useMemo(() => {
    if (validIndex === null) return null;
    return images[validIndex] ?? null;
  }, [validIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null || images.length === 0) return;

      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) => {
          if (i === null) return null;
          return i > 0 ? i - 1 : images.length - 1;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => {
          if (i === null) return null;
          return i < images.length - 1 ? i + 1 : 0;
        });
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  // Convenience helpers (اختياريين بس مفيدين)
  const openImage = (index: number) => {
    if (!images.length) return;
    const safeIndex = Math.max(0, Math.min(index, images.length - 1));
    setSelectedIndex(safeIndex);
  };

  const closeImage = () => setSelectedIndex(null);

  return {
    selectedImage,
    selectedIndex,
    setSelectedIndex,
    openImage,
    closeImage,
  };
};