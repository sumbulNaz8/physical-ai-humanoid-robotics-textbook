module.exports = {
  // Development server configuration to proxy API requests
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove /api prefix when forwarding to backend
        },
      },
    },
  },
};