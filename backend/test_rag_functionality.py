"""
Test script to verify the RAG (Retrieval-Augmented Generation) functionality
in the Physical AI & Humanoid Robotics textbook agent.
"""

from agent import ask_agent, retrieve_content, get_embedding
import os

def test_basic_functionality():
    """Test basic agent functionality"""
    print("Testing basic agent functionality...")
    
    # Test 1: Simple question
    question = "What is physical AI?"
    try:
        response = ask_agent(question, mode='explain')
        print(f"Question: {question}")
        print(f"Response: {response}")
        print("-" * 60)
    except Exception as e:
        print(f"Error during basic functionality test: {e}")
        print("-" * 60)

def test_retrieval_functionality():
    """Test the retrieval functionality specifically"""
    print("Testing retrieval functionality...")
    
    # Test 2: Direct content retrieval
    query = "physical ai"
    try:
        content = retrieve_content(query)
        print(f"Query: {query}")
        print(f"Retrieved content: {content[:500]}...")  # First 500 chars
        print("-" * 60)
    except Exception as e:
        print(f"Error during retrieval test: {e}")
        print("-" * 60)

def test_different_modes():
    """Test different agent modes"""
    print("Testing different agent modes...")
    
    question = "What is ROS 2?"
    
    # Test chat mode
    try:
        response = ask_agent(question, mode='chat')
        print(f"Chat mode response: {response[:200]}...")
    except Exception as e:
        print(f"Error in chat mode: {e}")
    
    # Test explain mode
    try:
        response = ask_agent(question, mode='explain')
        print(f"Explain mode response: {response[:200]}...")
    except Exception as e:
        print(f"Error in explain mode: {e}")
    
    # Test translate mode (with an English sentence)
    try:
        response = ask_agent("Physical AI is an approach that integrates artificial intelligence with the physical properties and dynamics of robots.", mode='translate')
        print(f"Translate mode response: {response[:200]}...")
    except Exception as e:
        print(f"Error in translate mode: {e}")
    
    print("-" * 60)

def test_embedding_functionality():
    """Test embedding generation"""
    print("Testing embedding functionality...")
    
    try:
        text = "physical ai"
        embedding = get_embedding(text)
        print(f"Embedding for '{text}': Length = {len(embedding)}")
        print(f"First 5 values: {embedding[:5]}")
        print("-" * 60)
    except Exception as e:
        print(f"Error during embedding test: {e}")
        print("-" * 60)

def run_all_tests():
    """Run all tests"""
    print("Starting RAG functionality tests...\n")
    
    test_embedding_functionality()
    test_retrieval_functionality()
    test_basic_functionality()
    test_different_modes()
    
    print("RAG functionality tests completed!")

if __name__ == "__main__":
    # Check if API key is set before running tests
    api_key = os.getenv("COHERE_API_KEY")
    if not api_key or api_key == "your_cohere_api_key_here":
        print("WARNING: COHERE_API_KEY is not set in environment. Some tests may use mock responses.")
    
    run_all_tests()