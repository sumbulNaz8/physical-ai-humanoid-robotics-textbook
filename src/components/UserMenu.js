import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useUser } from '../contexts/UserContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, isAuthenticated, loading } = useUser();
  const { signout } = useAuth();

  if (loading) {
    return <div className="user-menu-loading">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return null; // Don't show menu if not authenticated
  }

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      const result = await signout();
      if (result.success) {
        // The auth modal will automatically appear after logout
        // due to the auth state change
      }
    }
  };

  return (
    <div className="user-menu">
      <div className="user-info">
        <span className="user-avatar">👤</span>
        <span className="user-name">{user.username}</span>
      </div>
      <div className="user-dropdown">
        <div className="user-dropdown-content">
          <div className="user-profile-summary">
            <p><strong>Software:</strong> {user.softwareBackground}</p>
            <p><strong>Hardware:</strong> {user.hardwareBackground}</p>
            <p><strong>Experience:</strong> {user.experience}</p>
            <p><strong>Skills:</strong> {user.skills?.join(', ')}</p>
          </div>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;