import time
from qdrant_client import QdrantClient
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QdrantClientWrapper:
    def __init__(self, url, api_key, timeout=60):
        self.url = url
        self.api_key = api_key
        self.timeout = timeout
        self.client = None

    def _connect(self):
        """Create a connection to Qdrant with error handling."""
        try:
            self.client = QdrantClient(
                url=self.url,
                api_key=self.api_key,
                timeout=self.timeout
            )
            # Test the connection
            self.client.get_collections()
            logger.info("Successfully connected to Qdrant cloud instance.")
            return True
        except Exception as e:
            logger.error(f"Failed to connect to Qdrant: {e}")
            self.client = None
            return False

    def search(self, collection_name, query_vector, limit=5):
        """Perform a search in Qdrant with retry logic."""
        # Connect if not already connected
        if not self.client:
            if not self._connect():
                return []  # Return empty result if connection fails

        max_retries = 3
        retry_count = 0

        while retry_count < max_retries:
            try:
                result = self.client.search(
                    collection_name=collection_name,
                    query_vector=query_vector,
                    limit=limit
                )

                # Return the entire result object, not just the points
                # The structure will be handled in the agent.py function
                return result

            except ConnectionError as e:
                logger.error(f"Connection error during search (attempt {retry_count + 1}): {e}")
                retry_count += 1
                if retry_count >= max_retries:
                    # Reconnect for next attempt if needed
                    self._connect()
                    raise e
                time.sleep(2 ** retry_count)  # Exponential backoff

            except Exception as e:
                logger.error(f"Unexpected error during search: {e}")
                # Reconnect for next attempt if needed
                self._connect()
                raise e

    def health_check(self):
        """Check if the client is still connected."""
        try:
            if self.client:
                self.client.get_collections()
                return True
            else:
                return False
        except:
            return False

# Initialize Qdrant client instance (but don't connect until used)
qdrant = QdrantClientWrapper(
    url="https://462dfbac-266e-4b8c-9df8-b96019ef5c90.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.rBzWonzS7A0Xkd12eU8LDr1BwDr_FS64Ug7wgvOpFGY",
    timeout=60
)