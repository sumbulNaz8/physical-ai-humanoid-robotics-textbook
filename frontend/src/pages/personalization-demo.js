import React, { useState, useEffect } from 'react';
import { PersonalizationProvider } from '../components/ContentPersonalizer/PersonalizeButton';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Simple authentication utility functions
const AuthUtils = {
  isLoggedIn: () => {
    if (!ExecutionEnvironment.canUseDOM) return false;
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  },

  getCurrentUser: () => {
    if (!ExecutionEnvironment.canUseDOM) return null;
    const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  login: (user, rememberMe = false) => {
    if (!ExecutionEnvironment.canUseDOM) return;
    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
  },

  logout: () => {
    if (!ExecutionEnvironment.canUseDOM) return;
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  },

  getUserPreferences: () => {
    if (!ExecutionEnvironment.canUseDOM) {
      // Default preferences when not on client
      return {
        difficulty: 'standard',
        language: 'en',
        interests: [],
        includeName: false,
        userName: ''
      };
    }

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
    if (!ExecutionEnvironment.canUseDOM) {
      return { success: false, error: 'Not in browser environment' };
    }

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
 * Demo component for showing chapter content personalization
 * Simulates a logged-in user experience with personalization features
 */
const ChapterPersonalizationDemo = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [currentContent, setCurrentContent] = useState('');

  const currentUser = AuthUtils.getCurrentUser();
  const isLoggedIn = AuthUtils.isLoggedIn();

  const [localPreferences, setLocalPreferences] = useState(() => {
    return AuthUtils.getUserPreferences();
  });

  // Update content when personalization changes
  const handleContentChange = (newContent) => {
    setCurrentContent(newContent);
  };

  // Initialize with some default chapter content
  useEffect(() => {
    setOriginalContent(`# Introduction to Physical AI and Humanoid Robotics

Physical AI represents a convergence of artificial intelligence and robotics, where intelligent algorithms are embodied within physical agents. This field explores how machines can learn, adapt, and interact with the real world through robotic bodies.

## Core Principles

The core principles of Physical AI include embodied intelligence, where cognition emerges from the interaction between an agent and its environment. This contrasts with traditional AI approaches that operate in purely digital domains.

## Key Applications

1. Humanoid robots for assistive tasks
2. Autonomous systems for industrial applications
3. Social robots for education and healthcare
4. Advanced locomotion and manipulation systems

This content would normally be pulled from a chapter file or API endpoint, but for this demo, we're using static content to illustrate the personalization feature.`);

    setCurrentContent(`# Introduction to Physical AI and Humanoid Robotics

Physical AI represents a convergence of artificial intelligence and robotics, where intelligent algorithms are embodied within physical agents. This field explores how machines can learn, adapt, and interact with the real world through robotic bodies.

## Core Principles

The core principles of Physical AI include embodied intelligence, where cognition emerges from the interaction between an agent and its environment. This contrasts with traditional AI approaches that operate in purely digital domains.

## Key Applications

1. Humanoid robots for assistive tasks
2. Autonomous systems for industrial applications
3. Social robots for education and healthcare
4. Advanced locomotion and manipulation systems

This content would normally be pulled from a chapter file or API endpoint, but for this demo, we're using static content to illustrate the personalization feature.`);
  }, []);

  // Handle login for demo purposes
  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      preferences: {
        difficulty: 'simple',
        language: 'en',
        interests: ['robotics', 'AI', 'humanoid'],
        includeName: true,
        userName: 'Demo User'
      }
    };

    AuthUtils.login(demoUser, true); // Remember the user
    setLocalPreferences(demoUser.preferences);
  };

  // Handle logout
  const handleLogout = () => {
    AuthUtils.logout();
    setLocalPreferences({
      difficulty: 'standard',
      language: 'en',
      interests: [],
      includeName: false,
      userName: ''
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Chapter Content Personalization Demo</h1>

      {/* User Authentication Section */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {!isLoggedIn ? (
          <div>
            <h3>You are not logged in</h3>
            <p>Log in to access personalized content features</p>
            <button
              onClick={handleDemoLogin}
              style={{
                backgroundColor: '#4CAF50',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Log in as Demo User
            </button>
          </div>
        ) : (
          <div>
            <h3>Welcome, {currentUser?.name || 'User'}!</h3>
            <p>You are logged in and can personalize chapter content</p>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#f44336',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Personalization Controls */}
      {isLoggedIn && (
        <div style={{
          backgroundColor: '#e8f4f8',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>Personalization Settings</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={localPreferences.difficulty || 'standard'}
                onChange={(e) => setLocalPreferences({...localPreferences, difficulty: e.target.value})}
                style={{ marginLeft: '5px', padding: '5px' }}
              >
                <option value="simple">Simple</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            <div>
              <label htmlFor="includeName">
                <input
                  type="checkbox"
                  id="includeName"
                  checked={localPreferences.includeName || false}
                  onChange={(e) => setLocalPreferences({...localPreferences, includeName: e.target.checked})}
                  style={{ marginRight: '5px' }}
                />
                Include your name
              </label>
            </div>

            <div>
              <label htmlFor="interests">Interests:</label>
              <input
                type="text"
                id="interests"
                value={localPreferences.interests?.join(', ') || ''}
                onChange={(e) => setLocalPreferences({
                  ...localPreferences,
                  interests: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                })}
                placeholder="robotics, AI, etc."
                style={{ marginLeft: '5px', padding: '5px', width: '150px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Personalize Button - Only shown when user is logged in */}
      {isLoggedIn && (
        <div style={{ marginBottom: '20px' }}>
          <div className="personalize-section-wrapper">
            <div className="personalize-section" style={{ margin: '20px 0', textAlign: 'center' }}>
              <div className="personalize-section" style={{ margin: '20px 0', textAlign: 'center' }}>
                <button
                  onClick={() => handleContentChange(originalContent)}
                  disabled={false}
                  className="personalize-button"
                  style={{
                    backgroundColor: '#2196F3',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Reset to Original Content
                </button>

                <div className="preferences-display" style={{ marginTop: '10px', fontSize: '14px' }}>
                  <p><strong>Current Preferences:</strong></p>
                  <p>Difficulty: {localPreferences.difficulty || 'Standard'}</p>
                  <p>Include Name: {localPreferences.includeName ? 'Yes' : 'No'}</p>
                  <p>Interests: {localPreferences.interests?.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Content Display */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        minHeight: '300px'
      }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Chapter Content
        </h2>

        <div
          style={{
            lineHeight: '1.6',
            fontSize: '16px',
            color: '#333'
          }}
          dangerouslySetInnerHTML={{ __html: currentContent.replace(/\n/g, '<br />') }}
        />
      </div>

      {/* Info about the feature */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px'
      }}>
        <h3>About this Feature</h3>
        <p>
          This demo showcases the chapter content personalization feature. When a user is logged in:
        </p>
        <ul>
          <li>The "Personalize Content" button allows customization of chapter content</li>
          <li>Content is modified based on user preferences (difficulty, interests, etc.)</li>
          <li>The WritingAgent is used to transform content styles</li>
          <li>All changes happen in real-time on the frontend</li>
          <li>Personalization logs are recorded in the browser console</li>
        </ul>
      </div>
    </div>
  );
};

// Main component wrapper with Personalization provider
const PersonalizationDemoWithProviders = () => {
  return (
    <PersonalizationProvider>
      <ChapterPersonalizationDemo />
    </PersonalizationProvider>
  );
};

export default PersonalizationDemoWithProviders;