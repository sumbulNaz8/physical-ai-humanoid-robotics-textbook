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


def retrieve_content_debug(query):
    """Debug function to retrieve and display content from Qdrant"""
    try:
        embedding = get_embedding(query)
        result = qdrant.search(
            collection_name="physical-ai-humanoid-robotics-textbook",
            query_vector=embedding,
            limit=5
        )
        
        print("Type of result:", type(result))
        print("Result:", result)
        
        if hasattr(result, '__dict__'):
            print("Attributes of result:", [attr for attr in dir(result) if not attr.startswith('_')])
        
        # Try to access the content
        if hasattr(result, 'points'):
            print("Has points attribute with length:", len(result.points) if result.points else 0)
            for i, point in enumerate(result.points[:2]):  # Just show first 2
                print(f"  Point {i} payload keys:", list(point.payload.keys()) if hasattr(point, 'payload') else 'No payload')
                if hasattr(point, 'payload') and 'text' in point.payload:
                    print(f"  Point {i} text (first 50 chars):", point.payload['text'][:50])
        elif hasattr(result, '__iter__') and not isinstance(result, str):
            print("Result is iterable, length:", len(result) if hasattr(result, '__len__') else 'unknown')
            for i, item in enumerate(result[:2]):  # Just show first 2
                print(f"  Item {i} type:", type(item))
                if hasattr(item, 'payload') and 'text' in item.payload:
                    print(f"  Item {i} text (first 50 chars):", item.payload['text'][:50])
        else:
            print("Result structure is unexpected")
            
        return result

    except Exception as e:
        print(f"Qdrant connection error: {e}")
        return None


# Test the function
if __name__ == "__main__":
    print("Testing Qdrant connection and search functionality...")
    result = retrieve_content_debug("what is physical ai?")
    print("\nDebug test completed.")