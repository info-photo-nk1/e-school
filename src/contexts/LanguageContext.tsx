import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../translations';

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  languages: Language[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // First, check localStorage for saved preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
          const language = languages.find(lang => lang.code === savedLanguage);
          if (language) {
            setCurrentLanguage(language);
            return;
          }
        }

        // Get user's preferred language from browser
        const browserLang = navigator.language.split('-')[0];
        
        // Try to get location-based language using IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code?.toLowerCase();
        
        // Map country code to language code (simplified mapping)
        const countryToLang: { [key: string]: string } = {
          jp: 'ja',
          kr: 'ko',
          cn: 'zh',
          tw: 'zh',
          br: 'pt',
        };
        
        // Use location-based language or fall back to browser language
        const detectedLang = countryCode ? (countryToLang[countryCode] || browserLang) : browserLang;
        
        // Find matching language or fall back to English
        const language = languages.find(lang => lang.code === detectedLang) || languages[0];
        setCurrentLanguage(language);
      } catch (error) {
        console.warn('Language detection failed:', error);
        // Fall back to browser language or English if detection fails
        const browserLang = navigator.language.split('-')[0];
        const language = languages.find(lang => lang.code === browserLang) || languages[0];
        setCurrentLanguage(language);
      }
    };

    detectLanguage();
  }, []);

  const setLanguage = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', code);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};