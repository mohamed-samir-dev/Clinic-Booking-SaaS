import { MapPin, Phone, Mail, Bed, Users, Calendar, Facebook, Instagram, Twitter, Globe, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Clinic } from '../types';

interface SidebarProps {
  clinic: Clinic;
  onImageClick: (image: string, index: number) => void;
}

export default function Sidebar({ clinic, onImageClick }: SidebarProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Contact */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
        <div className="space-y-3 sm:space-y-4">
          {clinic.address?.en && (
            <div className="flex gap-2 sm:gap-3">
              <MapPin className="text-teal-600 shrink-0 mt-1" size={18} />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Address</p>
                <p className="text-gray-700 font-medium text-sm sm:text-base">{clinic.address.en}</p>
              </div>
            </div>
          )}

          {clinic.phone && (
            <a href={`tel:${clinic.phone}`} className="flex gap-2 sm:gap-3 hover:bg-gray-50 p-2 rounded-lg transition">
              <Phone className="text-teal-600 shrink-0 mt-1" size={18} />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-gray-700 font-medium hover:text-teal-600 text-sm sm:text-base">{clinic.phone}</p>
              </div>
            </a>
          )}

          {clinic.email && (
            <a href={`mailto:${clinic.email}`} className="flex gap-2 sm:gap-3 hover:bg-gray-50 p-2 rounded-lg transition">
              <Mail className="text-teal-600 shrink-0 mt-1" size={18} />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-700 font-medium hover:text-teal-600 break-all text-sm sm:text-base">{clinic.email}</p>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Capacity */}
      {clinic.capacity && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Capacity</h3>
          <div className="space-y-2 sm:space-y-3">
            {clinic.capacity.rooms > 0 && (
              <div className="flex items-center justify-between p-2 sm:p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bed className="text-teal-600" size={18} />
                  <span className="text-gray-700 text-sm sm:text-base">Rooms</span>
                </div>
                <span className="font-bold text-teal-600 text-sm sm:text-base">{clinic.capacity.rooms}</span>
              </div>
            )}
            {clinic.capacity.doctors > 0 && (
              <div className="flex items-center justify-between p-2 sm:p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="text-teal-600" size={18} />
                  <span className="text-gray-700 text-sm sm:text-base">Doctors</span>
                </div>
                <span className="font-bold text-teal-600 text-sm sm:text-base">{clinic.capacity.doctors}</span>
              </div>
            )}
            {clinic.capacity.patientsPerDay > 0 && (
              <div className="flex items-center justify-between p-2 sm:p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="text-teal-600" size={18} />
                  <span className="text-gray-700 text-sm sm:text-base">Patients/Day</span>
                </div>
                <span className="font-bold text-teal-600 text-sm sm:text-base">{clinic.capacity.patientsPerDay}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Media */}
      {clinic.socialMedia && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Follow Us</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {clinic.socialMedia.facebook && (
              <a href={clinic.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                 className="p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
            )}
            {clinic.socialMedia.instagram && (
              <a href={clinic.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                 className="p-2 sm:p-3 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
            )}
            {clinic.socialMedia.twitter && (
              <a href={clinic.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                 className="p-2 sm:p-3 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
            )}
            {clinic.socialMedia.website && (
              <a href={clinic.socialMedia.website} target="_blank" rel="noopener noreferrer"
                 className="p-2 sm:p-3 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100">
                <Globe size={18} className="sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Images Gallery */}
      {clinic.images && clinic.images.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <ImageIcon className="text-teal-600" size={18} />
            Gallery
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {clinic.images.map((image, index) => (
              <div 
                key={index} 
                className="relative h-24 sm:h-32 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => onImageClick(image, index)}
              >
                <Image src={image} alt={`Clinic image ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" loading={index === 0 ? "eager" : "lazy"} className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
