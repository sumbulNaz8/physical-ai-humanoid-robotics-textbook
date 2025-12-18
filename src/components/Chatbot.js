// React component for the chatbot UI with backend integration
import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('chat'); // State for selected mode
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to send message to backend
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Show loading message
    const loadingMessageId = `loading-${Date.now()}`;
    setMessages(prev => [...prev, { id: loadingMessageId, text: 'Thinking...', sender: 'bot', loading: true }]);


    try {
      // Determine the API URL based on the environment
      let apiUrl = '/ask'; // Default for production/proxy
      if (typeof window !== 'undefined') {
        // In browser environment - for development with direct backend access
        // This needs to be configured based on your setup
        apiUrl = process.env.NODE_ENV === 'production' ? '/ask' : 'http://localhost:5000/ask';
      } else {
        // On server (during SSG/SSR)
        apiUrl = 'http://localhost:5000/ask';
      }

      // Send request to backend API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
          mode: mode // Use the selected mode
        })
      });

      const data = await response.json();

      setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId)); // Remove loading message


      if (response.ok) {
        const botMessage = {
          text: data.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = {
          text: 'Error: ' + (data.error || 'An error occurred'),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId)); // Remove loading message
      const errorMessage = {
        text: 'Connection error: ' + error.message,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const commonStyles = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '20px auto', // Add margin top/bottom for spacing
    background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)', // Subtle dark gradient
    padding: '30px', // Increased padding
    borderRadius: '12px', // More rounded
    boxShadow: '0 8px 30px rgba(251, 191, 36, 0.2)', // More pronounced goldish shadow
    border: '1px solid rgba(251, 191, 36, 0.4)', // Slightly stronger gold border
    color: '#fbbf24', // Default text color for the container
  };

  const messageStyles = {
    bot: {
      backgroundColor: '#2a2a2a', // Darker background for bot messages
      color: '#fbbf24', // Custom Gold text
      textAlign: 'left',
      borderRadius: '12px', // Softer corners
      padding: '10px 15px', // Adjusted padding
      marginBottom: '10px', // Increased margin
      alignSelf: 'flex-start', // Align bot messages to the left
      maxWidth: '75%',
      wordBreak: 'break-word', // Ensure long words break
    },
    user: {
      backgroundColor: '#fbbf24', // Custom Gold background for user messages
      color: '#000000', // Custom Black text
      textAlign: 'right',
      borderRadius: '12px', // Softer corners
      padding: '10px 15px', // Adjusted padding
      marginBottom: '10px', // Increased margin
      alignSelf: 'flex-end', // Align user messages to the right
      maxWidth: '75%',
      wordBreak: 'break-word', // Ensure long words break
    },
    timestamp: {
      fontSize: '0.75em',
      color: 'rgba(251, 191, 36, 0.7)', // Lighter gold tint
      marginTop: '5px', // Adjusted margin
    },
  };

  return (
    <div style={commonStyles}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
        <img src="/img/robot-head.svg" alt="Robot Head Icon" style={{ width: '40px', height: '40px', marginRight: '15px', filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))' }} />
        <h1 style={{ color: '#fbbf24', textAlign: 'center', margin: 0, fontSize: '2em' }}>AI Robotics Tutor</h1>
      </div>

      {/* Mode Selector */}
      <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center', gap: '25px', padding: '10px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px' }}>
          <label style={{ color: '#fbbf24', cursor: 'pointer', padding: '5px 10px', borderRadius: '5px', background: mode === 'chat' ? 'rgba(251, 191, 36, 0.3)' : 'transparent', transition: 'background 0.3s ease' }}>
              <input type="radio" name="mode" value="chat" checked={mode === 'chat'} onChange={() => setMode('chat')} style={{ marginRight: '8px' }} /> Chat
          </label>
          <label style={{ color: '#fbbf24', cursor: 'pointer', padding: '5px 10px', borderRadius: '5px', background: mode === 'explain' ? 'rgba(251, 191, 36, 0.3)' : 'transparent', transition: 'background 0.3s ease' }}>
              <input type="radio" name="mode" value="explain" checked={mode === 'explain'} onChange={() => setMode('explain')} style={{ marginRight: '8px' }} /> Explain
          </label>
          <label style={{ color: '#fbbf24', cursor: 'pointer', padding: '5px 10px', borderRadius: '5px', background: mode === 'translate' ? 'rgba(251, 191, 36, 0.3)' : 'transparent', transition: 'background 0.3s ease' }}>
              <input type="radio" name="mode" value="translate" checked={mode === 'translate'} onChange={() => setMode('translate')} style={{ marginRight: '8px' }} /> Translate
          </label>
      </div>

      {/* Chat Container */}
      <div style={{
        height: '500px', // Increased height
        overflowY: 'auto',
        border: '1px solid rgba(251, 191, 36, 0.5)', // Stronger goldish border
        borderRadius: '12px', // More rounded
        padding: '15px',
        marginBottom: '20px', // Increased margin
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', // Gradient for chat background
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? messageStyles.user : messageStyles.bot}>
            {msg.text}
            {msg.timestamp && <div style={{ ...messageStyles.timestamp, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              {msg.sender === 'user' ? 'You' : 'AI Tutor'} • {msg.timestamp.toLocaleTimeString()}
            </div>}
          </div>
        ))}
        {isLoading && (
            <div style={{ ...messageStyles.bot, fontStyle: 'italic', opacity: 0.8, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>Thinking</span>
                <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span>
                {/* Basic loading dots animation, needs CSS for actual animation */}
                <style>{`
                    @keyframes blink {
                        0% { opacity: 0.2; }
                        20% { opacity: 1; }
                        100% { opacity: 0.2; }
                    }
                    .loading-dots span {
                        animation: blink 1.4s infinite;
                    }
                    .loading-dots span:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    .loading-dots span:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                `}</style>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div style={{ display: 'flex', gap: '15px' }}> {/* Increased gap */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about Physical AI & Humanoid Robotics..."
          style={{
            flex: 1,
            padding: '14px 18px', // Increased padding
            border: '1px solid rgba(251, 191, 36, 0.5)', // Stronger goldish border
            borderRadius: '10px', // More rounded
            backgroundColor: '#1a1a1a', // Dark background for input
            color: '#fbbf24', // Gold text
            fontSize: '1.05em', // Slightly larger font
            outline: 'none', // Remove default outline
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#fde68a'; e.currentTarget.style.boxShadow = '0 0 8px rgba(251, 191, 36, 0.6)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)'; e.currentTarget.style.boxShadow = 'none'; }}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputValue.trim()}
          style={{
            padding: '14px 28px', // Increased padding
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', // Gold gradient for button
            color: '#000000', // Black text
            border: 'none',
            borderRadius: '10px', // More rounded
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1.05em',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 10px rgba(251, 191, 36, 0.2)',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(251, 191, 36, 0.4)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(251, 191, 36, 0.2)'; }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;