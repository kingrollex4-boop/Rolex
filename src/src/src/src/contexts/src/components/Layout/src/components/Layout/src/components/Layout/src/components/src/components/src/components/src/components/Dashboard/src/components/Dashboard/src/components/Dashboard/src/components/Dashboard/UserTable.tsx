import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
}

const UserTable: React.FC = () => {
  const { resolvedTheme } = useTheme()

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: 'Today, 09:42' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastLogin: 'Yesterday' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'pending', lastLogin: '2 days ago' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'active', lastLogin: 'Today, 11:23' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'inactive', lastLogin: '1 week ago' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return resolvedTheme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
      case 'inactive': return resolvedTheme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
      case 'pending': return resolvedTheme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
      default: return resolvedTheme === 'dark' ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800'
    }
  }

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-800' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'
  const subTextColor = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-500'
  const headerBg = resolvedTheme === 'dark' ? 'bg-dark-700' : 'bg-gray-50'
  const headerText = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-500'
  const hoverBg = resolvedTheme === 'dark' ? 'hover:bg-dark-700' : 'hover:bg-gray-50'

  return (
    <div className={`${bgColor} rounded-xl border ${borderColor} overflow-hidden`}>
      <div className={`px-6 py-4 border-b ${borderColor} flex justify-between items-center`}>
        <h3 className={`text-lg font-semibold ${textColor}`}>Recent Users</h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
          <thead className={headerBg}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Role</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Last Login</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`${bgColor} divide-y divide-gray-200 dark:divide-dark-700`}>
            {users.map((user) => (
              <tr key={user.id} className={`${hoverBg} transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${textColor}`}>{user.name}</div>
                      <div className={`text-sm ${subTextColor}`}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium ${resolvedTheme === 'dark' ? 'bg-dark-700 text-dark-300' : 'bg-gray-100 text-gray-800'} rounded-full`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${subTextColor}`}>
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">Edit</button>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
