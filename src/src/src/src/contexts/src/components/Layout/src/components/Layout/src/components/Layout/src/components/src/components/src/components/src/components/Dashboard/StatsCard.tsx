import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  const { resolvedTheme } = useTheme()

  const colorClasses = {
    blue: resolvedTheme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600',
    green: resolvedTheme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600',
    purple: resolvedTheme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600',
    orange: resolvedTheme === 'dark' ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600',
  }

  const changeColor = change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  const changeIcon = change >= 0 ? '↗' : '↘'

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-800' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'
  const subTextColor = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-500'

  return (
    <div className={`${bgColor} rounded-xl border ${borderColor} p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-sm ${subTextColor} font-medium`}>{title}</p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className={`${changeColor} font-medium`}>
          {changeIcon} {Math.abs(change)}%
        </span>
        <span className={`${subTextColor} ml-2`}>from last month</span>
      </div>
    </div>
  )
}

export default StatsCard
