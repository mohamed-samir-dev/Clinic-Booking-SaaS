'use client';

import { useParams } from 'next/navigation';
import { useClinicData, useImageGallery } from './hooks/useClinicData';
import { useTheme } from '@/app/contexts/ThemeContext';
import ClinicHeader from './components/ClinicHeader';
import FacilitiesSection from './components/FacilitiesSection';
import WorkingHoursSection from './components/WorkingHoursSection';
import DoctorsSection from './components/DoctorsSection';
import Sidebar from './components/Sidebar';
import ImageModal from './components/ImageModal';

export default function ClinicDetailsPage() {
  const params = useParams();
  const clinicId = params.id as string;
  const { theme } = useTheme();
  const { clinic, doctors, loading, error } = useClinicData(clinicId);
  const { selectedImage, selectedIndex, setSelectedIndex, openImage, closeImage } = useImageGallery(clinic?.images);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{error || 'Clinic not found'}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ClinicHeader clinic={clinic} theme={theme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {clinic.description?.en && (
              <div className={`rounded-xl shadow p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>About the Clinic</h2>
                <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{clinic.description.en}</p>
              </div>
            )}

            <FacilitiesSection facilities={clinic.facilities} theme={theme} />
            <WorkingHoursSection workingHours={clinic.workingHours} theme={theme} />
            <DoctorsSection doctors={doctors} theme={theme} />
          </div>

          <Sidebar 
            clinic={clinic}
            theme={theme}
            onImageClick={(image, index) => {
              openImage(index);
            }} 
          />
        </div>
      </div>

      {selectedImage && clinic?.images && selectedIndex !== null && (
        <ImageModal
          selectedImage={selectedImage}
          selectedImageIndex={selectedIndex}
          totalImages={clinic.images.length}
          onClose={closeImage}
          onPrevious={() => {
            const newIndex = selectedIndex > 0 ? selectedIndex - 1 : clinic.images!.length - 1;
            setSelectedIndex(newIndex);
          }}
          onNext={() => {
            const newIndex = selectedIndex < clinic.images!.length - 1 ? selectedIndex + 1 : 0;
            setSelectedIndex(newIndex);
          }}
        />
      )}
    </div>
  );
}
