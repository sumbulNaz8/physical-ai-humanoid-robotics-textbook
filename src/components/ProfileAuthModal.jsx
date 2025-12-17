import React, { useState } from 'react';

// Simple Profile Authentication Modal that collects required info
const ProfileAuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [step, setStep] = useState(1); // 1: Profile collection, 2: Account creation
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    hardwareBackground: '',
    softwareBackground: '',
    skills: '',
    experience: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Validate username/password
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('All account fields are required.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Move to next step (profile setup)
    setStep(2);
    setError('');
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();

    // Validate profile fields
    if (!formData.hardwareBackground || !formData.softwareBackground || !formData.skills || !formData.experience) {
      setError('All profile fields are required.');
      return;
    }

    // Store user data in localStorage
    const userData = {
      username: formData.username,
      password: formData.password, // Note: In a real app, this would be stored securely
      hardwareBackground: formData.hardwareBackground,
      softwareBackground: formData.softwareBackground,
      skills: formData.skills,
      experience: formData.experience,
      authenticated: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(userData));

    // Call success callback to update state in parent component
    onAuthSuccess(userData);
    onClose();
  };

  // Define inline styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  };

  const modalStyle = {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '0.75rem',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)',
    position: 'relative',
    color: '#d1d5db',
  };

  const headerStyle = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(251, 191, 36, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: 0,
    background: 'linear-gradient(to right, #fde047, #fbbf24)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
    fontSize: '1.5rem',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#fbbf24',
  };

  const bodyStyle = {
    padding: '1.5rem',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#fde047',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '4px',
    boxSizing: 'border-box',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#d1d5db',
  };

  const formActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: '#000000',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'rgba(251, 191, 36, 0.1)',
    color: '#fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  };

  const alertStyle = {
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '0.25rem',
    border: '1px solid transparent',
  };

  const errorAlertStyle = {
    ...alertStyle,
    color: '#f87171',
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderColor: 'rgba(248, 113, 113, 0.3)',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Personalize Your Learning Experience</h2>
          <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        </div>

        <div style={bodyStyle}>
          {error && <div style={errorAlertStyle}>{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleProfileSubmit}>
              <h3>Create Your Account</h3>
              <p>Set up your account to save your progress and personalize your learning:</p>

              <div style={formGroupStyle}>
                <label htmlFor="username" style={labelStyle}>Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="password" style={labelStyle}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={primaryButtonStyle}>
                Continue to Profile Setup
              </button>
            </form>
          ) : (
            <form onSubmit={handleAccountSubmit}>
              <h3>Your Background & Skills</h3>
              <p>Tell us about yourself to customize your learning journey:</p>

              <div style={formGroupStyle}>
                <label htmlFor="hardwareBackground" style={labelStyle}>Hardware Background:</label>
                <textarea
                  id="hardwareBackground"
                  name="hardwareBackground"
                  value={formData.hardwareBackground}
                  onChange={handleChange}
                  placeholder="Describe your hardware experience (e.g., microcontrollers, sensors, electronics, etc.)"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="softwareBackground" style={labelStyle}>Software Background:</label>
                <textarea
                  id="softwareBackground"
                  name="softwareBackground"
                  value={formData.softwareBackground}
                  onChange={handleChange}
                  placeholder="Describe your software development background (e.g., programming languages, frameworks, etc.)"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="skills" style={labelStyle}>Technical Skills:</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="What are your technical skills relevant to robotics? (e.g., AI/ML, computer vision, control systems, etc.)"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="experience" style={labelStyle}>Experience Level:</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div style={formActionsStyle}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={secondaryButtonStyle}
                >
                  Back
                </button>
                <button type="submit" style={primaryButtonStyle}>
                  Create Account and Start Learning
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAuthModal;