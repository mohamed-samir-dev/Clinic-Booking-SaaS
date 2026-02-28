export const getText = (text: string | { en: string; ar: string } | undefined, locale: string = 'en'): string => {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[locale as keyof typeof text] || text.en || '';
};
