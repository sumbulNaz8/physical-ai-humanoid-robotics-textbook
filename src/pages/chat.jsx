import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import '../css/chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your Physical AI & Humanoid Robotics tutor. Ask me anything about the textbook!', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedMode, setSelectedMode] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, isUser) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    addMessage(inputValue, true);
    const question = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: question,
          mode: selectedMode
        })
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          if (data.answer) {
            addMessage(data.answer, false);
          } else {
            addMessage('Sorry, I could not process your request.', false);
          }
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          console.error('Response text that failed to parse:', responseText);
          addMessage(`Error: Failed to parse response - ${responseText.substring(0, 100)}...`, false);
        }
      } else {
        try {
          const errorData = JSON.parse(responseText);
          addMessage(`Error: ${errorData.error || 'An error occurred'}`, false);
        } catch (parseError) {
          addMessage(`HTTP Error: ${response.status} - ${responseText.substring(0, 100)}...`, false);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
      addMessage(`Connection error: ${error.message}`, false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Chatbot" description="Physical AI & Humanoid Robotics Tutor">
      <div className="chatbot-container">
        <div className="chat-header">
          <h1>Physical AI & Humanoid Robotics Tutor</h1>
        </div>

        <div className="mode-selector">
          <label>
            <input
              type="radio"
              name="mode"
              value="chat"
              checked={selectedMode === 'chat'}
              onChange={() => setSelectedMode('chat')}
            />
            Chat
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="explain"
              checked={selectedMode === 'explain'}
              onChange={() => setSelectedMode('explain')}
            />
            Explain
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="translate"
              checked={selectedMode === 'translate'}
              onChange={() => setSelectedMode('translate')}
            />
            Translate
          </label>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message loading">
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about Physical AI & Humanoid Robotics..."
            className="chat-input"
            disabled={isLoading}
          />
          <button type="submit" className="chat-send-btn" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Chatbot;