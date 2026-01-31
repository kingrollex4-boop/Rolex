import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  avatar?: string
}

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  updateProfile: (user: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        
        if (token && userStr) {
          const user = JSON.parse(userStr)
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          setState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Failed to load user:', error)
        setState(prev => ({ ...prev, isLoading: false }))
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User'
      }
      
      const mockToken = 'mock-jwt-token-123456'
      
      // Store in localStorage
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      setState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const register = useCallback(async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '2',
        email: data.email,
        name: data.name,
        role: 'viewer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`
      }
      
      const mockToken = 'mock-jwt-token-register-123456'
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      setState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      })
    } catch (error) {
      console.error('Logout failed:', error)
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    if (!state.user) return
    
    const updatedUser = { ...state.user, ...userData }
    
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    setState(prev => ({
      ...prev,
      user: updatedUser
    }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
