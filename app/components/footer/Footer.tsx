'use client';
import Link from 'next/link';
import { FaHeartbeat, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <FaHeartbeat className="text-white text-lg sm:text-xl" />
              </div>
              <span className="text-lg sm:text-xl font-bold">
                <span className="text-teal-500">Care</span>
                <span className="text-white">Sync</span>
              </span>
            </Link>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium">
              Your trusted healthcare partner. Book appointments with top doctors and manage your health seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="/" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">Home</Link></li>
              <li><Link href="/pages/services" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">Services</Link></li>
              <li><Link href="/pages/doctors" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">Doctors</Link></li>
              <li><Link href="/pages/about" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">About Us</Link></li>
              <li><Link href="/pages/contact" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">Contact</Link></li>
              <li><Link href="/pages/booking" className="text-sm sm:text-base hover:text-teal-500 transition-colors font-medium">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 text-sm sm:text-base font-medium">
                <FaMapMarkerAlt className="text-teal-500 mt-1 shrink-0 text-sm sm:text-base" />
                <span>123 Mansoura, Egypt</span>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base font-medium">
                <FaPhone className="text-teal-500 shrink-0 text-sm sm:text-base" />
                <span>+201012486445</span>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base font-medium">
                <FaEnvelope className="text-teal-500 shrink-0 text-sm sm:text-base" />
                <span>support@caresync.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Follow Us</h4>
            <div className="flex gap-2.5 sm:gap-3">
              {[
                { icon: FaFacebook },
                { icon: FaXTwitter },
                { icon: FaInstagram },
                { icon: FaLinkedin },
              ].map((social, idx) => (
                <button
                  key={idx}
                  onClick={() => setShowPopup(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="text-base sm:text-lg" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-400">
            <p className="font-medium text-center md:text-left">&copy; 2026 CareSync. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/privacy" className="hover:text-teal-500 transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-teal-500 transition-colors font-medium">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-teal-500 transition-colors font-medium">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Popup */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowPopup(false)}>
          <div className={`rounded-2xl shadow-2xl max-w-md w-full p-8 relative ${theme === 'dark' ? 'bg-linear-to-br from-gray-800 to-gray-900' : 'bg-linear-to-br from-teal-600 to-teal-800'}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPopup(false)}
              className={`absolute top-4 right-4 text-2xl font-bold ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white hover:text-gray-200'}`}
            >
              ×
            </button>
            
            <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${theme === 'dark' ? 'bg-teal-600' : 'bg-white'}`}>
                <FaHeartbeat className={`text-3xl ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Demo Project</h3>
              <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-teal-50'}`}>
                This is a demonstration project showcasing full-stack development capabilities. 
                Built with modern technologies to deliver exceptional user experiences.
              </p>
              
              <div className={`rounded-lg p-4 mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-10'}`}>
                <p className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-700'}`}>Developed by Mohammed Samier Mouawad</p>
                <div className="flex justify-center gap-3">
                  <a
                    href="https://my-newfrontend-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-teal-600' : 'bg-white'}`}
                    title="Portfolio"
                  >
                    <FaHeartbeat className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammed-samier-mouawad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-teal-600' : 'bg-white'}`}
                    title="LinkedIn"
                  >
                    <FaLinkedin className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
                  </a>
                  <a
                    href="https://github.com/mohamed-samir-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-teal-600' : 'bg-white'}`}
                    title="GitHub"
                  >
                    <FaGithub className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=201012486445&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-teal-600' : 'bg-white'}`}
                    title="WhatsApp"
                  >
                    <FaWhatsapp className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
                  </a>
                </div>
              </div>
              
              <a
                href="https://my-newfrontend-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${theme === 'dark' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-white text-teal-700 hover:bg-teal-50'}`}
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
