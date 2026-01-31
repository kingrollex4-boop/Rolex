import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import {
  UserCircleIcon,
  CameraIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth()
  const { resolvedTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Full-stack developer passionate about creating beautiful user interfaces.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    twitter: '@username',
  })
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile({ name: profile.name, email: profile.email })
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const bgColor = resolvedTheme === 'dark' ? 'bg-dark-800' : 'bg-white'
  const borderColor = resolvedTheme === 'dark' ? 'border-dark-700' : 'border-gray-200'
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'
  const subTextColor = resolvedTheme === 'dark' ? 'text-dark-300' : 'text-gray-500'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
        <p className="text-gray-600 dark:text-dark-300 mt-2">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-1">
          <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-lg">
                  <img
                    src={avatarPreview || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <CameraIcon className="w-4 h-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <h2 className={`mt-4 text-xl font-semibold ${textColor}`}>{user?.name}</h2>
              <p className={subTextColor}>{user?.email}</p>
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full inline-block">
                {user?.role?.toUpperCase()}
              </p>

              <div className="mt-6 space-y-3">
                <div className="text-left">
                  <p className={`text-sm ${subTextColor}`}>Member Since</p>
                  <p className={`font-medium ${textColor}`}>January 2024</p>
                </div>
                <div className="text-left">
                  <p className={`text-sm ${subTextColor}`}>Last Login</p>
                  <p className={`font-medium ${textColor}`}>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className={`mt-6 ${bgColor} rounded-xl border ${borderColor} p-6`}>
            <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Security</h3>
            <div className="space-y-4">
              <button className={`w-full text-left p-3 border ${borderColor} rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors`}>
                <p className={`font-medium ${textColor}`}>Change Password</p>
                <p className={`text-sm ${subTextColor}`}>Update your password regularly</p>
              </button>
              <button className={`w-full text-left p-3 border ${borderColor} rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors`}>
                <p className={`font-medium ${textColor}`}>Two-Factor Authentication</p>
                <p className={`text-sm ${subTextColor}`}>Add an extra layer of security</p>
              </button>
              <button className={`w-full text-left p-3 border ${borderColor} rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors`}>
                <p className={`font-medium ${textColor}`}>Login History</p>
                <p className={`text-sm ${subTextColor}`}>View recent login activity</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${textColor}`}>Personal Information</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    setProfile({
                      name: user?.name || '',
                      email: user?.email || '',
                      bio: 'Full-stack developer passionate about creating beautiful user interfaces.',
                      location: 'San Francisco, CA',
                      website: 'https://example.com',
                      twitter: '@username',
                    })
                  }
                  setIsEditing(!isEditing)
                }}
                className={`px-4 py-2 border ${borderColor} rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${subTextColor} mb-2`}>Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    Location
                  </label>
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    Website
                  </label>
                  <input
                    name="website"
                    type="url"
                    value={profile.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                  Twitter
                </label>
                <input
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border ${borderColor} rounded-lg disabled:bg-gray-50 dark:disabled:bg-dark-700 disabled:text-gray-500 dark:disabled:text-dark-400 ${resolvedTheme === 'dark' ? 'bg-dark-700 text-white' : 'bg-white'}`}
                  placeholder="@username"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-4 py-2 border ${borderColor} rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Notifications Settings */}
          <div className={`mt-6 ${bgColor} rounded-xl border ${borderColor} p-6`}>
            <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${textColor}`}>Email Notifications</p>
                  <p className={`text-sm ${subTextColor}`}>Receive email updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-dark-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${textColor}`}>Push Notifications</p>
                  <p className={`text-sm ${subTextColor}`}>Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-dark-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${textColor}`}>Marketing Emails</p>
                  <p className={`text-sm ${subTextColor}`}>Receive promotional emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-dark-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
