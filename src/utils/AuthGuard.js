import React from 'react';
import { Navigate, useLocation } from '@docusaurus/router';
import { useUser } from '../contexts/UserContext';

// Component to protect routes
const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d0d0d',
        color: '#ffffff'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Define which routes are unprotected (can be accessed without authentication)
  const unprotectedRoutes = ['/auth'];

  // If not authenticated and trying to access a protected route, redirect to auth
  if (!isAuthenticated && !unprotectedRoutes.includes(location.pathname)) {
    // Store the attempted route in localStorage for redirect after login
    if (location.pathname !== '/' && location.pathname !== '/auth') {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
    return <Navigate to="/auth" replace />;
  }

  // If authenticated and on auth page, redirect to the originally requested page or home
  if (isAuthenticated && location.pathname === '/auth') {
    const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin'); // Clean up
    return <Navigate to={redirectPath} replace />;
  }

  // Allow access to routes for authenticated users or if on unprotected route
  return children;
};

export default AuthGuard;