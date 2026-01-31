import React, { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline'

interface TopbarProps {
  onMenuClick: () => void
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-800' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'

  return (
    <header className={`${bgColor} border-b ${borderColor}`}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className={`relative p-2 ${textColor} hover:text-gray-700 dark:hover:text-gray-300`}>
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden md:block">
              <p className={`text-sm font-medium ${textColor}`}>{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-dark-300">{user?.role || 'Admin'}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
