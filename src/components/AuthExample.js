import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';

// Example component showing how to use the authentication system
const AuthExample = () => {
  const { user, isAuthenticated, loading, error, signup, signin, signout, clearError } = useAuth();
  const [isSignupMode, setIsSignupMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    softwareBackground: '',
    hardwareBackground: '',
    skills: '',
    experience: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignupMode) {
      // Prepare skills as an array
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      
      const userData = {
        username: formData.username,
        password: formData.password,
        softwareBackground: formData.softwareBackground,
        hardwareBackground: formData.hardwareBackground,
        skills: skillsArray,
        experience: formData.experience
      };
      
      const result = await signup(userData);
      if (result.success) {
        console.log('Signup successful:', result.user);
      } else {
        console.error('Signup failed:', result.error);
      }
    } else {
      const result = await signin(formData.username, formData.password);
      if (result.success) {
        console.log('Signin successful:', result.user);
      } else {
        console.error('Signin failed:', result.error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Authentication Example</h2>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
          <button onClick={clearError} style={{ marginLeft: '10px' }}>Clear</button>
        </div>
      )}
      
      {isAuthenticated ? (
        <div>
          <h3>Welcome, {user?.username}!</h3>
          <p>Software Background: {user?.softwareBackground}</p>
          <p>Hardware Background: {user?.hardwareBackground}</p>
          <p>Skills: {user?.skills?.join(', ')}</p>
          <p>Experience: {user?.experience}</p>
          <button onClick={signout}>Sign Out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {isSignupMode && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label>Confirm Password: </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Software Background: </label>
                <input
                  type="text"
                  name="softwareBackground"
                  value={formData.softwareBackground}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Hardware Background: </label>
                <input
                  type="text"
                  name="hardwareBackground"
                  value={formData.hardwareBackground}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Skills (comma separated): </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., React, JavaScript, Python"
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Experience: </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </>
          )}
          
          <button type="submit">
            {isSignupMode ? 'Sign Up' : 'Sign In'}
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              setIsSignupMode(!isSignupMode);
              clearError();
            }}
            style={{ marginLeft: '10px' }}
          >
            {isSignupMode ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthExample;