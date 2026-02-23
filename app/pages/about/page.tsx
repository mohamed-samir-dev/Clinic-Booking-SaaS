'use client';

import { FaHeart, FaLightbulb, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`relative text-white py-20 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-600 to-teal-800'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-semibold mb-2">Established 2013</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Dedicated to Your <span className="text-teal-400">Health</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
            Providing compassionate, world-class healthcare to our community for over a decade. 
            We combine medical expertise with a human touch.
          </p>
          <Link href="/pages/doctors">
            <button className="bg-white cursor-pointer text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
              Meet Our Doctors
            </button>
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Our History</h2>
            <span className="text-teal-600 text-2xl">|</span>
            <h3 className={`text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Our Story</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className={`leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Al Noor Clinic began with a simple yet profound vision: to bridge the gap between 
                high-end medical technology and personalized, patient-centric care. Founded in 2013, 
                we started as a small family practice and have grown into a comprehensive healthcare hub.
              </p>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Every patient who walks through our doors is treated with the same respect and attention 
                we would give our own family. Our journey has been defined by continuous learning and an 
                unwavering commitment to the well-being of our community.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl border-l-4 border-teal-600 ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
              <p className={`italic text-lg leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              &rdquo;Healing is an art that requires both clinical precision and deep empathy. 
                At Al Noor, we practice both&rdquo;&rdquo;
              </p>
              <p className="text-teal-700 font-semibold">- Dr. Sarah Ahmed, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>2013: The Beginning</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Opened our first facility with 3 consulting rooms and a dream to redefine healthcare.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>2017: Specialization</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Expanded to include Cardiology and Pediatrics departments with state-of-the-art diagnostic tools.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>2021: Digital Transformation</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Introduced AI-assisted diagnostics and a fully integrated telemedicine platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Present Day</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Serving over 5,000 patients monthly with a team of 20+ specialized practitioners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-6 text-white ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-r from-teal-600 to-teal-700'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">10+</div>
            <p className="text-teal-100 text-lg">Years Experience</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">50k+</div>
            <p className="text-teal-100 text-lg">Happy Patients</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">20+</div>
            <p className="text-teal-100 text-lg">Specialized Doctors</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Our Core Values</h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            The principles that guide every diagnosis, every treatment, and every patient interaction.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaHeart className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Compassion</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We treat every patient with the empathy and kindness they deserve, ensuring a safe 
                and supportive environment.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaLightbulb className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Innovation</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We embrace the latest medical advancements and technology to provide the most effective 
                and efficient care possible.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaCheckCircle className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Excellence</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Our standards are set by international board-certified protocols, ensuring quality 
                medical outcomes for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-6 text-white ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-600 to-teal-800'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to experience <span className="text-teal-400">better care</span>?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Schedule your consultation today and join thousands of patients who trust Al Noor Clinic 
            with their well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pages/booking">
              <button className="bg-white cursor-pointer text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
                Book Online Now
              </button>
            </Link>
            <button className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition border-2 border-white">
              Call +201012486445
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
