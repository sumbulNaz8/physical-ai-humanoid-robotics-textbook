import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the user context
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  // Function to sign in user
  const signin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        return { success: true };
      } else {
        return { success: false, error: data.detail || 'Signin failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Function to sign up user
  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:8001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // For signup, redirect to signin page instead of setting user directly
        return { success: true };
      } else {
        return { success: false, error: data.detail || 'Signup failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Function to sign out user
  const signout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to get current user data
  const getCurrentUser = () => {
    return user;
  };

  // Value object to provide to consumers
  const value = {
    user,
    signin,
    signup,
    signout,
    getCurrentUser,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};