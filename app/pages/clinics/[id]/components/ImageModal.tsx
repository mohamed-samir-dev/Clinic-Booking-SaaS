import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {ImageModalProps}from '../types/index'


export default function ImageModal({ selectedImage, selectedImageIndex, totalImages, onClose, onPrevious, onNext }: ImageModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white text-black rounded-full p-1.5 sm:p-2 hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {selectedImageIndex > 0 && (
          <button
            onClick={onPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 sm:p-3 hover:bg-gray-200 transition-colors z-10"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
        )}
        
        {selectedImageIndex < totalImages - 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 sm:p-3 hover:bg-gray-200 transition-colors z-10"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        )}
        
        <div className="relative w-full h-full">
          <Image 
            src={selectedImage} 
            alt="Gallery image" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>
    </div>
  );
}
