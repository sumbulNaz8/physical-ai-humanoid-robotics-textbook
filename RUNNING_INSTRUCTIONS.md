# Running the Physical AI & Humanoid Robotics Textbook with Chatbot

## Prerequisites
- Python 3.8+ installed
- Node.js and npm installed
- A valid Cohere API key

## Step 1: Start the Python Backend Server

Open a command prompt/terminal and navigate to the project directory, then:

```bash
cd backend
python server.py
```

You should see a message like "Starting Physical AI Tutor Backend Server...".

Keep this server running - it will listen on http://localhost:5000

## Step 2: Start the Docusaurus Frontend

Open another command prompt/terminal, navigate to the project directory, and run:

```bash
npm run start
```

This will start the Docusaurus server, typically on http://localhost:3000

## Step 3: Access the Chatbot

- Open your browser and go to http://localhost:3000
- Click on "AI Tutor Chatbot" in the sidebar, or go directly to http://localhost:3000/chat
- You can now ask questions to the AI tutor

## Troubleshooting

If you get connection errors:

1. Verify that the Python backend is running on port 5000
2. Check that your Cohere API key is correctly set in the .env file
3. Make sure no other applications are using ports 3000 or 5000
4. If using the chatbot page directly, check browser developer tools (F12) for specific error messages

## Setting up your .env file

Create a file named `.env` in the `backend` directory with the following content:

```
COHERE_API_KEY=your_actual_cohere_api_key_here
```

Replace `your_actual_cohere_api_key_here` with your actual Cohere API key.

## Required Qdrant Collection

The system expects a Qdrant collection named `physical-ai-humanoid-robotics-textbook` with textbook content. In a real deployment, you would need to populate this collection with the textbook content.