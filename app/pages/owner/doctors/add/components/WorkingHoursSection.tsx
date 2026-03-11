import { Calendar } from 'lucide-react';

interface Availability {
  day: string;
  slots: Array<{ from: string; to: string }>;
  workingHours?: { from: string; to: string };
}

interface WorkingHoursSectionProps {
  availability: Availability[];
  onUpdate: (availability: Availability[]) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'أيام وساعات العمل',
    setHours: 'تحديد ساعات العمل لكل يوم:',
    from: 'من',
    to: 'إلى',
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت'
  },
  en: {
    title: 'Working Days & Hours',
    setHours: 'Set Working Hours for Each Day:',
    from: 'From',
    to: 'To',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  }
};

export default function WorkingHoursSection({ availability, onUpdate, language = 'en' }: WorkingHoursSectionProps) {
  const t = translations[language];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const handleDayToggle = (day: string, checked: boolean) => {
    if (checked) {
      onUpdate([...availability, { day, slots: [{ from: '09:00', to: '17:00' }], workingHours: { from: '09:00', to: '17:00' } }]);
    } else {
      onUpdate(availability.filter(a => a.day !== day));
    }
  };

  const handleTimeChange = (index: number, field: 'from' | 'to', value: string) => {
    const updated = [...availability];
    updated[index] = {
      ...updated[index],
      workingHours: { 
        ...updated[index].workingHours, 
        from: field === 'from' ? value : updated[index].workingHours?.from || '09:00',
        to: field === 'to' ? value : updated[index].workingHours?.to || '17:00'
      }
    };
    onUpdate(updated);
  };

  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Calendar size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {days.map((day) => {
          const isSelected = availability.some(a => a.day === day);
          return (
            <label key={day} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border-2 border-gray-600 cursor-pointer hover:bg-gray-700 transition-all">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => handleDayToggle(day, e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-500 rounded focus:ring-teal-500"
              />
              <span className="text-sm font-semibold text-gray-300 capitalize">{t[day as keyof typeof t]}</span>
            </label>
          );
        })}
      </div>
      
      {availability.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-md font-semibold text-gray-300">{t.setHours}</h4>
          {availability.map((avail, index) => (
            <div key={avail.day} className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white capitalize">{t[avail.day as keyof typeof t]}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">{t.from}</label>
                  <input
                    type="time"
                    value={avail.workingHours?.from || '09:00'}
                    onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">{t.to}</label>
                  <input
                    type="time"
                    value={avail.workingHours?.to || '17:00'}
                    onChange={(e) => handleTimeChange(index, 'to', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
