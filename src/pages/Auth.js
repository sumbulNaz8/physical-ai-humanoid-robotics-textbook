import React, { useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import { useUser } from '../contexts/UserContext';
import './Auth.css';

const Auth = () => {
  const { login, register } = useUser();
  const history = useHistory();
  const location = useLocation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    softwareBackground: '',
    hardwareBackground: '',
    skills: '',
    experience: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      setLoading(false);
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        // For login, create a minimal user object
        const userData = { 
          username: formData.username, 
          password: formData.password 
        };
        result = await login(userData, rememberMe);
      } else {
        // For signup, validate all fields
        if (!formData.softwareBackground || !formData.hardwareBackground || 
            !formData.skills || !formData.experience) {
          setError('All fields are required for registration');
          setLoading(false);
          return;
        }
        
        // Create user object with all required fields
        const userData = {
          username: formData.username,
          password: formData.password,
          softwareBackground: formData.softwareBackground,
          hardwareBackground: formData.hardwareBackground,
          skills: formData.skills,
          experience: formData.experience
        };
        
        result = await register(userData);
      }

      if (result.success) {
        // Redirect to home or to the originally requested page
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin'); // Clean up
        history.push(redirectPath);
      } else {
        setError(result.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <Layout title={isLogin ? "Login" : "Sign Up"} description="Authentication page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="softwareBackground">Software Background</label>
                  <textarea
                    id="softwareBackground"
                    name="softwareBackground"
                    value={formData.softwareBackground}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="hardwareBackground">Hardware Background</label>
                  <textarea
                    id="hardwareBackground"
                    name="hardwareBackground"
                    value={formData.hardwareBackground}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="skills">Skills</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="experience">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            
            {isLogin && (
              <div className="input-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>
          
          <div className="auth-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button onClick={toggleMode} className="toggle-btn">
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;