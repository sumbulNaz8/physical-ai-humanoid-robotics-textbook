const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3001; // Using port 3001 for the proxy server

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Proxy API requests to the Python backend
app.use('/ask', (req, res, next) => {
  // Extract mode from request body
  let mode = 'chat'; // default mode

  // For POST requests, get mode from the body
  if (req.method === 'POST' && req.body && req.body.mode) {
    mode = req.body.mode;
  }

  // Create proxy middleware with dynamic path based on mode
  const pathMap = {
    'chat': '/chat',
    'explain': '/explain',
    'translate': '/translate'
  };

  const targetPath = pathMap[mode] || '/chat'; // fallback to chat if mode is invalid

  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/ask': targetPath },
    proxyTimeout: 120000,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setTimeout(120000);
      // Ensure the mode is passed in the body to the destination
      if (req.body && typeof req.body === 'object') {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  })(req, res, next);
});

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