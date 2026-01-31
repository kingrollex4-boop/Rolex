import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  sales: number
}

const Products: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const [search, setSearch] = useState('')

  const products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', price: 999, stock: 45, status: 'in_stock', sales: 120 },
    { id: 2, name: 'MacBook Air M2', category: 'Electronics', price: 1199, stock: 12, status: 'low_stock', sales: 85 },
    { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249, stock: 0, status: 'out_of_stock', sales: 230 },
    { id: 4, name: 'Nike Air Max', category: 'Fashion', price: 129, stock: 67, status: 'in_stock', sales: 89 },
    { id: 5, name: 'Samsung Galaxy S23', category: 'Electronics', price: 799, stock: 34, status: 'in_stock', sales: 156 },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return resolvedTheme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
      case 'low_stock': return resolvedTheme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock': return resolvedTheme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
      default: return resolvedTheme === 'dark' ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return 'In Stock'
      case 'low_stock': return 'Low Stock'
      case 'out_of_stock': return 'Out of Stock'
      default: return status
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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-dark-300 mt-1">Manage your products and inventory</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${subTextColor}`}>Total Products</p>
              <p className={`text-2xl font-bold ${textColor} mt-1`}>{products.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <ShoppingBagIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${subTextColor}`}>Out of Stock</p>
              <p className={`text-2xl font-bold ${textColor} mt-1`}>
                {products.filter(p => p.status === 'out_of_stock').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${subTextColor}`}>Low Stock</p>
              <p className={`text-2xl font-bold ${textColor} mt-1`}>
                {products.filter(p => p.status === 'low_stock').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${subTextColor}`}>Total Sales</p>
              <p className={`text-2xl font-bold ${textColor} mt-1`}>
                ${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Table */}
      <div className={`${bgColor} rounded-xl border ${borderColor} overflow-hidden`}>
        <div className={`p-4 border-b ${borderColor} flex justify-between items-center`}>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full pl-10 pr-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <select className={`px-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}>
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Garden</option>
            </select>
            <select className={`px-4 py-2 border ${borderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}>
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
            <thead className={headerBg}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Product</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Category</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Price</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Stock</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Sales</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${headerText} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${bgColor} divide-y divide-gray-200 dark:divide-dark-700`}>
              {filteredProducts.map((product) => (
                <tr key={product.id} className={`${hoverBg} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-dark-700 rounded flex items-center justify-center">
                        <ShoppingBagIcon className="w-6 h-6 text-gray-500 dark:text-dark-400" />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${textColor}`}>{product.name}</div>
                        <div className={`text-sm ${subTextColor}`}>SKU: PROD-{product.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${subTextColor}`}>
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${textColor}`}>${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${textColor}`}>{product.stock} units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${textColor}`}>{product.sales} sold</div>
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
      </div>
    </div>
  )
}

export default Products
