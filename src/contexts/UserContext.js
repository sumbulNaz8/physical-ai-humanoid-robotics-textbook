// src/contexts/UserContext.js
// Context provider for user authentication state

import React from 'react';
import { AuthUtils } from '../utils/auth';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  LOGOUT: 'LOGOUT'
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};

// Create context
const UserContext = React.createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {}
});

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  // Check authentication status on mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });

      try {
        const user = AuthUtils.getCurrentUser();
        if (user) {
          dispatch({ type: actionTypes.SET_USER, payload: user });
        } else {
          dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser' && e.newValue === null) {
        dispatch({ type: actionTypes.LOGOUT });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = async (userData, rememberMe = false) => {
    try {
      AuthUtils.login(userData, rememberMe);
      dispatch({ type: actionTypes.SET_USER, payload: userData });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      AuthUtils.logout();
      dispatch({ type: actionTypes.LOGOUT });
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const result = AuthUtils.register(userData);
      if (result.success) {
        dispatch({ type: actionTypes.SET_USER, payload: result.user });
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user function
  const updateUser = async (updatedData) => {
    try {
      const result = AuthUtils.updateUserProfile(updatedData);
      if (result.success) {
        dispatch({ type: actionTypes.SET_USER, payload: result.user });
      }
      return result;
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  };

  const contextValue = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    logout,
    register,
    updateUser
  };

  return React.createElement(
    UserContext.Provider,
    { value: contextValue },
    children
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};