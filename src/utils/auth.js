// src/utils/auth.js
// Authentication utility functions for the Physical AI & Humanoid Robotics Textbook

export const AuthUtils = {
  /**
   * Checks if a user is currently logged in
   * @returns {boolean} True if user is logged in, false otherwise
   */
  isLoggedIn: () => {
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  },

  /**
   * Gets the current user's information
   * @returns {Object|null} User object if logged in, null otherwise
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Logs a user in
   * @param {Object} user - User object to store
   * @param {boolean} rememberMe - Whether to persist beyond browser session
   */
  login: (user, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
  },

  /**
   * Logs the current user out
   */
  logout: () => {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  },

  /**
   * Gets user preferences
   * @returns {Object} User preferences or default values
   */
  getUserPreferences: () => {
    const user = AuthUtils.getCurrentUser();
    if (user && user.preferences) {
      return user.preferences;
    }
    // Default preferences
    return {
      difficulty: 'standard',
      language: 'en',
      interests: [],
      includeName: false,
      userName: user?.name || ''
    };
  },

  /**
   * Updates user preferences
   * @param {Object} newPreferences - New preference values
   * @returns {Object} Result object with success status
   */
  updateUserPreferences: (newPreferences) => {
    const user = AuthUtils.getCurrentUser();
    if (!user) {
      console.error('No user found for updating preferences');
      return { success: false, error: 'User not found' };
    }

    user.preferences = { ...user.preferences, ...newPreferences };

    // Update in storage
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    return { success: true };
  },

  /**
   * Registers a new user
   * @param {Object} userData - New user data
   * @returns {Object} Result object with success status
   */
  register: (userData) => {
    try {
      // Add registration timestamp
      const user = {
        ...userData,
        id: `user_${Date.now()}`,
        registeredAt: new Date().toISOString(),
        preferences: userData.preferences || {
          difficulty: 'standard',
          language: 'en',
          interests: [],
          includeName: false,
          userName: userData.name || userData.username || ''
        }
      };

      // Store user
      localStorage.setItem('currentUser', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Updates user profile information
   * @param {Object} updatedData - Updated user data
   * @returns {Object} Result object with success status
   */
  updateUserProfile: (updatedData) => {
    const user = AuthUtils.getCurrentUser();
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Update user data
    const updatedUser = {
      ...user,
      ...updatedData,
      updatedAt: new Date().toISOString()
    };

    // Update in storage
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    return { success: true, user: updatedUser };
  }
};