const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Proxy middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// Set up proxy for API calls to backend
app.use('/ask', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/ask': '/chat' },
  proxyTimeout: 120000,
  onProxyReq: (proxyReq) => {
    proxyReq.timeout = 120000;
  }
}));

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