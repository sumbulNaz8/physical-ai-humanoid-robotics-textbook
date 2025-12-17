# Chapter Content Personalization Feature

## Overview
This feature allows logged-in users to personalize chapter content according to their preferences. The system uses a WritingAgent to transform content in real-time based on user preferences such as difficulty level, interests, and personalization options. The implementation uses a simple authentication system with localStorage/sessionStorage for user management.

## Features
- **Personalize Content Button**: Appears at the beginning of each chapter for logged-in users
- **Dynamic Content Transformation**: Modifies content based on user preferences in real-time
- **User Preferences Management**: Allows customization of difficulty level, interests, and personalization options
- **Simple Authentication**: Uses localStorage/sessionStorage for user management
- **WritingAgent Integration**: Uses existing WritingAgent methods for content transformation
- **Comprehensive Logging**: Logs all personalization events with user details

## Components

### PersonalizationProcessor
- Handles direct content transformations
- Emphasizes user interests in content
- Includes user's name in content
- Applies difficulty-based transformations

### WritingAgent Integration
- Uses the existing WritingAgent for style transformations
- Applies simple and detailed styles based on preferences
- Maintains consistency with existing architecture

### Authentication System
- Simple authentication using localStorage/sessionStorage
- Stores user preferences in browser storage
- Provides session management
- Follows security best practices

### UI Components
- PersonalizeButton: Renders the personalization button
- PersonalizationProvider: Context provider for personalization state
- PersonalizationDemo: Complete demo page showing all features

## How it Works

1. User logs in to the system (credentials stored in localStorage/sessionStorage)
2. User accesses a chapter page containing the "Personalize Content" button
3. User adjusts preferences (difficulty, interests, name inclusion)
4. When clicking "Personalize Content", the system:
   - Fetches user preferences from browser storage
   - Applies transformations using PersonalizationProcessor
   - Uses WritingAgent for style transformations
   - Updates the chapter content in real-time
   - Saves updated preferences to browser storage
   - Logs the personalization event

## File Structure
```
frontend/
├── src/
│   ├── agents/
│   │   └── writing_agent.js              # WritingAgent implementation
│   ├── components/
│   │   └── ContentPersonalizer/
│   │       └── PersonalizeButton.js      # Main personalization button component
│   ├── pages/
│   │   ├── ui-chapter.js                 # Chapter page with personalization integration
│   │   └── personalization-demo.js       # Demo page for personalization
│   └── utils/
│       └── personalization-utilities.js  # Utility functions and services
```

## Setup Instructions

To run the development server:
```bash
cd frontend
npm run start
```

## Demo
Check out the personalization demo at `/personalization-demo` to see the feature in action.

## Logging
All personalization events are logged to the browser console with:
- User name
- Applied preferences
- Chapter title
- Timestamp

## Security
- Personalization is only available to authenticated users
- User preferences are stored in browser storage
- Simple authentication system with localStorage/sessionStorage
- No sensitive data is exposed through the personalization process

## Robustness
- Handles empty or invalid user preferences gracefully
- Works with any chapter content
- Provides error handling and user feedback
- Fallbacks for unauthenticated users