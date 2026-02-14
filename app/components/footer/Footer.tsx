'use client';
import Link from 'next/link';
import { FaHeartbeat, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="w-full px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-teal-500">Care</span>
                <span className="text-white">Sync</span>
              </span>
            </Link>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Your trusted healthcare partner. Book appointments with top doctors and manage your health seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Doctors', 'About Us', 'Contact', 'Book Appointment', 'Emergency Care'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-base hover:text-teal-500 transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-base font-medium">
                <FaMapMarkerAlt className="text-teal-500 mt-1 shrink-0" />
                <span>123 Medical Street, Healthcare City</span>
              </li>
              <li className="flex items-center gap-2 text-base font-medium">
                <FaPhone className="text-teal-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-base font-medium">
                <FaEnvelope className="text-teal-500 shrink-0" />
                <span>support@caresync.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: '#' },
                { icon: FaXTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedin, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-base text-gray-400">
            <p className="font-medium">&copy; 2026 CareSync. All rights reserved.</p>
            <div className="flex gap-6">
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
    </footer>
  );
}
