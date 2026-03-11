import { Clock } from 'lucide-react';
import { ClinicData } from '../page';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    workingHours: 'ساعات العمل والجدول',
    workingDays: 'أيام العمل',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    slotDuration: 'مدة الفترة (دقائق)',
    days: {
      Monday: 'الإثنين',
      Tuesday: 'الثلاثاء',
      Wednesday: 'الأربعاء',
      Thursday: 'الخميس',
      Friday: 'الجمعة',
      Saturday: 'السبت',
      Sunday: 'الأحد'
    },
    daysShort: {
      Monday: 'إث',
      Tuesday: 'ثل',
      Wednesday: 'أر',
      Thursday: 'خم',
      Friday: 'جم',
      Saturday: 'سب',
      Sunday: 'أح'
    }
  },
  en: {
    workingHours: 'Working Hours & Schedule',
    workingDays: 'Working Days',
    startTime: 'Start Time',
    endTime: 'End Time',
    slotDuration: 'Slot Duration (minutes)',
    days: {
      Monday: 'Monday',
      Tuesday: 'Tuesday',
      Wednesday: 'Wednesday',
      Thursday: 'Thursday',
      Friday: 'Friday',
      Saturday: 'Saturday',
      Sunday: 'Sunday'
    },
    daysShort: {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun'
    }
  }
};

interface WorkingHoursFormProps {
  clinicData: ClinicData;
  setClinicData: (data: ClinicData) => void;
  language?: Language;
}

export const WorkingHoursForm = ({ clinicData, setClinicData, language = 'ar' }: WorkingHoursFormProps) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const t = translations[language];

  const toggleDay = (day: string) => {
    const newDays = clinicData.workingDays.includes(day)
      ? clinicData.workingDays.filter(d => d !== day)
      : [...clinicData.workingDays, day];
    setClinicData({ ...clinicData, workingDays: newDays });
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Clock className="text-teal-400" size={20} />
        <h2 className="text-lg sm:text-xl font-bold text-white">{t.workingHours}</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-3">{t.workingDays}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${
                  clinicData.workingDays.includes(day)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="hidden sm:inline">{t.days[day as keyof typeof t.days]}</span>
                <span className="sm:hidden">{t.daysShort[day as keyof typeof t.daysShort]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">{t.startTime}</label>
            <input
              type="time"
              value={clinicData.workingHours.start}
              onChange={(e) => setClinicData({
                ...clinicData,
                workingHours: { ...clinicData.workingHours, start: e.target.value }
              })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">{t.endTime}</label>
            <input
              type="time"
              value={clinicData.workingHours.end}
              onChange={(e) => setClinicData({
                ...clinicData,
                workingHours: { ...clinicData.workingHours, end: e.target.value }
              })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">{t.slotDuration}</label>
            <input
              type="number"
              value={clinicData.slotDuration}
              onChange={(e) => setClinicData({ ...clinicData, slotDuration: parseInt(e.target.value) })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
