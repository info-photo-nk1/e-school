import React from 'react';
import { Menu } from 'lucide-react';
import LanguageMenu from './LanguageMenu';
import { useTranslation } from '../hooks/useTranslation';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">SkillsAI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">{t('nav.courses')}</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">{t('nav.community')}</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">{t('nav.enterprise')}</a>
            <LanguageMenu />
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg">
              {t('nav.signIn')}
            </button>
            <button className="hidden md:block px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg">
              {t('nav.getStarted')}
            </button>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;