import { Configuration, OpenAIApi } from "openai";
import { CohereClient } from 'cohere-ai';

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "YOUR_COHERE_API_KEY_HERE",
});

// This function will process the translation
async function translateText(text) {
  try {
    // Use Cohere to translate text to Urdu
    const response = await cohere.chat({
      message: `Translate this to Urdu: ${text}. Provide only the translation, nothing else.`
    });

    // Extract only the translated part by removing potential explanations
    let result = response.text;
    
    // Check if response contains Urdu characters
    const urduPattern = /[\u0600-\u06FF\u200C-\u200D]+/;
    if (urduPattern.test(result)) {
      // Extract lines that contain Urdu text
      const lines = result.split('\n');
      const urduLines = lines.filter(line => urduPattern.test(line));
      if (urduLines.length > 0) {
        return urduLines.join(' ');
      }
    }
    
    return result;
  } catch (error) {
    console.error("Translation error:", error);
    return `Translation error: ${error.message}`;
  }
}

// This function will process chat queries
async function chatWithText(query) {
  try {
    // For chat mode, we'll use a simple response
    // In a real application, you would implement your specific chat logic here
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
    res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}