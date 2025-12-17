"""
Unit tests for the agent functionality in the Physical AI & Humanoid Robotics textbook project.
"""
import unittest
from unittest.mock import Mock, patch, MagicMock
import os
import sys
from dotenv import load_dotenv

# Add the backend directory to the path so we can import agent
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from agent import get_embedding, retrieve_content, answer_question, ask_agent

load_dotenv()

class TestAgentFunctionality(unittest.TestCase):
    """Test cases for the agent functionality"""

    def setUp(self):
        """Set up test fixtures before each test method."""
        pass

    @patch('agent.cohere_client')
    def test_get_embedding_success(self, mock_cohere_client):
        """Test successful embedding generation"""
        # Mock the embed method
        mock_response = Mock()
        mock_response.embeddings = [[0.1, 0.2, 0.3]]
        mock_cohere_client.embed.return_value = mock_response

        result = get_embedding("test query")

        self.assertEqual(result, [0.1, 0.2, 0.3])
        mock_cohere_client.embed.assert_called_once()

    @patch('agent.cohere_client')
    def test_get_embedding_failure(self, mock_cohere_client):
        """Test embedding generation failure returns dummy values"""
        # Mock the embed method to raise an exception
        mock_cohere_client.embed.side_effect = Exception("API Error")

        result = get_embedding("test query")

        # Should return a dummy embedding of 1024 zeros
        self.assertEqual(len(result), 1024)
        self.assertEqual(result[0], 0)
        self.assertEqual(result[-1], 0)

    @patch('agent.cohere_client')
    @patch('agent.qdrant')
    def test_retrieve_content_success(self, mock_qdrant, mock_cohere_client):
        """Test successful content retrieval"""
        # Mock embedding
        mock_response = Mock()
        mock_response.embeddings = [[0.1, 0.2, 0.3]]
        mock_cohere_client.embed.return_value = mock_response

        # Mock Qdrant search result
        mock_point = Mock()
        mock_point.payload = {"text": "Test content", "url": "http://test.com"}
        mock_qdrant.search.return_value = [mock_point]

        result = retrieve_content("test query")

        self.assertIn("Test content", result)
        self.assertIn("http://test.com", result)

    @patch('agent.cohere_client')
    def test_retrieve_content_no_cohere_client(self, mock_cohere_client):
        """Test content retrieval when Cohere client is not available"""
        # Temporarily set cohere_client to None
        import agent
        original_client = agent.cohere_client
        agent.cohere_client = None

        try:
            result = retrieve_content("test query")
            self.assertIn("Unable to retrieve content", result)
        finally:
            # Restore original client
            agent.cohere_client = original_client

    @patch('agent.cohere_client')
    @patch('agent.qdrant')
    def test_retrieve_content_qdrant_error(self, mock_qdrant, mock_cohere_client):
        """Test content retrieval when Qdrant search fails"""
        # Mock embedding
        mock_response = Mock()
        mock_response.embeddings = [[0.1, 0.2, 0.3]]
        mock_cohere_client.embed.return_value = mock_response

        # Mock Qdrant to raise an exception
        mock_qdrant.search.side_effect = Exception("Connection error")

        result = retrieve_content("test query")

        self.assertIn("Error retrieving content", result)

    @patch('agent.retrieve_content')
    @patch('agent.cohere_client')
    def test_answer_question_chat_mode_success(self, mock_cohere_client, mock_retrieve_content):
        """Test answer_question in chat mode with successful response"""
        # Mock Cohere chat response
        mock_response = Mock()
        mock_response.text = "Test answer"
        mock_cohere_client.chat.return_value = mock_response

        # Mock content retrieval
        mock_retrieve_content.return_value = "Test context"

        result = answer_question("test question", mode='chat')

        self.assertEqual(result, "Test answer")
        mock_cohere_client.chat.assert_called_once()

    @patch('agent.cohere_client')
    def test_answer_question_without_cohere_client(self, mock_cohere_client):
        """Test answer_question when Cohere client is not available"""
        # Temporarily set cohere_client to None
        import agent
        original_client = agent.cohere_client
        agent.cohere_client = None

        try:
            result = answer_question("test question", mode='chat')
            self.assertIn("mock response", result.lower())
        finally:
            # Restore original client
            agent.cohere_client = original_client

    @patch('agent.cohere_client')
    def test_answer_question_translate_mode(self, mock_cohere_client):
        """Test answer_question in translate mode"""
        # Mock Cohere chat response
        mock_response = Mock()
        mock_response.text = "Translated text"
        mock_cohere_client.chat.return_value = mock_response

        result = answer_question("translate this", mode='translate')

        self.assertEqual(result, "Translated text")
        mock_cohere_client.chat.assert_called_once()

    @patch('agent.cohere_client')
    def test_answer_question_explain_mode(self, mock_cohere_client):
        """Test answer_question in explain mode"""
        # Mock Cohere chat response
        mock_response = Mock()
        mock_response.text = "Detailed explanation"
        mock_cohere_client.chat.return_value = mock_response

        result = answer_question("explain this", mode='explain')

        self.assertEqual(result, "Detailed explanation")
        mock_cohere_client.chat.assert_called_once()

    @patch('agent.retrieve_content')
    def test_ask_agent_with_valid_mode(self, mock_retrieve_content):
        """Test ask_agent with valid mode"""
        # This tests the parameter validation
        # Mock the retrieve_content to avoid actual calls since cohere_client is global
        mock_retrieve_content.return_value = "Test context"

        with patch('agent.answer_question') as mock_answer:
            mock_answer.return_value = "Test response"

            result = ask_agent("test query", mode='chat')

            # The result might be the mock response if Cohere isn't available
            # or it could be a response from the actual function if mocking works
            mock_answer.assert_called_once_with("test query", 'chat')

    def test_ask_agent_with_invalid_mode(self):
        """Test ask_agent with invalid mode raises ValueError"""
        with self.assertRaises(ValueError):
            ask_agent("test query", mode='invalid_mode')

    def test_ask_agent_with_custom_parameters(self):
        """Test ask_agent with custom collection and limit"""
        with patch('agent.answer_question') as mock_answer:
            with patch('agent.retrieve_content') as mock_retrieve:
                mock_answer.return_value = "Test response"
                mock_retrieve.return_value = "Test content"

                result = ask_agent(
                    "test query",
                    mode='chat',
                    collection='custom-collection',
                    limit=10
                )

                # Verify retrieve_content was called with the right parameters
                mock_retrieve.assert_called_once_with("test query", 'custom-collection', 10)
                self.assertEqual(result, "Test response")


class TestIntegration(unittest.TestCase):
    """Integration tests for the agent system"""

    def test_ask_agent_modes_integration(self):
        """Test that ask_agent works with all modes (when cohere client is available)"""
        # This test will use mock responses since we don't want to call real APIs
        with patch('agent.cohere_client') as mock_cohere:
            with patch('agent.retrieve_content') as mock_retrieve:
                # Mock responses
                mock_retrieve.return_value = "Sample context"

                mock_response = Mock()
                mock_response.text = "Mocked response"
                mock_cohere.chat.return_value = mock_response

                # Test all modes
                for mode in ['chat', 'translate', 'explain']:
                    result = ask_agent("test query", mode=mode)
                    self.assertIsInstance(result, str)
                    self.assertTrue(len(result) > 0)


if __name__ == '__main__':
    print("Running agent functionality tests...")
    unittest.main(verbosity=2)