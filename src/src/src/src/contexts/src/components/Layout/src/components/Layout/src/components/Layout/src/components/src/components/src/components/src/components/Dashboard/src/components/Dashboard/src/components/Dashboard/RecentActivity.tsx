import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface Activity {
  id: number
  user: string
  action: string
  target: string
  time: string
  icon: string
}

const RecentActivity: React.FC = () => {
  const { resolvedTheme } = useTheme()

  const activities: Activity[] = [
    { id: 1, user: 'John Doe', action: 'added new product', target: 'iPhone 15 Pro', time: '2 min ago', icon: '🛍️' },
    { id: 2, user: 'Jane Smith', action: 'updated order status', target: '#ORD-7842', time: '15 min ago', icon: '📦' },
    { id: 3, user: 'Mike Johnson', action: 'commented on', target: 'Dashboard Design', time: '1 hour ago', icon: '💬' },
    { id: 4, user: 'Sarah Wilson', action: 'created new user', target: 'alex@example.com', time: '2 hours ago', icon: '👤' },
    { id: 5, user: 'Admin', action: 'updated settings', target: 'Payment Gateway', time: '5 hours ago', icon: '⚙️' },
  ]

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-800' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'
  const subTextColor = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-500'
  const hoverBg = resolvedTheme === 'dark' ? 'hover:bg-dark-700' : 'hover:bg-gray-50'

  return (
    <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
      <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className={`flex items-center space-x-3 p-3 ${hoverBg} rounded-lg transition-colors`}>
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-dark-700 rounded-full">
              <span className="text-sm">{activity.icon}</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm ${textColor}`}>
                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                <span className="text-blue-600 dark:text-blue-400 font-medium">{activity.target}</span>
              </p>
              <p className={`text-xs ${subTextColor} mt-1`}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={`w-full mt-6 py-2 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium border border-blue-200 dark:border-blue-900 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}>
        View All Activity
      </button>
    </div>
  )
}

export default RecentActivity
