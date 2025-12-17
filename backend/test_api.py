from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import cohere

# Import our Qdrant client wrapper with better error handling
from qdrant_client_wrapper import qdrant

load_dotenv()

# ============================================
# COHERE SETUP (for both chat & embeddings)
# ============================================
cohere_api_key = os.getenv("COHERE_API_KEY")
if not cohere_api_key or cohere_api_key == "your_cohere_api_key_here":
    print("FATAL: COHERE_API_KEY is missing or not set in .env file!")
    print("Please get a key from https://dashboard.cohere.com/api-keys and add it to backend/.env")
    exit()

cohere_client = cohere.Client(cohere_api_key)

# ============================================
# FUNCTIONS
# ============================================
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
        # Using the older method name for compatibility
        result = qdrant.search(
            collection_name="humanoid_robtic_ai_book",
            query_vector=embedding,
            limit=5
        )

        if not result:
            return "No relevant content found."

        texts = [point.payload["text"] for point in result]
        return "\n\n".join(texts)

    except Exception as e:
        print(f"Qdrant connection error: {e}")
        # Handle specific Windows connection error
        if "An existing connection was forcibly closed by the remote host" in str(e):
            return "Connection to the knowledge base was interrupted. Please check your network connection and try again."
        else:
            return f"Error: {str(e)}"


def answer_question(question, mode='chat'):
    """Answer question based on the mode (chat, translate, explain)"""
    try:
        if mode == 'translate':
            response = cohere_client.chat(
                model="command-r-08-2024",  # Updated to use an available model
                message=question,
                preamble="""You are a translation expert. Translate the given text between English and Urdu. Handle both languages fluently for any length of text.""",
                temperature=0.3,
            )
            return response.text

        elif mode == 'explain':
            response = cohere_client.chat(
                model="command-r-08-2024",  # Updated to use an available model
                message=question,
                preamble="""You are an expert AI tutor. Explain the following word, sentence, or paragraph in a clear and concise way. If it's a technical term from the robotics textbook, provide a detailed explanation.""",
                temperature=0.3,
            )
            return response.text

        # Default mode is 'chat'
        else:
            context = retrieve_content(question)
            print(f"Retrieved context: {context[:100]}...")  # Debug print
            response = cohere_client.chat(
                model="command-r-08-2024",  # Updated to use an available model
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


app = FastAPI()

# UI ke liye CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str
    mode: str = "chat"

@app.post("/chat")
def chat(req: ChatRequest):
    reply = answer_question(req.query, req.mode)
    return {"answer": reply}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)