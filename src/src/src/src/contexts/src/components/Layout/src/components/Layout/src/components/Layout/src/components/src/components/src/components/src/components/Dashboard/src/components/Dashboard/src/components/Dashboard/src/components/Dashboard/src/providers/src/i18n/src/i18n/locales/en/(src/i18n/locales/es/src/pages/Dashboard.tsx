import React from 'react'
import { useTranslation } from 'react-i18next'
import StatsCard from '../components/Dashboard/StatsCard'
import RecentActivity from '../components/Dashboard/RecentActivity'
import UserTable from '../components/Dashboard/UserTable'
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-dark-300 mt-2">
          {t('dashboard.welcome')}! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('dashboard.totalRevenue')}
          value="$24,580"
          change={12.5}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title={t('dashboard.totalUsers')}
          value="1,248"
          change={8.2}
          icon={<UserGroupIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title={t('dashboard.totalOrders')}
          value="524"
          change={-3.1}
          icon={<ShoppingBagIcon className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title={t('dashboard.conversionRate')}
          value="3.24%"
          change={5.7}
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              {t('dashboard.revenueOverview')}
            </h3>
            <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg">
              <p className="text-gray-500 dark:text-dark-400">
                {t('dashboard.chartPlaceholder')}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Users Table */}
      <div>
        <UserTable />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Avg. Order Value</p>
          <p className="text-2xl font-bold mt-2">$89.42</p>
          <div className="flex items-center mt-4">
            <span className="text-sm opacity-90">↗ 12% increase</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Customer Satisfaction</p>
          <p className="text-2xl font-bold mt-2">94.2%</p>
          <div className="flex items-center mt-4">
            <span className="text-sm opacity-90">↗ 2.4% increase</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Returning Customers</p>
          <p className="text-2xl font-bold mt-2">68%</p>
          <div className="flex items-center mt-4">
            <span className="text-sm opacity-90">↗ 5.1% increase</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
