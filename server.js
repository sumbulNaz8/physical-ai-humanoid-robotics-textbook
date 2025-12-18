const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Proxy middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// Set up proxy for API calls to backend
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
  secure: false,
}));

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// For all other routes, serve the Docusaurus build
app.use((req, res, next) => {
  // This will be handled by Docusaurus when running in development mode
  next();
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});

module.exports = app;