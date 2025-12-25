# Authentication System Documentation

This document explains how to use the custom authentication system implemented in this Docusaurus project.

## Overview

The authentication system uses React Context API with localStorage for session persistence. It includes:

- User registration with validation
- User login/logout functionality
- Session management with expiration
- Password hashing (using base64 encoding)
- Protected routes with AuthGuard
- Beautiful UI components with glassmorphism design

## Core Components

### AuthProvider

The main authentication context provider that manages the authentication state.

```jsx
import { AuthProvider } from './contexts/AuthProvider';

// Wrap your app with the AuthProvider
<AuthProvider>
  <App />
</AuthProvider>
```

### useAuth Hook

Custom hook to access authentication functions and state:

```jsx
import { useAuth } from './contexts/AuthProvider';

const MyComponent = () => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    signin,
    signout,
    checkAuth
  } = useAuth();

  // Use authentication functions
};
```

### UserProvider

Manages user profile data and related functions:

```jsx
import { UserProvider } from './contexts/UserContext';

<UserProvider>
  <App />
</UserProvider>
```

### useUser Hook

Custom hook to access user data:

```jsx
import { useUser } from './contexts/UserContext';

const MyComponent = () => {
  const { user, isAuthenticated, loading, error } = useUser();

  // Access user information
};
```

## Authentication Functions

### Signup

Registers a new user with validation:

```jsx
const result = await signup({
  username: 'johndoe',
  password: 'password123',
  softwareBackground: 'Intermediate',
  hardwareBackground: 'Raspberry Pi, Arduino',
  skills: ['JavaScript', 'React', 'Python'],
  experience: 'intermediate'
});

if (result.success) {
  console.log('User registered:', result.user);
} else {
  console.error('Registration failed:', result.error);
}
```

### Signin

Authenticates a user:

```jsx
const result = await signin('johndoe', 'password123');

if (result.success) {
  console.log('Login successful:', result.user);
} else {
  console.error('Login failed:', result.error);
}
```

### Signout

Logs out the current user:

```jsx
const result = await signout();

if (result.success) {
  console.log('Logout successful');
}
```

### Check Auth

Checks if a user is authenticated:

```jsx
const { isAuthenticated, user } = checkAuth();

if (isAuthenticated) {
  console.log('User is authenticated:', user);
} else {
  console.log('User is not authenticated');
}
```

## Validation Logic

The system includes comprehensive validation:

- Username: minimum 3 characters, unique
- Password: minimum 6 characters, confirmation match
- All fields required for registration
- Error handling with detailed messages

## Session Persistence

- Session stored in localStorage with 7-day expiration
- Auto-login if valid session exists
- Session maintained across page refreshes
- Storage change listeners for cross-tab logout

## Protected Routes

Use the AuthGuard component to protect routes:

```jsx
import AuthGuard from './utils/AuthGuard';

const App = () => {
  return (
    <AuthGuard>
      <YourProtectedComponent />
    </AuthGuard>
  );
};
```

## Error Handling

The system provides detailed error messages and handles:

- Invalid credentials
- Username already exists
- Validation failures
- Session expiration
- Network errors

## Data Structure

User data is stored in localStorage with the following structure:

```json
{
  "id": "user_unique_id",
  "username": "string",
  "password": "hashed",
  "softwareBackground": "string",
  "hardwareBackground": "string",
  "skills": ["array", "of", "skills"],
  "experience": "string",
  "isAuthenticated": true,
  "createdAt": "timestamp",
  "expiresAt": "timestamp"
}
```

## Authentication UI Components

### AuthModal

The main authentication modal with signup/signin forms:

- Full-screen overlay with centered modal
- Toggle between signup and signin forms
- Beautiful glassmorphism design with animations
- Form validation with inline errors
- Loading states during auth
- Success/error toast notifications
- Responsive design for all screen sizes

### UserMenu

A navbar component showing user info and logout:

- Displays user's username and avatar
- Shows user profile summary on hover
- Provides logout functionality
- Responsive design for mobile and desktop

## Security Considerations

- Passwords are hashed using base64 encoding (not production-ready)
- Sessions expire after 7 days
- All user data is stored client-side in localStorage
- For production use, implement proper server-side authentication

## Custom Hooks

### useUserData

A specialized hook for managing user profile data:

```jsx
import { useUserData } from './hooks/useUserData';

const MyComponent = () => {
  const {
    userData,
    loading,
    error,
    updateUserData,
    getUserField
  } = useUserData();

  // Access and update user profile data
};
```

This authentication system provides a complete solution for user management in your Docusaurus project with proper state management, validation, session persistence, and beautiful UI components.