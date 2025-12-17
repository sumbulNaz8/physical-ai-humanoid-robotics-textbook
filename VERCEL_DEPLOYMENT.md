# Deploying Physical AI & Humanoid Robotics Textbook to Vercel

This guide explains how to deploy the Physical AI & Humanoid Robotics Textbook project to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com if you don't have one)
2. The `vercel` CLI installed globally: `npm install -g vercel`
3. A fork of this repository in your GitHub account

## Deployment Steps

### Method 1: Using Vercel CLI (Recommended for initial deployment)

1. From the project root directory, make sure you have the `vercel.json` configuration file (provided with this project)

2. Run the following command to deploy:
```bash
vercel
```

3. When prompted, you can accept the defaults or customize:
   - Set the project name (e.g., `physical-ai-humanoid-robotics-textbook`)
   - Select the scope (choose your team or personal account)
   - The build command and output directory will be automatically detected from vercel.json

4. Once deployed, Vercel will provide you with a URL for your deployed site.

### Method 2: Using Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to https://vercel.com/dashboard
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure the project:
   - Framework Preset: "Other Static Generate" (Docusaurus build will create static files)
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Root Directory: Choose the root of your project
6. Click "Deploy"

## Backend Configuration

This project consists of two parts:
1. The Docusaurus frontend (deployed to Vercel)
2. The Python backend (needs to be deployed separately)

**IMPORTANT**: Vercel only serves the frontend part of the application. The backend API needs to be deployed separately on a platform that supports Python applications (like Heroku, Railway, or AWS). The frontend will connect to the backend API via HTTP requests.

### Backend Deployment Options:

#### Option A: Deploy backend to Heroku
1. Create a Procfile in the backend directory:
```
web: gunicorn server:app
```
2. Add a runtime.txt file:
```
python-3.9.16
```
3. Deploy to Heroku using their Git integration or CLI

#### Option B: Deploy backend to Railway
1. Create an account at https://railway.app
2. Connect your GitHub repository
3. Deploy the backend service

#### Option C: Deploy backend to Google Cloud Run
1. Follow Google Cloud Run deployment instructions for Python Flask apps

### Connecting frontend and backend

Once you have deployed the backend to a URL (e.g., `https://your-backend-app.herokuapp.com`), you need to update the `vercel.json` file before deploying:

1. Edit the `vercel.json` file:
   - Find the line with `"destination": "https://your-python-backend-url-goes-here.com/:path*"`
   - Replace `https://your-python-backend-url-goes-here.com` with your actual backend URL (e.g., `https://your-app-name.onrender.com`)
   
2. Alternatively, you can use Vercel's environment variables functionality:
   - In Vercel dashboard, go to your project settings
   - Go to Environment Variables
   - Add the following variable:
     - Key: `PYTHON_BACKEND_URL`
     - Value: `https://your-backend-app.herokuapp.com` (replace with your actual backend URL)
   - Then modify the rewrite rule in `vercel.json` to use the environment variable, though note that Vercel doesn't currently support environment variables in rewrite rules directly, so you'll need to hardcode the URL

## Environment Variables

For the chatbot feature to work properly, you'll need to set up the following environment variable in your Vercel project settings:

1. `PYTHON_BACKEND_URL` - Your deployed Python backend URL (this is used in the rewrite rules)

Additionally, your backend application will need:

1. `COHERE_API_KEY` - Your Cohere API key
2. `QDRANT_HOST` - Qdrant vector database host
3. `QDRANT_PORT` - Qdrant vector database port
4. Any other backend-specific environment variables

## API Routes Configuration

The frontend communicates with the backend using Vercel's rewrite functionality. In the `vercel.json` file:
- Requests to `/api/:path*` are rewritten to your external backend URL
- This allows the frontend to make requests as if the backend was hosted on the same domain

## Build Configuration

The Docusaurus site is built using the `npm run build` command which creates a `build` directory with static files. Vercel automatically serves these files.

## Troubleshooting

1. **Build errors**: 
   - Make sure Node.js version 18.x or higher is used in Vercel settings
   - Check that all dependencies in `package.json` are correctly specified
   - Verify your `vercel.json` is properly formatted

2. **Chatbot not working**: 
   - Verify your backend is deployed and accessible at the URL specified in `vercel.json`
   - Check browser developer console for any API communication errors
   - Ensure the `PYTHON_BACKEND_URL` in `vercel.json` is correct

3. **Static assets not loading**: 
   - Verify that the `static` directory contents are properly referenced in your Docusaurus configuration
   - Check that image paths are relative to the static directory

4. **CORS issues**: These should be handled by deploying both services and using the API proxy rewrite rules in `vercel.json`.

## Updating the Deployment

To update your deployment after making changes:
1. Commit and push your changes to the main branch of your repository
2. Vercel will automatically detect the changes and rebuild/deploy the site

## Custom Domain

To use a custom domain:
1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain and follow the DNS configuration instructions

## Conclusion

Your Physical AI & Humanoid Robotics Textbook should now be accessible via the URL provided by Vercel. Remember that the chatbot functionality requires:
1. Frontend deployed to Vercel (this repository)
2. Backend deployed separately to a Python-compatible platform
3. Proper configuration of the proxy in `vercel.json` to connect them together