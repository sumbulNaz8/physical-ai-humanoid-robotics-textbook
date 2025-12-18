import { CohereClient } from 'cohere-ai';

// This function will process chat queries
async function processChat(message) {
  try {
    // Check if API key is available
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey || apiKey === "YOUR_COHERE_API_KEY_HERE") {
      // If API key is not set, provide a helpful response
      return "AI service is not configured. Please set your COHERE_API_KEY in environment variables.";
    }

    // Initialize Cohere client only when needed
    const cohere = new CohereClient({
      token: apiKey,
    });

    // For all inputs, treat as knowledge questions and respond in Urdu
    const response = await cohere.chat({
      message: `You are a QUESTION-ANSWERING AI, not a translation tool. Treat this input as a knowledge question: ${message}. Answer in Urdu with original explanation, not translation.`,
    });

    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return `Chat error: ${error.message}`;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const answer = await processChat(message);

    res.status(200).json({
      answer,
    });
  } catch (error) {
    console.error('API Error:', error);
    // Ensure we always return a JSON response, even on error
    res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}