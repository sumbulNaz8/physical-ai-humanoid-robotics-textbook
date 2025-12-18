// src/pages/settings.js
// User settings/preferences page

import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useUser } from '../contexts/UserContext';

const SettingsPage = () => {
  const { user, isAuthenticated, updateUser } = useUser();
  const [preferences, setPreferences] = useState({
    difficulty: 'standard',
    language: 'en',
    interests: [],
    includeName: false
  });
  const [newInterest, setNewInterest] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.preferences) {
      setPreferences({
        difficulty: user.preferences.difficulty || 'standard',
        language: user.preferences.language || 'en',
        interests: user.preferences.interests || [],
        includeName: user.preferences.includeName || false
      });
    }
  }, [user]);

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !preferences.interests.includes(newInterest.trim())) {
      setPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const savePreferences = async () => {
    try {
      // Update user preferences
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      };

      const result = await updateUser(updatedUser);
      
      if (result.success) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result.error || 'Error saving settings');
      }
    } catch (error) {
      setMessage('Error saving settings');
      console.error('Error saving preferences:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout title="Settings" description="Please login to access your settings">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '0.75rem',
            padding: '2rem',
            color: '#d1d5db',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <h1 style={{
              background: 'linear-gradient(to right, #fde047, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Access Denied
            </h1>
            <p>You must be logged in to view this page.</p>
            <a 
              href="/login" 
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Login
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Settings" description="Manage your preferences and settings for the Physical AI & Humanoid Robotics Textbook">
      <div style={{ padding: '20px' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '0.75rem',
          padding: '2rem',
          color: '#d1d5db'
        }}>
          <h1 style={{
            background: 'linear-gradient(to right, #fde047, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>
            Settings & Preferences
          </h1>

          {message && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '0.25rem',
              color: message.includes('successfully') ? '#4ade80' : '#f87171',
              backgroundColor: message.includes('successfully') ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
              border: message.includes('successfully') ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)',
            }}>
              {message}
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fde047', marginBottom: '1rem' }}>Content Personalization</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="difficulty" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#fde047',
              }}>
                Content Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={preferences.difficulty}
                onChange={handlePreferenceChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#d1d5db',
                }}
              >
                <option value="simple">Simple - Basic explanations</option>
                <option value="standard">Standard - Balanced explanations</option>
                <option value="detailed">Detailed - In-depth explanations</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="language" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#fde047',
              }}>
                Preferred Language
              </label>
              <select
                id="language"
                name="language"
                value={preferences.language}
                onChange={handlePreferenceChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#d1d5db',
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#fde047',
              }}>
                Include your name in content
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="includeName"
                  checked={preferences.includeName}
                  onChange={handlePreferenceChange}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>Personalize content with your name</span>
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fde047', marginBottom: '1rem' }}>Your Interests</h2>
            <p style={{ marginBottom: '1rem' }}>Add interests to personalize your learning experience:</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest (e.g., AI, robotics, control systems)"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#d1d5db',
                }}
                onKeyPress={(e) => e.key === 'Enter' && addInterest()}
              />
              <button
                onClick={addInterest}
                style={{
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#000000',
                  fontWeight: '600'
                }}
              >
                Add
              </button>
            </div>

            {preferences.interests.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {preferences.interests.map((interest, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.5rem 1rem',
                      background: 'rgba(251, 191, 36, 0.2)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      borderRadius: '9999px',
                      color: '#fbbf24'
                    }}
                  >
                    {interest}
                    <button
                      onClick={() => removeInterest(interest)}
                      style={{
                        marginLeft: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#f87171',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No interests added yet</p>
            )}
          </div>

          <button
            onClick={savePreferences}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000000'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;