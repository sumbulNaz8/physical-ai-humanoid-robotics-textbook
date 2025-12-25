# Authentication UI Components

This document explains how to use the authentication UI components implemented in this Docusaurus project.

## Overview

The authentication UI includes:

- A full-screen modal with signup/signin forms
- Beautiful glassmorphism design with animations
- Complete form validation
- User profile management
- Integration with the authentication context

## Components

### AuthModal

The main authentication modal that handles both signup and signin flows.

```jsx
import AuthModal from './components/AuthModal';

// The AuthModal is automatically integrated via the Root wrapper
// You don't need to manually add it to your pages
```

### UserMenu

A navbar component that displays user information and logout functionality.

```jsx
import UserMenu from './components/UserMenu';

// Use in your navbar
const Navbar = () => {
  return (
    <nav>
      {/* Other navbar items */}
      <UserMenu />
    </nav>
  );
};
```

## Integration

### Root Component

The authentication system is integrated at the root level through the `src/theme/Root.js` file, which wraps the entire application and automatically shows the auth modal when a user is not authenticated.

### Styling

All components use Tailwind-inspired CSS with:

- Glassmorphism effects
- Smooth animations
- Responsive design
- Dark mode support
- Toast notifications

## Features

### Form Fields

#### Signup Form:
- Username (with validation)
- Password (with show/hide toggle)
- Confirm Password
- Software Background (select dropdown)
- Hardware Background (textarea)
- Skills (multi-select with tags)
- Experience (select dropdown)

#### Signin Form:
- Username
- Password
- "Don't have an account?" link

### Validation

All forms include client-side validation with:
- Inline error messages
- Real-time validation
- Required field checks
- Password confirmation matching

### User Experience

- Smooth fade-in animations
- Loading states during auth operations
- Success/error toast notifications
- Responsive design for all screen sizes
- Dark mode support

## Customization

You can customize the appearance by modifying the CSS files:

- `src/components/AuthModal.css`
- `src/components/UserMenu.css`

The components are built with CSS variables for easy theming:

```css
:root {
  --auth-primary-color: #fbbf24;
  --auth-bg-color: rgba(30, 41, 59, 0.95);
  --auth-text-color: #e2e8f0;
}
```

## Security Considerations

- Passwords are hashed using base64 encoding (for demo purposes)
- Sessions expire after 7 days
- All user data is stored client-side in localStorage
- For production, implement proper server-side authentication

## Usage in Docusaurus

The authentication system is automatically integrated into your Docusaurus site through the theme system. The auth modal will appear when:

1. A user visits the site and is not authenticated
2. A user's session expires
3. A user manually triggers authentication

The UserMenu component can be added to your navbar to show user information and provide logout functionality.