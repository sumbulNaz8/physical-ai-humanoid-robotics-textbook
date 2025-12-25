import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useUser } from '../contexts/UserContext';

const AuthStatus = () => {
  const { user, isAuthenticated, loading } = useUser();
  const { signout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h3>Not Signed In</h3>
        <p>Please sign in to access personalized content.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Welcome, {user?.username}!</h3>
      <p>Software Background: {user?.softwareBackground}</p>
      <p>Hardware Background: {user?.hardwareBackground}</p>
      <p>Skills: {user?.skills?.join(', ')}</p>
      <p>Experience: {user?.experience}</p>
      <button onClick={signout}>Sign Out</button>
    </div>
  );
};

export default AuthStatus;