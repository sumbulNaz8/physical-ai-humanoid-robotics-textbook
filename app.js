const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Proxy API requests to the Python backend
app.use('/ask', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
}));

app.use('/health', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
}));

// Serve the chatbot HTML for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot.html'));
});

// For any other route, serve the Docusaurus build (if available) or the chatbot
app.get('*', (req, res) => {
  // Check if it's a static file in the Docusaurus build
  const docusaurusPath = path.join(__dirname, 'frontend/build', req.path);
  if (require('fs').existsSync(docusaurusPath) && !require('fs').statSync(docusaurusPath).isDirectory()) {
    res.sendFile(docusaurusPath);
  } else {
    res.sendFile(path.join(__dirname, 'chatbot.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Chatbot server running on port ${PORT}`);
  console.log(`API requests will be proxied to http://localhost:5000`);
});