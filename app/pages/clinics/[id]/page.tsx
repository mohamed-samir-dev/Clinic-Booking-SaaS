'use client';

import { useParams } from 'next/navigation';
import { useClinicData, useImageGallery } from './hooks/useClinicData';
import ClinicHeader from './components/ClinicHeader';
import FacilitiesSection from './components/FacilitiesSection';
import WorkingHoursSection from './components/WorkingHoursSection';
import DoctorsSection from './components/DoctorsSection';
import Sidebar from './components/Sidebar';
import ImageModal from './components/ImageModal';

export default function ClinicDetailsPage() {
  const params = useParams();
  const clinicId = params.id as string;
  const { clinic, doctors, loading, error } = useClinicData(clinicId);
  const { selectedImage, selectedIndex, setSelectedIndex, openImage, closeImage } = useImageGallery(clinic?.images);

  if (loading) {
    return (
      <div className="min-h-screen  bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{error || 'Clinic not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClinicHeader clinic={clinic} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {clinic.description?.en && (
              <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About the Clinic</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{clinic.description.en}</p>
              </div>
            )}

            <FacilitiesSection facilities={clinic.facilities} />
            <WorkingHoursSection workingHours={clinic.workingHours} />
            <DoctorsSection doctors={doctors} />
          </div>

          <Sidebar 
            clinic={clinic} 
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
