import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import ThemeToggle from '../ThemeToggle'
import LanguageSwitcher from '../LanguageSwitcher'
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CogIcon,
  CreditCardIcon,
  BellIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { resolvedTheme } = useTheme()
  const { logout } = useAuth()

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/users' },
    { name: 'Products', icon: ShoppingBagIcon, path: '/products' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
    { name: 'Orders', icon: CreditCardIcon, path: '/orders' },
    { name: 'Reports', icon: DocumentTextIcon, path: '/reports' },
    { name: 'Notifications', icon: BellIcon, path: '/notifications' },
    { name: 'Settings', icon: CogIcon, path: '/settings' },
  ]

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-900' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-700'
  const hoverBg = resolvedTheme === 'dark' ? 'hover:bg-dark-800' : 'hover:bg-gray-50'
  const hoverText = resolvedTheme === 'dark' ? 'hover:text-white' : 'hover:text-blue-600'

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 ${bgColor} border-r ${borderColor}`}>
        <div className={`flex items-center h-16 px-6 border-b ${borderColor}`}>
          <h1 className={`text-xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Admin Panel
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 ${textColor} rounded-lg ${hoverBg} ${hoverText} group transition-colors`}
                onClick={onClose}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className={`p-4 border-t ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-3 ${textColor} rounded-lg ${hoverBg} ${hoverText} transition-colors mb-2`}
          >
            <UserCircleIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Profile</span>
          </Link>
          <button 
            onClick={logout}
            className={`flex items-center w-full px-4 py-3 ${textColor} rounded-lg ${hoverBg} hover:text-red-600 transition-colors`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${bgColor}`}>
        <div className={`flex items-center justify-between h-16 px-6 border-b ${borderColor}`}>
          <h1 className={`text-xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Admin Panel
          </h1>
          <button onClick={onClose} className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 ${textColor} rounded-lg ${hoverBg} ${hoverText} transition-colors`}
                onClick={onClose}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <button 
            onClick={logout}
            className={`flex items-center w-full px-4 py-3 ${textColor} rounded-lg ${hoverBg} hover:text-red-600 transition-colors`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
