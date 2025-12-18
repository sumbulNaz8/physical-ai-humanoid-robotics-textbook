// src/components/UserMenu/UserMenu.js
// User authentication menu component for Docusaurus

import React from 'react';
import { useUser } from '@site/src/contexts/UserContext';
import Link from '@docusaurus/Link';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  if (isAuthenticated && user) {
    // Authenticated user view
    return (
      <div className="dropdown dropdown--right dropdown--nocaret">
        <button 
          className="button button--secondary button--sm dropdown__toggle"
          aria-label="User menu"
          type="button"
        >
          <span className="user-initial" style={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#fbbf24',
            color: '#000',
            textAlign: 'center',
            lineHeight: '24px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginRight: '8px'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </span>
          {user.name || user.username || 'User'}
        </button>
        <ul className="dropdown__menu">
          <li>
            <Link className="dropdown__link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown__link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="dropdown__link" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <button 
              className="dropdown__link" 
              onClick={handleLogout}
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    // Unauthenticated user view
    return (
      <div className="auth-buttons">
        <Link
          className="button button--outline button--primary button--sm"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="button button--primary button--sm"
          to="/register"
          style={{ marginLeft: '8px' }}
        >
          Register
        </Link>
      </div>
    );
  }
};

export default UserMenu;