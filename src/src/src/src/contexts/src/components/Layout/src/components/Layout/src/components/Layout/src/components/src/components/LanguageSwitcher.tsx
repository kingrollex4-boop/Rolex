import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext'
import {
  GlobeAltIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const { resolvedTheme } = useTheme()

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="relative group">
      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors flex items-center space-x-2">
        <GlobeAltIcon className="w-5 h-5 text-gray-600 dark:text-dark-300" />
        <span className="text-sm font-medium hidden md:inline">{currentLanguage.name}</span>
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => i18n.changeLanguage(language.code)}
              className={`w-full px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-dark-700 ${
                i18n.language === language.code 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-dark-300'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <span className="ml-auto">
                  <CheckIcon className="w-4 h-4" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
