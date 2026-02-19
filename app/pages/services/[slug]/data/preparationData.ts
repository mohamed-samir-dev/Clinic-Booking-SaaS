import { IconType } from 'react-icons';
import { FaClipboardList, FaUserClock, FaUtensils } from 'react-icons/fa';

export const preparationTips: Record<string, { icon: IconType; title: string; description: string }[]> = {
  'General Medicine': [
    {
      icon: FaClipboardList,
      title: 'Medical History',
      description: 'Bring a list of current medications, known allergies, and any recent medical reports or test results.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Please arrive 10 minutes before your appointment to complete registration and health questionnaires.'
    },
    {
      icon: FaUtensils,
      title: 'Symptom Notes',
      description: 'Write down your symptoms, when they started, and any factors that make them better or worse.'
    }
  ],
  'Pediatrics': [
    {
      icon: FaClipboardList,
      title: 'Health Records',
      description: 'Bring vaccination records, growth charts, and any previous medical reports.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Arrive 10 minutes early to help your child settle in and complete necessary forms.'
    },
    {
      icon: FaUtensils,
      title: 'Comfort Items',
      description: 'Bring your child\'s favorite toy or comfort item to help them feel relaxed during the visit.'
    }
  ],
  'Dermatology': [
    {
      icon: FaClipboardList,
      title: 'Skin History',
      description: 'Bring a list of skincare products, medications, and any previous dermatological treatments or allergies.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Please arrive 10 minutes early to complete necessary paperwork before your consultation.'
    },
    {
      icon: FaUtensils,
      title: 'Clean Skin',
      description: 'Come with clean skin, free of makeup or heavy lotions to allow proper examination.'
    }
  ],
  'Dentistry': [
    {
      icon: FaClipboardList,
      title: 'Dental History',
      description: 'Bring a list of current medications and any previous dental records if this is your first visit.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'We recommend arriving at least 10 minutes prior to your scheduled appointment for check-in.'
    },
    {
      icon: FaUtensils,
      title: 'Eat Lightly',
      description: 'Have a light meal before your visit, as you may be advised not to eat for 30 minutes after fluoride treatment.'
    }
  ],
  'Gynecology': [
    {
      icon: FaClipboardList,
      title: 'Cycle Information',
      description: 'Note the date of your last menstrual period and bring any relevant medical or pregnancy records.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Arrive 10 minutes early to complete health forms before your examination.'
    },
    {
      icon: FaUtensils,
      title: 'Comfortable Attire',
      description: 'Wear comfortable clothing and bring any questions or concerns you may have.'
    }
  ],
  'Orthopedics': [
    {
      icon: FaClipboardList,
      title: 'Imaging & Reports',
      description: 'Bring any X-rays, MRI scans, or previous orthopedic reports related to your condition.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Please arrive 10 minutes before your appointment to complete assessment forms.'
    },
    {
      icon: FaUtensils,
      title: 'Comfortable Clothing',
      description: 'Wear loose, comfortable clothing that allows easy access to the affected area.'
    }
  ],
  'Cardiology': [
    {
      icon: FaClipboardList,
      title: 'Medical Records',
      description: 'Bring previous ECG results, blood test reports, and a complete list of medications and supplements.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Arrive 15 minutes early for vital signs check and pre-consultation preparation.'
    },
    {
      icon: FaUtensils,
      title: 'Fasting Guidelines',
      description: 'If blood tests are required, you may need to fast for 8–12 hours. We will inform you in advance.'
    }
  ],
  'ENT': [
    {
      icon: FaClipboardList,
      title: 'Symptom Details',
      description: 'Document your symptoms including duration, severity, and any triggers you have noticed.'
    },
    {
      icon: FaUserClock,
      title: 'Arrive Early',
      description: 'Arrive 10 minutes before your scheduled time for check-in and preliminary assessments.'
    },
    {
      icon: FaUtensils,
      title: 'Medication List',
      description: 'Bring a complete list of all medications, including over-the-counter drugs and supplements.'
    }
  ]
};
