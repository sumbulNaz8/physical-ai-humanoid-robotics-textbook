import React, { useState, useContext } from 'react';
import { WritingAgent } from '../../agents/writing_agent'; // Import the WritingAgent
import { PersonalizationProcessor } from '../../utils/personalization-utilities';

// Simple authentication utility functions (replacing Better Auth)
const AuthUtils = {
  isLoggedIn: () => {
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

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

  updateUserPreferences: (newPreferences) => {
    const user = AuthUtils.getCurrentUser();
    if (!user) {
      console.error('No user found for updating preferences');
      return { success: false, error: 'User not found' };
    }

    user.preferences = newPreferences;

    // Update in storage
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    return { success: true };
  }
};

/**
 * Personalization context to share user preferences and personalization state across components
 */
const PersonalizationContext = React.createContext();

/**
 * Hook to use the personalization context
 */
export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

/**
 * Provider component for the personalization context
 */
export const PersonalizationProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    // Initialize preferences from auth service or default
    return AuthUtils.getUserPreferences();
  });

  const [personalizedContent, setPersonalizedContent] = useState(null);

  const value = {
    preferences,
    setPreferences,
    personalizedContent,
    setPersonalizedContent
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};

/**
 * Component that renders a "Personalize Content" button
 * When clicked, it modifies the chapter content based on user preferences
 */
const PersonalizeButton = ({ chapterContent, onContentChange, chapterTitle }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { preferences } = usePersonalization();

  // Check if user is logged in
  const isLoggedIn = AuthUtils.isLoggedIn();
  const currentUser = AuthUtils.getCurrentUser();

  // Log when personalization is applied
  const logPersonalization = (userName, preferences, chapterTitle) => {
    console.log(`[Personalization Log] User "${userName}" applied personalization:`, {
      preferences,
      chapterTitle,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Applies personalization to the chapter content based on user preferences
   * @param {string} content - Original chapter content
   * @param {Object} prefs - User preferences
   * @returns {string} - Personalized content
   */
  const applyPersonalization = (content, prefs) => {
    // First use the PersonalizationProcessor for direct transformations
    let personalizedContent = PersonalizationProcessor.personalizeContent(content, prefs);

    // Then use the WritingAgent for style transformations if needed
    if (prefs.difficulty) {
      const agent = new WritingAgent(prefs.difficulty);
      switch (prefs.difficulty) {
        case 'simple':
          // Apply simple style using the WritingAgent
          personalizedContent = agent.applyStyleGuide(personalizedContent, 'simple');
          break;
        case 'detailed':
          // Add more detail using the WritingAgent
          personalizedContent = agent.applyStyleGuide(personalizedContent, 'academic');
          break;
        default:
          // Standard content remains as processed by PersonalizationProcessor
          break;
      }
    }

    return personalizedContent;
  };

  /**
   * Handle the click event for personalizing content
   */
  const handlePersonalizeClick = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Check if user is logged in
      if (!isLoggedIn) {
        setError('You must be logged in to personalize content. Please log in first.');
        return;
      }

      // Apply personalization
      const originalContent = chapterContent || 'Default chapter content placeholder.';
      const personalized = applyPersonalization(originalContent, preferences);

      // Trigger the parent component to update the content
      if (onContentChange) {
        onContentChange(personalized);
      }

      // Update preferences in storage
      const updateResult = await AuthUtils.updateUserPreferences(preferences);
      if (!updateResult.success) {
        console.error('Failed to update user preferences:', updateResult.error);
      }

      // Log the personalization event
      logPersonalization(currentUser.name, preferences, chapterTitle);

    } catch (err) {
      console.error('Error during personalization:', err);
      setError('Failed to personalize content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffebee',
        color: '#c62828',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <p>Please log in to access content personalization features.</p>
      </div>
    );
  }

  return (
    <div className="personalize-section" style={{ margin: '20px 0', textAlign: 'center' }}>
      <button
        onClick={handlePersonalizeClick}
        disabled={isProcessing}
        className="personalize-button"
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '12px 24px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer',
          borderRadius: '4px',
          opacity: isProcessing ? 0.6 : 1
        }}
      >
        {isProcessing ? 'Personalizing...' : 'Personalize Content'}
      </button>

      {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}

      {/* User Preferences Display */}
      <div className="preferences-display" style={{ marginTop: '10px', fontSize: '14px' }}>
        <p><strong>Current Preferences:</strong></p>
        <p>Difficulty: {preferences.difficulty || 'Standard'}</p>
        <p>Include Name: {preferences.includeName ? 'Yes' : 'No'}</p>
        <p>Interests: {preferences.interests?.join(', ') || 'None'}</p>
      </div>
    </div>
  );
};

export default PersonalizeButton;