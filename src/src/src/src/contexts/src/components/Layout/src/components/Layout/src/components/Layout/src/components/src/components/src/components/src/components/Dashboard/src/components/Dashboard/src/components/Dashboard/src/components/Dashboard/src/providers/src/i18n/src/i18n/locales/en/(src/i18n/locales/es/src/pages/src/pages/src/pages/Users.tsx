import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  avatar?: string
}

const Users: React.FC = () => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ role: '', status: '' })

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: 'Today, 09:42', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastActive: 'Yesterday', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'pending', lastActive: '2 days ago', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'active', lastActive: 'Today, 11:23', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'inactive', lastActive: '1 week ago', avatar: 'https://ui-avatars.com/api/?name=Alex+Brown' },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    const matchesRole = !filters.role || user.role === filters.role
    const matchesStatus = !filters.status || user.status === filters.status

    return matchesSearch && matchesRole && matchesStatus
  })

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('users.title')}
          </h1>
          <p className="text-gray-600 dark:text-dark-300 mt-1">Manage user accounts and permissions</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <UserPlusIcon className="w-4 h-4 mr-2" />
          {t('users.addUser')}
        </button>
      </div>

      {/* Filters */}
      <div className={`${bgColor} rounded-xl border ${borderColor} p-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('users.searchPlaceholder')}
                className={`w-full pl-10 pr-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="w-full md:w-48">
            <select
              className={`w-full px-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              className={`w-full px-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearch('')
              setFilters({ role: '', status: '' })
            }}
            className={`px-4 py-2 border ${borderColor} rounded-lg ${hoverBg} flex items-center justify-center`}
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Clear
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${bgColor} rounded-xl border ${borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
            <thead className={headerBg}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>User</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Role</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Last Active</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${bgColor} divide-y divide-gray-200 dark:divide-dark-700`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`${hoverBg} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${textColor}`}>{user.name}</div>
                        <div className={`text-sm ${subTextColor}`}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium ${
                      user.role === 'admin'
                        ? resolvedTheme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800'
                        : user.role === 'editor'
                        ? resolvedTheme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                        : resolvedTheme === 'dark' ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800'
                    } rounded-full`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${subTextColor}`}>
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300" title="View">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-6 py-4 border-t ${borderColor} flex items-center justify-between`}>
          <div className={`text-sm ${subTextColor}`}>
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">{filteredUsers.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className={`px-3 py-1 border ${borderColor} rounded-md text-sm ${hoverBg}`}>
              Previous
            </button>
            <button className="px-3 py-1 border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-sm">
              1
            </button>
            <button className={`px-3 py-1 border ${borderColor} rounded-md text-sm ${hoverBg}`}>
              2
            </button>
            <button className={`px-3 py-1 border ${borderColor} rounded-md text-sm ${hoverBg}`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
