from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import cohere
from qdrant_client import QdrantClient

# Set up FastAPI app
app = FastAPI()

# Load environment variables
load_dotenv()

# Set up Cohere client
cohere_api_key = os.getenv("COHERE_API_KEY")
cohere_client = cohere.Client(cohere_api_key)

# Set up Qdrant client
qdrant_client = QdrantClient(
    url="https://462dfbac-266e-4b8c-9df8-b96019ef5c90.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.rBzWonzS7A0Xkd12eU8LDr1BwDr_FS64Ug7wgvOpFGY",
    timeout=60
)

# UI ke liye CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0]

def retrieve_content(query):
    """Retrieve relevant content from Qdrant"""
    try:
        embedding = get_embedding(query)
        
        # Search in Qdrant
        result = qdrant_client.search(
            collection_name="physical-ai-humanoid-robotics-textbook",  # Same as in main.py
            query_vector=embedding,
            limit=5
        )

        if not result:
            return "No relevant content found."

        # For qdrant-client version, result is a list of points
        if isinstance(result, list):
            # Filter points that have payloads with 'text' key
            valid_points = [point for point in result if hasattr(point, 'payload') and 'text' in point.payload]
            if valid_points:
                texts = [point.payload["text"] for point in valid_points]
                return "\n\n".join(texts)
        
        return "No relevant content found."

    except Exception as e:
        print(f"Qdrant connection error: {e}")
        return f"Error retrieving content: {str(e)}"

def answer_question(question, mode='chat'):
    """Answer question based on the mode (chat, translate, explain)"""
    try:
        if mode == 'translate':
            response = cohere_client.chat(
                model="command-r-08-2024",
                message=question,
                preamble="""You are a translation expert. Translate the given text between English and Urdu. Handle both languages fluently for any length of text.""",
                temperature=0.3,
            )
            return response.text

        elif mode == 'explain':
            response = cohere_client.chat(
                model="command-r-08-2024",
                message=question,
                preamble="""You are an expert AI tutor. Explain the following word, sentence, or paragraph in a clear and concise way. If it's a technical term from the robotics textbook, provide a detailed explanation.""",
                temperature=0.3,
            )
            return response.text

        # Default mode is 'chat'
        else:
            # Get context from Qdrant
            context = retrieve_content(question)
            
            # If no context found, inform user
            if "No relevant content found" in context or "Error retrieving content" in context:
                return context
            
            response = cohere_client.chat(
                model="command-r-08-2024",
                message=question,
                preamble=f"""You are an expert AI tutor for Physical AI & Humanoid Robotics.
Use ONLY the following textbook content to answer the question.
If the answer is not in the content, say "I don't have information about that in the textbook."

TEXTBOOK CONTENT:
{context}
""",
                temperature=0.3,
            )
            return response.text

    except Exception as e:
        print(f"ERROR: Cohere Error: {e}")
        return "An error occurred while processing your request."

class ChatRequest(BaseModel):
    query: str
    mode: str = "chat"

@app.post("/chat")
def chat(req: ChatRequest):
    reply = answer_question(req.query, req.mode)
    return {"answer": reply}

# For running directly with uvicorn if needed
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)