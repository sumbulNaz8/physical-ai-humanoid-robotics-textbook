const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3001; // Using port 3001 for the proxy server

// Proxy API requests to the Python backend
app.use('/ask', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
}));

app.use('/health', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
}));

// Serve the Docusaurus build (assuming you have built it)
app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`API requests will be proxied to http://localhost:5000`);
});