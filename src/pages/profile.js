// src/pages/profile.js
// User profile page

import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const { user, isAuthenticated, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hardwareBackground: '',
    softwareBackground: '',
    skills: '',
    experience: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        hardwareBackground: user.hardwareBackground || '',
        softwareBackground: user.softwareBackground || '',
        skills: user.skills || '',
        experience: user.experience || ''
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      // Reset form to current values if user cancels
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        hardwareBackground: user.hardwareBackground || '',
        softwareBackground: user.softwareBackground || '',
        skills: user.skills || '',
        experience: user.experience || ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateUser(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error || 'Error updating profile');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout title="Profile" description="Please login to view your profile">
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
    <Layout title="Profile" description="View and update your profile information">
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{
              background: 'linear-gradient(to right, #fde047, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700'
            }}>
              Your Profile
            </h1>
            <button
              onClick={handleEditToggle}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid rgba(251, 191, 36, 0.5)',
                borderRadius: '4px',
                background: 'transparent',
                color: '#fbbf24',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {message && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '0.25rem',
              color: message.includes('successfully') ? '#4ade80' : '#f87171',
              backgroundColor: message.includes('successfully') ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
              border: message.includes('successfully') ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)',
            }}>
              {message}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5db',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5db',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="hardwareBackground" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Hardware Background
                </label>
                <textarea
                  id="hardwareBackground"
                  name="hardwareBackground"
                  value={formData.hardwareBackground}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5db',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="softwareBackground" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Software Background
                </label>
                <textarea
                  id="softwareBackground"
                  name="softwareBackground"
                  value={formData.softwareBackground}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5db',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="skills" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Technical Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#d1d5db',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="experience" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#fde047',
                }}>
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
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
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <button
                type="submit"
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
                Save Changes
              </button>
            </form>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#fde047', marginBottom: '0.5rem' }}>Personal Information</h3>
                <p><strong>Name:</strong> {user.name || user.username || 'Not provided'}</p>
                <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#fde047', marginBottom: '0.5rem' }}>Background</h3>
                <p><strong>Hardware Background:</strong> {user.hardwareBackground || 'Not provided'}</p>
                <p><strong>Software Background:</strong> {user.softwareBackground || 'Not provided'}</p>
                <p><strong>Technical Skills:</strong> {user.skills || 'Not provided'}</p>
                <p><strong>Experience Level:</strong> {user.experience || 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#fde047', marginBottom: '0.5rem' }}>Account Information</h3>
                <p><strong>Member since:</strong> {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Last login:</strong> {user.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;