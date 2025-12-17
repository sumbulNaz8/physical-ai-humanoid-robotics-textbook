// docusaurus-plugin-api-proxy/index.js
// This is a simple Docusaurus plugin that adds API proxy configuration for Vercel deployment

module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-api-proxy',
    
    configureWebpack(config, isServer, utils) {
      // Only add the proxy configuration in development
      if (process.env.NODE_ENV !== 'production') {
        return {
          devServer: {
            proxy: {
              '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '', // Remove /api prefix when forwarding
                },
              },
            },
          },
        };
      }
      
      // For production builds, we don't add any webpack config
      return {};
    },
  };
};