import React from 'react'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-dark-300">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              sign in to existing account
            </Link>
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-dark-400">Registration page will be implemented here</p>
          <Link to="/login" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
