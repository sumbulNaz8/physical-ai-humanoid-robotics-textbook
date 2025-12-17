# Deployment Instructions for Physical AI & Humanoid Robotics Textbook

This project uses Docusaurus for the frontend and a Python Flask backend. To deploy to Vercel, follow these steps:

## Before You Deploy

1. Make sure you have a working backend deployed at a URL (e.g., on Heroku, Railway, or other Python-compatible platforms)
2. Update the `vercel.json` file with your backend URL:
   - Replace `YOUR_BACKEND_URL_HERE` with your actual backend URL (like `https://your-app-name.herokuapp.com`)

## Required Environment Variables

Your backend needs to have these environment variables set:
- `COHERE_API_KEY`: Your Cohere API key
- `QDRANT_HOST`: Qdrant vector database host
- `QDRANT_PORT`: Qdrant vector database port

## Deployment Steps

1. Update the `vercel.json` file with your backend URL in the rewrites section
2. Push your changes to your GitHub repository
3. Go to [Vercel Dashboard](https://vercel.com/dashboard)
4. Click "Add New..." → "Project"
5. Import your repository
6. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `build`
7. Click "Deploy"

## Troubleshooting

- If you get build errors, make sure your Node.js version is compatible (18.x or higher recommended)
- If the chatbot doesn't work after deployment, check that your backend URL is correct in `vercel.json`
- Check browser console for errors related to API calls