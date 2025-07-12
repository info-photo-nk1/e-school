import { useLanguage } from '../contexts/LanguageContext';
import { translations, getNestedValue } from '../translations';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string): string => {
    try {
      // Get translation for current language
      const currentTranslations = translations[currentLanguage.code as keyof typeof translations];
      if (currentTranslations) {
        const translation = getNestedValue(currentTranslations, key);
        if (translation && translation !== key) {
          return translation;
        }
      }
      
      // Fallback to English
      const englishTranslation = getNestedValue(translations.en, key);
      if (englishTranslation && englishTranslation !== key) {
        return englishTranslation;
      }
      
      // Return key if no translation found
      console.warn(`Translation missing for key: ${key}`);
      return key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return { t, currentLanguage };
};