import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user session info in localStorage (in a real app, you'd use httpOnly cookies)
        localStorage.setItem('user', JSON.stringify(data));
        // Redirect to main book/home page after successful signin
        history.push('/');
      } else {
        setError(data.detail || 'Signin failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Signin" description="Sign in to your Physical AI & Humanoid Robotics account">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          padding: '40px',
          borderRadius: '12px',
          backgroundColor: '#1f2937',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(251, 191, 36, 0.3)'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#fbbf24',
            marginBottom: '30px',
            fontSize: '2rem'
          }}>
            Sign In
          </h1>

          {error && (
            <div style={{
              backgroundColor: '#7f1d1d',
              color: '#fca5a5',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px',
              border: '1px solid #ef4444'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  backgroundColor: '#111827',
                  color: '#f3f4f6',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  backgroundColor: '#111827',
                  color: '#f3f4f6',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#6b7280' : '#fbbf24',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
              Don't have an account?{' '}
              <a 
                href="/signup" 
                style={{ 
                  color: '#fbbf24', 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}