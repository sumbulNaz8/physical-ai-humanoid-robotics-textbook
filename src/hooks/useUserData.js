import { useState, useEffect } from 'react';

// Custom hook for managing user data
export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    // Listen for storage changes (user data updated in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        try {
          const updatedUser = e.newValue ? JSON.parse(e.newValue) : null;
          setUserData(updatedUser);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update user data
  const updateUserData = (updatedData) => {
    try {
      if (!userData) {
        throw new Error('No user data available to update');
      }

      const updatedUser = {
        ...userData,
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      // Update in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update local state
      setUserData(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message);
      console.error('Error updating user data:', err);
      return { success: false, error: err.message };
    }
  };

  // Get specific user field
  const getUserField = (field) => {
    return userData ? userData[field] : null;
  };

  return {
    userData,
    loading,
    error,
    updateUserData,
    getUserField
  };
};