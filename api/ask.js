import { CohereClient } from 'cohere-ai';

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "YOUR_COHERE_API_KEY_HERE",
});

// This function will process the translation according to specified rules
async function translateText(text) {
  try {
    // Use Cohere to generate an explanation in Urdu, not a translation of the text
    const response = await cohere.chat({
      message: `You are a QUESTION-ANSWERING AI, not a translation tool. Treat this input as a knowledge question: ${text}. Answer in Urdu with original explanation, not translation.`,
    });

    // Return only the response text which should be an explanation in Urdu
    return response.text;
  } catch (error) {
    console.error("Translation error:", error);
    return `Translation error: ${error.message}`;
  }
}

// This function will process chat queries
async function chatWithText(query) {
  try {
    const response = await cohere.chat({
      message: query,
    });

    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return `Chat error: ${error.message}`;
  }
}

// This function will process explanations
async function explainConcept(concept) {
  try {
    const response = await cohere.chat({
      message: `Explain the following concept: ${concept}`,
    });

    return response.text;
  } catch (error) {
    console.error("Explanation error:", error);
    return `Explanation error: ${error.message}`;
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
    const { query, mode = 'chat' } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    let result;

    switch (mode) {
      case 'translate':
        result = await translateText(query);
        break;
      case 'chat':
        result = await chatWithText(query);
        break;
      case 'explain':
        result = await explainConcept(query);
        break;
      default:
        res.status(400).json({ error: 'Invalid mode. Use chat, translate, or explain.' });
        return;
    }

    res.status(200).json({
      query,
      mode,
      answer: result,
    });
  } catch (error) {
    console.error('API Error:', error);
    // Ensure we always return a JSON response, even on error
    res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}