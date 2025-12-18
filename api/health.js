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

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Check if API key is properly set
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey || apiKey === "YOUR_COHERE_API_KEY_HERE") {
    res.status(200).json({
      status: "warning",
      message: "API key is not set. Please set a valid COHERE_API_KEY in environment variables",
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(200).json({
    status: "healthy",
    message: "API key is set and service is running",
    timestamp: new Date().toISOString()
  });
}