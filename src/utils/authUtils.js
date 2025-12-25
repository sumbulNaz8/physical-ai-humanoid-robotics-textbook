// src/utils/authUtils.js
// Authentication utility functions

// Hash function for password
export const hashPassword = (password) => {
  // Simple base64 encoding as requested - not secure for production
  return btoa(unescape(encodeURIComponent(password)));
};

// Validate user data during signup
export const validateUserData = (userData) => {
  const errors = [];

  if (!userData.username || userData.username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!userData.password || userData.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!userData.passwordConfirm || userData.password !== userData.passwordConfirm) {
    errors.push('Passwords do not match');
  }

  if (!userData.softwareBackground) {
    errors.push('Software background is required');
  }

  if (!userData.hardwareBackground) {
    errors.push('Hardware background is required');
  }

  if (!userData.skills || !Array.isArray(userData.skills) || userData.skills.length === 0) {
    errors.push('At least one skill is required');
  }

  if (!userData.experience) {
    errors.push('Experience level is required');
  }

  return errors;
};

// Check if username already exists
export const checkUsernameExists = (username) => {
  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  return allUsers.some(user => user.username === username);
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) return false;

  // Check if session is still valid
  if (user.expiresAt && new Date(user.expiresAt) > new Date()) {
    return true;
  }

  // Session expired, remove from storage
  localStorage.removeItem('currentUser');
  return false;
};

// Sign out user
export const signOutUser = () => {
  localStorage.removeItem('currentUser');
  return true;
};

// Update user profile
export const updateUserProfile = (updatedData) => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('No user is currently logged in');
  }

  const updatedUser = {
    ...user,
    ...updatedData,
    updatedAt: new Date().toISOString()
  };

  // Update in localStorage
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  return updatedUser;
};