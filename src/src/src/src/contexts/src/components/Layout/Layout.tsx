import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useTheme } from '../../contexts/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { resolvedTheme } = useTheme()

  return (
    <div className={`flex h-screen ${resolvedTheme === 'dark' ? 'dark' : ''}`}>
      <div className={`flex h-screen ${resolvedTheme === 'dark' ? 'bg-dark-950' : 'bg-gray-50'}`}>
        {/* Mobile sidebar overlay */}
        <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div 
            className="fixed inset-0 bg-gray-600 dark:bg-dark-900 bg-opacity-75 dark:bg-opacity-75" 
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
