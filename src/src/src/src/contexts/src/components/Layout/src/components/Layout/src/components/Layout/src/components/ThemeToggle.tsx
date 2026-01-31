import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const themes = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: ComputerDesktopIcon },
  ]

  const Icon = themes.find(t => t.value === theme)?.icon || SunIcon

  return (
    <div className="relative group">
      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
        <Icon className="w-5 h-5 text-gray-600 dark:text-dark-300" />
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-2">
          {themes.map(({ value, label, icon: ThemeIcon }) => (
            <button
              key={value}
              onClick={() => setTheme(value as any)}
              className={`w-full px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-dark-700 ${
                theme === value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-dark-300'
              }`}
            >
              <ThemeIcon className="w-4 h-4" />
              <span>{label}</span>
              {theme === value && (
                <span className="ml-auto">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
