import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface PreparationTipsProps {
  tips: { icon: IconType; title: string; description: string }[];
}

export default function PreparationTips({ tips }: PreparationTipsProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.serviceDetails.preparationTips;
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 px-2`}>{t.title}</h3>
          <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-linear-to-r from-transparent via-teal-300 to-transparent -translate-y-1/2"></div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-xl border-2 sm:border-4 border-white"
                  >
                    <IconComponent className="text-white text-2xl sm:text-3xl" />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`${theme === 'dark' ? 'from-gray-700 to-gray-600 border-gray-600' : 'from-teal-50 to-cyan-50 border-teal-100'} bg-linear-to-br rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all border`}
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-teal-600 mb-2 sm:mb-3">{tip.title}</h4>
                    <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>{tip.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
