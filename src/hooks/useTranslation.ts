import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { get } from 'lodash-es';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string) => {
    const translation = get(
      translations[currentLanguage.code as keyof typeof translations] || translations.en,
      key,
      get(translations.en, key, key)
    );
    return translation;
  };

  return { t };
};