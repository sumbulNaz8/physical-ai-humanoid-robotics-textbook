import React from 'react';
import { UserProvider } from './contexts/UserContext';

// Root component that wraps the entire application
const Root = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default Root;