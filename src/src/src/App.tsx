import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

// Layout
import Layout from './components/Layout/Layout'

// Pages
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* 404 - Add NotFound component later */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
