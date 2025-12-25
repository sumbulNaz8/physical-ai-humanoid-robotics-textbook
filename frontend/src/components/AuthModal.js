import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('docusaurus_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString()
    };
    localStorage.setItem('docusaurus_user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const signin = (username, password) => {
    const storedUser = localStorage.getItem('docusaurus_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.username === username && userData.password === password) {
          setUser(userData);
          return true;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return false;
  };

  const signout = () => {
    localStorage.removeItem('docusaurus_user');
    setUser(null);
  };

  const value = {
    user,
    signup,
    signin,
    signout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Authentication Modal Component
export const AuthModal = () => {
  const { user, signup, signin, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    softwareBackground: '',
    hardwareBackground: '',
    skills: [],
    experience: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Show modal only if no user is logged in
  useEffect(() => {
    if (!loading && !user) {
      setShowModal(true);
    }
  }, [user, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      const success = signup(formData);
      if (success) {
        setShowModal(false);
      }
    } else {
      const success = signin(formData.username, formData.password);
      if (success) {
        setShowModal(false);
      } else {
        alert('Invalid credentials');
      }
    }
  };

  if (loading || user || !showModal) return null;

  return (
    <div className="auth-modal-overlay" style={overlayStyle}>
      <div className="auth-modal" style={modalStyle}>
        <div className="auth-header" style={headerStyle}>
          <h2 style={headingStyle}>
            {isSignup ? 'Join Our Community' : 'Welcome Back'}
          </h2>
          <p style={subHeadingStyle}>
            {isSignup 
              ? 'Create an account to access exclusive content' 
              : 'Sign in to continue to your dashboard'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter your username"
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>
          
          {isSignup && (
            <>
              <div style={inputGroupStyle}>
                <label htmlFor="softwareBackground" style={labelStyle}>Software Background</label>
                <select
                  id="softwareBackground"
                  name="softwareBackground"
                  value={formData.softwareBackground}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="">Select your software background</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div style={inputGroupStyle}>
                <label htmlFor="hardwareBackground" style={labelStyle}>Hardware Background</label>
                <input
                  type="text"
                  id="hardwareBackground"
                  name="hardwareBackground"
                  value={formData.hardwareBackground}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="e.g., Laptop, Desktop, Raspberry Pi"
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Skills</label>
                <div style={skillsInputContainerStyle}>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    style={skillsInputStyle}
                    placeholder="Add a skill and press Enter"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddSkill}
                    style={addSkillButtonStyle}
                  >
                    Add
                  </button>
                </div>
                <div style={skillsListStyle}>
                  {formData.skills.map((skill, index) => (
                    <span key={index} style={skillTagStyle}>
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        style={removeSkillButtonStyle}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={inputGroupStyle}>
                <label htmlFor="experience" style={labelStyle}>Experience</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="">Select your experience level</option>
                  <option value="0-1yr">0-1 year</option>
                  <option value="1-3yr">1-3 years</option>
                  <option value="3-5yr">3-5 years</option>
                  <option value="5+yr">5+ years</option>
                </select>
              </div>
            </>
          )}
          
          <button type="submit" style={buttonStyle}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        <div style={toggleStyle}>
          <p style={toggleTextStyle}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              style={toggleButtonStyle}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Protected Content Wrapper
export const ProtectedContent = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div style={unauthorizedStyle}>
        <h3>Please sign in to access this content</h3>
        <p>You need to authenticate to view this content.</p>
      </div>
    );
  }
  
  return <>{children}</>;
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s ease-in-out'
};

const modalStyle = {
  backgroundColor: '#1a1a1a',
  borderRadius: '12px',
  padding: '2rem',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  animation: 'slideIn 0.3s ease-in-out',
  color: '#e2e8f0'
};

const headerStyle = {
  marginBottom: '1.5rem',
  textAlign: 'center'
};

const headingStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#fbbf24',
  marginBottom: '0.5rem'
};

const subHeadingStyle = {
  color: '#94a3b8',
  fontSize: '0.9rem'
};

const formStyle = {
  marginBottom: '1.5rem'
};

const inputGroupStyle = {
  marginBottom: '1rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '500',
  color: '#fbbf24'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#e2e8f0',
  fontSize: '1rem'
};

const selectStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#e2e8f0',
  fontSize: '1rem'
};

const skillsInputContainerStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const skillsInputStyle = {
  flex: 1,
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#e2e8f0'
};

const addSkillButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#fbbf24',
  color: '#0f172a',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const skillsListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '0.5rem'
};

const skillTagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#fbbf24',
  color: '#0f172a',
  padding: '0.25rem 0.5rem',
  borderRadius: '9999px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const removeSkillButtonStyle = {
  marginLeft: '0.5rem',
  background: 'none',
  border: 'none',
  color: '#0f172a',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#fbbf24',
  color: '#0f172a',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

const toggleStyle = {
  textAlign: 'center'
};

const toggleTextStyle = {
  color: '#94a3b8',
  fontSize: '0.9rem'
};

const toggleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#fbbf24',
  marginLeft: '0.5rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px'
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid rgba(156, 163, 175, 0.3)',
  borderTop: '4px solid #fbbf24',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem'
};

const unauthorizedStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#94a3b8'
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);