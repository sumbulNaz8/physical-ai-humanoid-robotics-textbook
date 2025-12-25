import React from 'react';
import { useAuth } from './AuthModal';

const LogoutButton = () => {
  const { user, signout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    signout();
    window.location.reload(); // Refresh the page to show the auth modal again
  };

  return (
    <div style={logoutContainerStyle}>
      <span style={welcomeTextStyle}>Welcome, {user.username}!</span>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;

// Styles
const logoutContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'rgba(251, 191, 36, 0.1)',
  border: '1px solid rgba(251, 191, 36, 0.3)',
  borderRadius: '6px',
  color: '#fbbf24'
};

const welcomeTextStyle = {
  fontSize: '0.9rem',
  fontWeight: '500'
};

const logoutButtonStyle = {
  padding: '0.4rem 0.8rem',
  backgroundColor: '#fbbf24',
  color: '#0f172a',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  transition: 'background-color 0.2s'
};