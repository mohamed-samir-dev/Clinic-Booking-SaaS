
export const serviceOverviews: Record<string, { intro: string; features: string[] }> = {
  'General Medicine': {
    intro: 'A General Medicine Consultation is the foundation of maintaining your overall health. At CareSync, our experienced physicians provide a comprehensive medical evaluation to assess your condition and detect potential health concerns early. We focus on accurate diagnosis, preventive care, and personalized treatment plans tailored to your specific needs.',
    features: [
      'Complete medical history review',
      'Thorough physical examination and vital signs assessment',
      'Diagnosis and management of acute and chronic conditions',
      'Preventive health screenings',
      'Personalized treatment and lifestyle recommendations'
    ]
  },
  'Pediatrics': {
    intro: 'Pediatrics at CareSync is dedicated to providing compassionate and comprehensive healthcare for infants, children, and adolescents. Our pediatric specialists focus on monitoring growth and development, preventing illness, and ensuring your child\'s healthy future.',
    features: [
      'Routine checkups and growth monitoring',
      'Childhood vaccinations and immunizations',
      'Diagnosis and treatment of common pediatric illnesses',
      'Nutritional and developmental guidance',
      'Preventive care and parental counseling'
    ]
  },
  'Dermatology': {
    intro: 'Dermatology at CareSync provides comprehensive care for healthy, radiant skin. Our specialists diagnose and treat a wide range of skin, hair, and nail conditions using advanced medical and cosmetic techniques tailored to your needs.',
    features: [
      'Diagnosis and treatment of skin conditions (acne, eczema, psoriasis)',
      'Management of hair and scalp disorders',
      'Skin allergy testing and treatment',
      'Cosmetic dermatology procedures',
      'Personalized skincare and prevention plans'
    ]
  },
  'Dentistry': {
    intro: 'Dentistry at CareSync focuses on maintaining healthy, confident smiles through advanced preventive and restorative care. Our dental team provides comprehensive examinations and personalized treatment plans to ensure optimal oral health for every patient.',
    features: [
      'Comprehensive dental examinations',
      'Professional teeth cleaning and plaque removal',
      'Cavity detection and tooth-colored fillings',
      'Gum disease prevention and treatment',
      'Personalized oral hygiene guidance'
    ]
  },
  'Gynecology': {
    intro: 'Gynecology at CareSync provides comprehensive and compassionate care for women\'s health at every stage of life. Our specialists focus on preventive care, early diagnosis, and personalized treatment to support your well-being and confidence.',
    features: [
      'Routine gynecological examinations',
      'Pap smear and cervical cancer screening',
      'Diagnosis and treatment of hormonal disorders',
      'Menstrual and reproductive health care',
      'Family planning and contraceptive counseling'
    ]
  },
  'Orthopedics': {
    intro: 'Orthopedics at CareSync focuses on diagnosing and treating conditions related to bones, joints, muscles, and ligaments. Our specialists provide advanced care to relieve pain, restore mobility, and improve your quality of life.',
    features: [
      'Diagnosis and treatment of bone and joint disorders',
      'Sports injury management',
      'Fracture care and rehabilitation',
      'Treatment of back, neck, and joint pain',
      'Personalized recovery and physiotherapy plans'
    ]
  },
  'Cardiology': {
    intro: 'Cardiology at CareSync is dedicated to protecting and strengthening your heart health. Our specialists provide comprehensive cardiac evaluations, early detection of heart conditions, and personalized treatment plans using advanced diagnostic technology.',
    features: [
      'Comprehensive heart health assessments',
      'ECG and cardiac diagnostic testing',
      'Management of hypertension and cholesterol',
      'Diagnosis and treatment of heart diseases',
      'Preventive cardiology and lifestyle guidance'
    ]
  },
  'ENT': {
    intro: 'ENT at CareSync provides specialized care for conditions affecting the ear, nose, and throat. Our specialists use advanced diagnostic tools to accurately assess symptoms and deliver effective treatment for both acute and chronic conditions.',
    features: [
      'Diagnosis and treatment of ear infections and hearing issues',
      'Management of sinusitis and nasal allergies',
      'Treatment of sore throat and tonsillitis',
      'Voice and swallowing disorder evaluation',
      'Preventive care and long-term condition management'
    ]
  },
};

export const serviceDetails: Record<string, { duration: string; price: string }> = {
  'General Medicine': { duration: '30 Minutes', price: 'Starting from 300 EGP' },
  'Pediatrics': { duration: '30 Minutes', price: 'Starting from 250 EGP' },
  'Dermatology': { duration: '30-45 Minutes', price: 'Starting from 500 EGP' },
  'Dentistry': { duration: '45 Minutes', price: 'Starting from 450 EGP' },
  'Gynecology': { duration: '45 Minutes', price: 'Starting from 450 EGP' },
  'Orthopedics': { duration: '45-60 Minutes', price: 'Starting from 550 EGP' },
  'Cardiology': { duration: '60 Minutes', price: 'Starting from 600 EGP' },
  'ENT': { duration: '30-40 Minutes', price: 'Starting from 400 EGP' },
};
