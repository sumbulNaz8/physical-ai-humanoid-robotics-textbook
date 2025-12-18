// src/pages/dashboard.js
// User dashboard page

import React from 'react';
import Layout from '@theme/Layout';
import { useUser } from '../contexts/UserContext';
import Link from '@docusaurus/Link';

const DashboardPage = () => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <Layout title="Dashboard" description="Please login to access your dashboard">
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
    <Layout title="Dashboard" description="Your personalized dashboard for the Physical AI & Humanoid Robotics Textbook">
      <div style={{ padding: '20px' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          color: '#d1d5db'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '0.75rem',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              background: 'linear-gradient(to right, #fde047, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Welcome, {user.name || user.username || 'User'}!
            </h1>
            
            <p>Here's your personalized dashboard where you can manage your learning experience.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Learning Progress Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h2 style={{ color: '#fde047', marginBottom: '1rem' }}>Learning Progress</h2>
              <p>Track your progress through the textbook chapters.</p>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Overall Progress</span>
                  <span>0%</span>
                </div>
                <div style={{
                  height: '10px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: '0%',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Personalization Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h2 style={{ color: '#fde047', marginBottom: '1rem' }}>Content Personalization</h2>
              <p>Customize how you experience the textbook content.</p>
              <div style={{ marginTop: '1rem' }}>
                <p><strong>Content Difficulty:</strong> {user.preferences?.difficulty || 'Standard'}</p>
                <p><strong>Preferred Language:</strong> {user.preferences?.language || 'English'}</p>
                <p><strong>Interests:</strong> {user.preferences?.interests?.join(', ') || 'None selected'}</p>
              </div>
              <Link
                to="/settings"
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
                Personalize Settings
              </Link>
            </div>

            {/* Quick Links Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h2 style={{ color: '#fde047', marginBottom: '1rem' }}>Quick Links</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/profile" style={{ color: '#fbbf24', textDecoration: 'none' }}>→ View Profile</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/chat" style={{ color: '#fbbf24', textDecoration: 'none' }}>→ AI Tutor Chatbot</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/introduction" style={{ color: '#fbbf24', textDecoration: 'none' }}>→ Start Learning</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;