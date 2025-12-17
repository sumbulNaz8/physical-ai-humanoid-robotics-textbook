from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import ask_agent
from config import Config
from logging_config import init_logging, log_api_request, log_api_response, log_error
import time

# Initialize logging first
init_logging()

# Initialize Flask app
app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the service is running and API key is set"""
    try:
        # Check if API key is properly set
        api_key = Config.COHERE_API_KEY
        if not api_key or api_key == "your_cohere_api_key_here":
            status = "warning"
            message = "API key is not set. Please set a valid COHERE_API_KEY in .env"
        else:
            status = "healthy"
            message = "API key is set and service is running"

        return jsonify({
            "status": status,
            "message": message,
            "timestamp": __import__('datetime').datetime.utcnow().isoformat() + "Z"
        }), 200
    except Exception as e:
        log_error(f"Health check failed: {str(e)}", "health_check")
        return jsonify({
            "status": "error",
            "message": f"Health check failed: {str(e)}"
        }), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    """Endpoint to ask a question to the AI tutor"""
    start_time = time.time()
    log_api_request(request, '/ask')

    try:
        # Validate request data
        if not request.is_json:
            response = jsonify({"error": "Request must be JSON"}), 400
            log_api_response(response[0], time.time() - start_time)
            return response

        data = request.get_json()

        if not data or 'query' not in data:
            response = jsonify({"error": "Missing 'query' in request body"}), 400
            log_api_response(response[0], time.time() - start_time)
            return response

        query = data['query'].strip()
        if not query:
            response = jsonify({"error": "Query cannot be empty"}), 400
            log_api_response(response[0], time.time() - start_time)
            return response

        # Validate and set mode
        mode = data.get('mode', 'chat').lower()  # Default to 'chat' mode
        valid_modes = ['chat', 'translate', 'explain']
        if mode not in valid_modes:
            response = jsonify({"error": f"Invalid mode. Valid modes are: {valid_modes}"}), 400
            log_api_response(response[0], time.time() - start_time)
            return response

        # Optional parameters for flexibility
        collection = data.get('collection', Config.DEFAULT_COLLECTION_NAME)
        limit = data.get('limit', Config.DEFAULT_RETRIEVAL_LIMIT)

        try:
            limit = int(limit)
            if limit <= 0 or limit > Config.MAX_RETRIEVAL_LIMIT:  # Use configured max limit
                response = jsonify({"error": f"Limit must be a positive integer between 1 and {Config.MAX_RETRIEVAL_LIMIT}"}), 400
                log_api_response(response[0], time.time() - start_time)
                return response
        except (ValueError, TypeError):
            response = jsonify({"error": "Limit must be a valid integer"}), 400
            log_api_response(response[0], time.time() - start_time)
            return response

        # Call the agent function to get the answer
        answer = ask_agent(query, mode, collection, limit)

        # Check if the answer indicates an error
        if answer.startswith("Error:"):
            # Extract the actual error message for better handling
            error_message = answer[6:]  # Remove "Error:" prefix
            response = jsonify({
                "error": error_message,
                "query": query,
                "mode": mode
            }), 500
            log_api_response(response[0], time.time() - start_time)
            return response

        response_data = jsonify({
            "query": query,
            "mode": mode,
            "answer": answer,
            "collection": collection,
            "limit": limit
        }), 200
        log_api_response(response_data[0], time.time() - start_time)
        return response_data

    except ValueError as ve:
        log_error(f"Invalid JSON format: {str(ve)}", "ask_question")
        response = jsonify({"error": f"Invalid JSON format: {str(ve)}"}), 400
        log_api_response(response[0], time.time() - start_time)
        return response
    except Exception as e:
        log_error(f"Unexpected error in ask_question: {str(e)}", "ask_question")
        response = jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        log_api_response(response[0], time.time() - start_time)
        return response

@app.route('/', methods=['GET'])
def home():
    """Home endpoint with API information"""
    log_api_request(request, '/')

    api_key = Config.COHERE_API_KEY
    api_status = "Not set" if not api_key or api_key == "your_cohere_api_key_here" else "Set"

    response_data = jsonify({
        "message": "Physical AI Tutor Backend API",
        "version": "1.0.0",
        "api_key_status": api_status,
        "endpoints": {
            "GET /health": {
                "description": "Health check endpoint",
                "response": {
                    "status": "Service status (healthy, warning, error)",
                    "message": "Status message",
                    "timestamp": "ISO 8601 formatted timestamp"
                }
            },
            "POST /ask": {
                "description": "Ask a question to the AI tutor",
                "body": {
                    "query": "Your question here (required)",
                    "mode": "chat (default), translate, or explain (optional)",
                    "collection": f"Qdrant collection name (optional, default: {Config.DEFAULT_COLLECTION_NAME})",
                    "limit": f"Number of results to retrieve (optional, default: {Config.DEFAULT_RETRIEVAL_LIMIT})"
                },
                "response": {
                    "query": "The original question",
                    "mode": "The mode used",
                    "answer": "The AI's response",
                    "collection": "The collection used",
                    "limit": "The limit used"
                }
            },
            "GET /": "This help message"
        }
    }), 200

    log_api_response(response_data[0])
    return response_data

if __name__ == '__main__':
    print("Starting Physical AI Tutor Backend Server...")
    print("Make sure you have set your COHERE_API_KEY in the .env file")
    app.run(debug=Config.DEBUG, host=Config.HOST, port=Config.PORT)