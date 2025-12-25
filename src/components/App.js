import React from 'react';
import { UserProvider } from './contexts/UserContext';

// This is the main App component that wraps the entire application
// It provides the user context to all components in the application
export default function App({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}