# Physical AI & Humanoid Robotics Textbook - Backend Setup

## Overview
This backend provides a REST API for the Physical AI & Humanoid Robotics textbook chatbot, which uses Cohere for AI responses and Qdrant for knowledge retrieval.

## Prerequisites
- Python 3.8 or higher
- Pip package manager
- Windows, macOS, or Linux system

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Create a `.env` file in the `backend` directory with your Cohere API key:

```env
COHERE_API_KEY=your_actual_cohere_api_key_here
```

To get a Cohere API key:
1. Visit https://dashboard.cohere.com/api-keys
2. Create an account or log in
3. Generate a new API key
4. Replace `your_actual_cohere_api_key_here` with your real API key

### 3. Run the Backend Server
```bash
# Method 1: Direct Python execution
cd backend
python server.py

# Method 2: Using the batch file (Windows)
start-backend.bat
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /
- Returns API information and status

### GET /health
- Returns health status of the backend
- Example response: `{"status": "healthy", "message": "API key is set"}`

### POST /ask
- Sends a question to the AI tutor
- Request body format:
```json
{
  "query": "Your question here",
  "mode": "chat" (default), "translate", or "explain"
}
```
- Example response:
```json
{
  "query": "What is Physical AI?",
  "mode": "explain",
  "answer": "Physical AI is an approach that integrates artificial intelligence with the physical properties and dynamics of robots and their environment..."
}
```

## Frontend Integration
The chatbot UI is already integrated to communicate with the backend at `http://localhost:5000/ask` endpoint.

## Troubleshooting

1. If you get a 401 error, make sure your Cohere API key is valid and properly set in the .env file
2. If you can't connect to Qdrant, check your internet connection and verify the Qdrant cloud instance is accessible
3. Make sure port 5000 is not being used by another application

## Testing the Backend
You can test the backend functionality using the provided test script:

```bash
cd backend
python test_backend.py
```