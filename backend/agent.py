import cohere
from qdrant_client import QdrantClient
from config import Config

# These would be initialized properly in a real scenario
cohere_client = cohere.Client(Config.COHERE_API_KEY) if Config.COHERE_API_KEY else None
qdrant_client = QdrantClient(url=Config.QDRANT_URL, api_key=Config.QDRANT_API_KEY) if Config.QDRANT_URL else None

def get_embedding(query):
    """
    Generates an embedding for a given query.
    Returns a dummy embedding if the client is not available.
    """
    if not cohere_client:
        return [0] * 1024
    try:
        response = cohere_client.embed(texts=[query], model='embed-english-v3.0', input_type='search_query')
        return response.embeddings[0]
    except Exception:
        return [0] * 1024

def retrieve_content(query, collection=Config.DEFAULT_COLLECTION_NAME, limit=Config.DEFAULT_RETRIEVAL_LIMIT):
    """
    Retrieves content from Qdrant based on the query embedding.
    """
    if not cohere_client or not qdrant_client:
        return "Unable to retrieve content: client not available."

    try:
        embedding = get_embedding(query)
        search_result = qdrant_client.search(
            collection_name=collection,
            query_vector=embedding,
            limit=limit
        )
        return " ".join([point.payload['text'] for point in search_result])
    except Exception as e:
        return f"Error retrieving content: {e}"


def answer_question(question, mode='chat', context=None):
    """
    Answers a question using the Cohere API based on the provided mode.
    """
    if not cohere_client:
        return "This is a mock response as the Cohere client is not available."

    if mode == 'chat':
        message = f"Context: {context}\n\nQuestion: {question}"
        try:
            response = cohere_client.chat(message=message)
            return response.text
        except Exception as e:
            return f"Error with Cohere chat: {e}"
    elif mode == 'translate':
        try:
            response = cohere_client.chat(message=f"Translate the following text: {question}")
            return response.text
        except Exception as e:
            return f"Error with Cohere translation: {e}"
    elif mode == 'explain':
        try:
            response = cohere_client.chat(message=f"Explain the following concept: {question}")
            return response.text
        except Exception as e:
            return f"Error with Cohere explanation: {e}"
    return "Invalid mode selected."


def ask_agent(query, mode='chat', collection=Config.DEFAULT_COLLECTION_NAME, limit=Config.DEFAULT_RETRIEVAL_LIMIT):
    """
    Asks the agent a question and returns the answer.
    """
    if mode not in ['chat', 'translate', 'explain']:
        raise ValueError("Invalid mode specified.")

    context = None
    if mode == 'chat':
        context = retrieve_content(query, collection, limit)

    return answer_question(query, mode, context)
