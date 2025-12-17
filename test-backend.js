/**
 * Simple script to test the backend API connection
 */
async function testBackendConnection() {
    console.log("Testing backend connection...");
    
    try {
        // Test the health endpoint first
        const healthResponse = await fetch('http://localhost:5000/health');
        console.log("Health check status:", healthResponse.status);
        const healthData = await healthResponse.json();
        console.log("Health check response:", healthData);
    } catch (error) {
        console.error("Health check failed:", error.message);
    }
    
    try {
        // Test the ask endpoint with a simple request
        const response = await fetch('http://localhost:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: "What is physical AI?",
                mode: "chat"
            })
        });
        
        console.log("Ask endpoint status:", response.status);
        const text = await response.text();
        console.log("Ask endpoint response text:", text.substring(0, 200) + "...");
        
        // Try to parse it as JSON
        try {
            const data = JSON.parse(text);
            console.log("Parsed JSON response:", data);
        } catch (e) {
            console.error("Failed to parse response as JSON:", e.message);
        }
    } catch (error) {
        console.error("Ask request failed:", error.message);
    }
}

// Run the test
testBackendConnection();