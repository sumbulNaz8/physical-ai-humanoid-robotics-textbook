import React from 'react';
import Layout from '@theme/Layout';

function LuxuryChatbotPage() {
  React.useEffect(() => {
    // Create an iframe to load the luxury chatbot
    const iframe = document.createElement('iframe');
    iframe.src = '/luxury-chatbot.html';
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    
    const container = document.getElementById('chatbot-container');
    if (container) {
      container.appendChild(iframe);
    }
  }, []);

  return (
    <Layout title="Luxury Chatbot" description="Premium chatbot interface for robotics education">
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ textAlign: 'center', color: 'var(--ifm-color-primary)', marginBottom: '2rem' }}>Luxury AI Chatbot Interface</h1>
        <div id="chatbot-container" style={{ width: '100%', height: '70vh', borderRadius: '8px', overflow: 'hidden' }}></div>
      </div>
    </Layout>
  );
}

export default LuxuryChatbotPage;